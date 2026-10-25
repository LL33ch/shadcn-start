// Writes registry.json, the shadcn registry of this kit, from the sources:
//
//   app/globals.css     the `theme` item: colour tokens (cssVars) and the shared motion (css)
//   components/ui/*     one `registry:ui` item per component
//   what they import    hooks, lib files and helpers (menu-glide, press-footprint) as items
//
// Then `shadcn build` turns it into public/r/*.json, served from GitHub (package.json `registry`).
// Run both with `npm run registry`.

import fs from "node:fs"
import path from "node:path"
import postcss from "postcss"

const ROOT = path.resolve(import.meta.dirname, "..")
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"))
// REGISTRY_URL serves a local copy, to try an install before publishing.
const BASE = process.env.REGISTRY_URL ?? pkg.registry.url
const url = (name) => `${BASE}/${name}.json`

// Pages of the docs, for titles and descriptions.
const docs = JSON.parse(
  fs.readFileSync(path.join(ROOT, "components/docs/generated/content.json"), "utf8")
)
const docOf = Object.fromEntries(docs.map((p) => [p.slug, p]))

// ---------------------------------------------------------------------------------------------
// The theme: app/globals.css

const css = postcss.parse(fs.readFileSync(path.join(ROOT, "app/globals.css"), "utf8"))

const cssVars = { theme: {}, light: {}, dark: {} }
const rules = {}
const imports = []

const merge = (into, from) => {
  for (const [k, v] of Object.entries(from)) {
    if (typeof v === "object" && typeof into[k] === "object") merge(into[k], v)
    else into[k] = v
  }
  return into
}

// A node to the registry's css object: rules and at-rules nest, declarations are strings.
// `@apply` is left out: `shadcn init` writes the base rules that use it.
function toObject(container) {
  const out = {}
  container.each((node) => {
    if (node.type === "decl") out[node.prop] = node.important ? `${node.value} !important` : node.value
    else if (node.type === "rule") merge(out, { [node.selector]: toObject(node) })
    else if (node.type === "atrule" && node.name !== "apply")
      merge(out, { [`@${node.name} ${node.params}`.trim()]: node.nodes ? toObject(node) : {} })
  })
  return out
}

const varsOf = (rule, into, rest) =>
  rule.each((node) => {
    if (node.type !== "decl") return
    if (node.prop.startsWith("--")) into[node.prop.slice(2)] = node.value
    else rest[node.prop] = node.value
  })

// The docs site's own styles stay out of the theme.
const SITE_ONLY = /\.docs-code/

css.each((node) => {
  if (node.type === "rule" && SITE_ONLY.test(node.selector)) return
  if (node.type === "atrule" && node.name === "import") imports.push(node.params)
  else if (node.type === "atrule" && node.name === "custom-variant") return
  else if (node.type === "atrule" && node.name === "theme") varsOf(node, cssVars.theme, {})
  else if (node.type === "rule" && (node.selector === ":root" || node.selector === ".dark")) {
    const rest = {}
    varsOf(node, node.selector === ":root" ? cssVars.light : cssVars.dark, rest)
    if (Object.keys(rest).length) merge(rules, { [node.selector]: rest })
  } else if (node.type === "rule") merge(rules, { [node.selector]: toObject(node) })
  else if (node.type === "atrule") merge(rules, { [`@${node.name} ${node.params}`]: node.nodes ? toObject(node) : {} })
})

// Rules left empty once `@apply` is gone.
const prune = (obj) => {
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v !== "object") continue
    prune(v)
    if (!k.startsWith("@") && Object.keys(v).length === 0) delete obj[k]
  }
  return obj
}
prune(rules)

for (const params of imports) {
  const name = params.replace(/^["']|["']$/g, "")
  if (name === "tailwindcss") continue
  rules[`@import ${params}`] = {}
}

const theme = {
  name: "theme",
  type: "registry:theme",
  title: "Theme",
  description:
    "Colour tokens for light and dark, spring curves and the shared motion of menus, sheets, toasts and tabs.",
  dependencies: ["tw-animate-css", "shadcn"],
  cssVars,
  css: rules,
}

// ---------------------------------------------------------------------------------------------
// Components and what they import

const items = new Map()
const missing = new Set()

const KIND = [
  ["components/ui/", "registry:ui"],
  ["components/", "registry:component"],
  ["hooks/", "registry:hook"],
  ["lib/", "registry:lib"],
]

const IGNORE = new Set(["react", "react-dom", "next", "lib/utils"])

const packageOf = (spec) =>
  spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]

function fileOf(spec) {
  const base = path.join(ROOT, spec.replace(/^@\//, ""))
  for (const ext of [".tsx", ".ts"]) if (fs.existsSync(base + ext)) return base + ext
  return null
}

function addItem(file) {
  const rel = path.relative(ROOT, file).replaceAll("\\", "/")
  const name = path.basename(rel).replace(/\.tsx?$/, "")
  if (items.has(name)) return name
  const [, type] = KIND.find(([dir]) => rel.startsWith(dir))
  const item = {
    name,
    type,
    title: docOf[name]?.title,
    description: docOf[name]?.description,
    dependencies: new Set(),
    registryDependencies: new Set(type === "registry:ui" ? [url("theme")] : []),
    files: [{ path: rel, type }],
  }
  items.set(name, item)

  const source = fs.readFileSync(file, "utf8")
  for (const [, spec] of source.matchAll(/(?:from|import)\s+["']([^"']+)["']/g)) {
    if (spec.startsWith(".")) throw new Error(`${rel}: relative import "${spec}"`)
    if (spec.startsWith("@/")) {
      if (spec === "@/lib/utils") continue
      const dep = fileOf(spec)
      if (!dep) missing.add(`${rel} -> ${spec}`)
      else item.registryDependencies.add(url(addItem(dep)))
    } else {
      const p = packageOf(spec)
      if (!IGNORE.has(p)) item.dependencies.add(p)
    }
  }
  return name
}

const UI = path.join(ROOT, "components/ui")
for (const f of fs.readdirSync(UI).sort()) if (/\.tsx?$/.test(f)) addItem(path.join(UI, f))
// Helpers the layout mounts: not imported by a component, so added by hand.
addItem(path.join(ROOT, "components/menu-glide.tsx"))
addItem(path.join(ROOT, "components/press-footprint.tsx"))

if (missing.size) {
  console.error("Imports that are not files of the project:\n  " + [...missing].join("\n  "))
  process.exit(1)
}

const clean = (item) => {
  const out = { ...item }
  for (const k of ["dependencies", "registryDependencies"]) {
    out[k] = [...item[k]].sort()
    if (!out[k].length) delete out[k]
  }
  if (!out.title) delete out.title
  if (!out.description) delete out.description
  return out
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: pkg.name,
  homepage: pkg.homepage,
  items: [
    theme,
    ...[...items.values()]
      .sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name))
      .map(clean),
  ],
}

fs.writeFileSync(path.join(ROOT, "registry.json"), JSON.stringify(registry, null, 2) + "\n")
console.log(
  `registry.json: theme + ${items.size} items (` +
    KIND.map(([, t]) => `${[...items.values()].filter((i) => i.type === t).length} ${t.slice(9)}`).join(", ") +
    ")"
)
