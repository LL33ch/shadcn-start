import * as React from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"

const textOf = (node: React.ReactNode): string => {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (React.isValidElement<{ children?: React.ReactNode }>(node))
    return textOf(node.props.children)
  return ""
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "")

const components: Components = {
  h2: ({ children }) => (
    <h2
      id={slugify(textOf(children))}
      className="mt-14 mb-3 scroll-mt-24 text-2xl leading-8 font-medium tracking-[-0.025em] first:mt-0"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      id={slugify(textOf(children))}
      className="mt-8 mb-2 scroll-mt-24 text-xl leading-7 font-medium tracking-[-0.02em]"
    >
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-6 mb-2 text-base font-medium tracking-[-0.02em]">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="my-3 leading-7 text-foreground/80">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary underline-offset-4 hover:underline"
      {...(href?.startsWith("http")
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="my-3 list-disc space-y-1.5 pl-6 text-foreground/80">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 list-decimal space-y-1.5 pl-6 text-foreground/80">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  code: ({ children, className }) => (
    <code
      className={cn(
        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-[13px] tracking-normal text-foreground",
        className
      )}
    >
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-2xl bg-field p-4 font-mono text-[13px]">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-bar pl-4 text-muted-foreground">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-5 overflow-x-auto rounded-2xl bg-field">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="px-4 py-2.5 font-medium">{children}</th>,
  td: ({ children }) => (
    <td className="px-4 py-2.5 align-top text-foreground/80">{children}</td>
  ),
  hr: () => <hr className="my-8 border-border" />,
}

export function Prose({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <div className={cn("text-[15px]", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
