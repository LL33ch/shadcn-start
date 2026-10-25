import { codeToHtml } from "shiki"

import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

async function highlight(code: string, lang: string) {
  const options = {
    themes: { light: "github-light", dark: "github-dark-default" },
    defaultColor: false,
  } as const
  try {
    return await codeToHtml(code, { lang, ...options })
  } catch {
    return await codeToHtml(code, { lang: "text", ...options })
  }
}

export async function Code({
  code,
  lang = "tsx",
  title,
  className,
}: {
  code: string
  lang?: string
  title?: string
  className?: string
}) {
  const html = await highlight(code.replace(/\n$/, ""), lang)

  return (
    <div
      className={cn(
        "group/code relative overflow-hidden rounded-2xl bg-field",
        className
      )}
    >
      {title && (
        <div className="px-4 pt-3 font-mono text-xs text-muted-foreground">
          {title}
        </div>
      )}
      <div className="docs-code" dangerouslySetInnerHTML={{ __html: html }} />
      <CopyButton text={code} />
    </div>
  )
}
