// Builds the data for /docs from the shadcn/ui docs sources in components/docs:
//   components/docs/mdx/*.mdx       the docs of every component (apps/v4/content/docs/components/base)
//   components/docs/examples/*.tsx  the examples they show (apps/v4/examples/base)
// Writes components/docs/generated/content.json (pages, in the docs' order) and
// components/docs/registry.ts (lazy imports of the examples that exist).
//
//   node scripts/gen-docs.mjs [--prune]   --prune deletes examples no page uses

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const DOCS = path.join(root, "components/docs")
const MDX = path.join(DOCS, "mdx")
const EX = path.join(DOCS, "examples")
const GEN = path.join(DOCS, "generated")
fs.mkdirSync(GEN, { recursive: true })

const attr = (s, name) => s.match(new RegExp(`${name}="([^"]*)"`))?.[1]

function frontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  const raw = m?.[1] ?? ""
  const get = (k) => {
    const line =
      raw.match(new RegExp(`^${k}:\\s*(.*)$`, "m"))?.[1]?.trim() ?? ""
    return line.replace(/^["']|["']$/g, "")
  }
  return {
    title: get("title"),
    description: get("description"),
    doc: raw.match(/^\s+doc:\s*(\S+)/m)?.[1],
    api: raw.match(/^\s+api:\s*(\S+)/m)?.[1],
    body: src.slice(m?.[0].length ?? 0),
  }
}

function parseBody(body) {
  // RTL needs the direction provider and the RTL variants of the components: left out.
  const lines = body
    .replace(/\r\n/g, "\n")
    .replace(/\n## RTL\n[\s\S]*?(?=\n## |$)/, "\n")
    .split("\n")
  const blocks = []
  let md = []
  const flush = () => {
    const text = md.join("\n").trim()
    if (text) blocks.push({ type: "md", text })
    md = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const t = line.trim()

    const fence = t.match(/^```(\w*)\s*(.*)$/)
    if (fence) {
      flush()
      const code = []
      for (i++; i < lines.length && !lines[i].trim().startsWith("```"); i++)
        code.push(lines[i])
      const title = fence[2].match(/title="([^"]+)"/)?.[1]
      blocks.push({
        type: "code",
        lang: fence[1] || "text",
        title,
        code: code.join("\n"),
      })
      continue
    }

    const selfClosing = (tag) => {
      let tagText = line
      while (!tagText.includes("/>") && i + 1 < lines.length)
        tagText += "\n" + lines[++i]
      return tagText
    }

    if (t.startsWith("<ComponentPreview")) {
      flush()
      const tag = selfClosing(t)
      blocks.push({
        type: "preview",
        name: attr(tag, "name"),
        className: attr(tag, "previewClassName"),
        figureClassName: attr(tag, "className"),
        direction: attr(tag, "direction"),
      })
      continue
    }
    if (t.startsWith("<ComponentSource")) {
      flush()
      const tag = selfClosing(t)
      blocks.push({
        type: "source",
        name: attr(tag, "name"),
        title: attr(tag, "title"),
      })
      continue
    }
    if (/^import .+ from /.test(t) || /^<\/?(figure|figcaption)\b/.test(t))
      continue
    if (t.startsWith("<Image")) {
      selfClosing(t)
      continue
    }
    if (t.startsWith("<Callout")) {
      flush()
      let inner = t.replace(/^<Callout[^>]*>/, "")
      const text = []
      if (inner.includes("</Callout>"))
        text.push(inner.replace("</Callout>", ""))
      else {
        if (inner.trim()) text.push(inner)
        for (i++; i < lines.length && !lines[i].includes("</Callout>"); i++)
          text.push(lines[i])
      }
      blocks.push({ type: "callout", text: text.join("\n").trim() })
      continue
    }
    const tabs = t.match(/^<TabsContent value="([^"]+)"/)
    if (tabs) {
      flush()
      blocks.push({ type: "label", text: tabs[1] })
      continue
    }
    if (
      /^<\/?(Steps|CodeTabs|TabsList|TabsContent)\b/.test(t) ||
      /^<TabsTrigger/.test(t)
    )
      continue
    const step = t.match(/^<Step>(.*)<\/Step>$/)
    if (step) {
      md.push("", `**${step[1]}**`, "")
      continue
    }
    md.push(line)
  }
  flush()
  return blocks
}

const meta = JSON.parse(fs.readFileSync(path.join(MDX, "meta.json"), "utf8"))
const pages = []
for (const slug of meta.pages) {
  const file = path.join(MDX, `${slug}.mdx`)
  if (!fs.existsSync(file)) continue
  const fm = frontmatter(fs.readFileSync(file, "utf8"))
  pages.push({
    slug,
    title: fm.title || slug,
    description: fm.description,
    links: { doc: fm.doc, api: fm.api },
    blocks: parseBody(fm.body),
  })
}

const used = new Set()
for (const p of pages)
  for (const b of p.blocks) if (b.type === "preview" && b.name) used.add(b.name)

const pascal = (s) => s.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())

if (process.argv.includes("--prune")) {
  for (const f of fs.readdirSync(EX)) {
    if (!used.has(f.replace(/\.tsx?$/, ""))) fs.unlinkSync(path.join(EX, f))
  }
}

// Each example exports a component: by default, or as a function named like the file, or its first export.
const entries = []
for (const f of fs.readdirSync(EX).sort()) {
  const name = f.replace(/\.tsx$/, "")
  if (!f.endsWith(".tsx")) continue
  const src = fs.readFileSync(path.join(EX, f), "utf8")
  let exp
  if (/^export default /m.test(src)) exp = "default"
  else {
    const named = [
      ...src.matchAll(/^export (?:async )?(?:function|const) ([A-Z]\w*)/gm),
    ].map((m) => m[1])
    exp = named.includes(pascal(name)) ? pascal(name) : named[0]
  }
  if (!exp) continue
  entries.push({ name, exp })
}

const reg = [
  `// Generated by scripts/gen-docs.mjs. Do not edit.`,
  `"use client"`,
  ``,
  `import * as React from "react"`,
  ``,
  `type Example = React.LazyExoticComponent<React.ComponentType>`,
  ``,
  `export const registry: Record<string, Example> = {`,
  ...entries.map(({ name, exp }) =>
    exp === "default"
      ? `  "${name}": React.lazy(() => import("./examples/${name}")),`
      : `  "${name}": React.lazy(() => import("./examples/${name}").then((m) => ({ default: m.${exp} }))),`
  ),
  `}`,
  ``,
].join("\n")
fs.writeFileSync(path.join(DOCS, "registry.ts"), reg)
fs.writeFileSync(path.join(GEN, "content.json"), JSON.stringify(pages))

const have = new Set(entries.map((e) => e.name))
for (const p of pages)
  for (const b of p.blocks)
    if (b.type === "preview") b.available = have.has(b.name)
fs.writeFileSync(path.join(GEN, "content.json"), JSON.stringify(pages))
const missing = [...used].filter((n) => !have.has(n))
console.log(
  `pages ${pages.length}, examples used ${used.size}, in registry ${entries.length}, unavailable ${missing.length}`
)
