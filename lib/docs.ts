import fs from "node:fs"
import path from "node:path"

import content from "@/components/docs/generated/content.json"

export type Block =
  | { type: "md"; text: string }
  | { type: "code"; lang: string; title?: string; code: string }
  | {
      type: "preview"
      name: string
      className?: string
      figureClassName?: string
      direction?: string
      available?: boolean
    }
  | { type: "source"; name: string; title?: string }
  | { type: "callout"; text: string }
  | { type: "label"; text: string }

export interface DocPage {
  slug: string
  title: string
  description: string
  links: { doc?: string; api?: string }
  blocks: Block[]
}

export const pages = content as DocPage[]

export const getPage = (slug: string) => pages.find((p) => p.slug === slug)

/* Components restyled for this kit: the docs nav marks them New. Add one when it is done. */
export const restyled = new Set([
  "accordion",
  "alert",
  "alert-dialog",
  "badge",
  "button",
  "button-group",
  "card",
  "checkbox",
  "combobox",
  "command",
  "context-menu",
  "data-table",
  "dialog",
  "drawer",
  "dropdown-menu",
  "glass-icon",
  "hover-card",
  "input",
  "input-group",
  "input-otp",
  "item",
  "label",
  "popover",
  "progress",
  "radio-group",
  "select",
  "sheet",
  "sidebar",
  "slider",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toast",
  "toggle",
  "toggle-group",
  "tooltip",
])

// The paths name their folder, so the build traces only those folders (not the whole project).
const read = (file: string) => {
  try {
    return fs.readFileSync(file, "utf8")
  } catch {
    return null
  }
}

export const readExample = (name: string) =>
  read(path.join(process.cwd(), "components/docs/examples", `${name}.tsx`))

export const readUiSource = (name: string) =>
  read(path.join(process.cwd(), "components/ui", `${name}.tsx`)) ??
  read(path.join(process.cwd(), "components/ui", `${name}.ts`))

export const countPreviews = (page: DocPage) =>
  page.blocks.filter((b) => b.type === "preview").length
