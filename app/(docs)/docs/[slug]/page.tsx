import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRightIcon, ChevronDownIcon } from "lucide-react"

import { getPage, pages, readUiSource, type Block } from "@/lib/docs"
import { site } from "@/lib/site"
import { Code } from "@/components/docs/code"
import { PreviewBlock } from "@/components/docs/preview-block"
import { Prose, slugify } from "@/components/docs/prose"
import { Button } from "@/components/ui/button"

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getPage(slug)
  return page
    ? { title: page.title, description: page.description }
    : {}
}

const LABELS: Record<string, string> = { cli: "Command", manual: "Manual" }

/* The copied docs install shadcn/ui's own components: point the ones this kit has at its registry. */
const fromRegistry = (code: string) =>
  code.replace(
    /(npx shadcn@latest add) ([\w -]+)/g,
    (_, cmd: string, names: string) =>
      `${cmd} ${names
        .trim()
        .split(/\s+/)
        .map((n) => (readUiSource(n) ? `${site.namespace}/${n}` : n))
        .join(" ")}`
  )

async function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "md":
      return <Prose>{block.text}</Prose>
    case "code":
      return (
        <Code
          code={fromRegistry(block.code)}
          lang={block.lang}
          title={block.title}
          className="my-4"
        />
      )
    case "preview":
      if (block.available === false) return null
      return (
        <div className="my-4">
          <PreviewBlock
            name={block.name}
            className={block.className}
            figureClassName={block.figureClassName}
          />
        </div>
      )
    case "source": {
      const code = readUiSource(block.name)
      if (!code) return null
      return (
        <details className="group/source my-4">
          <summary className="flex h-11 cursor-pointer list-none items-center justify-between rounded-2xl bg-field px-4 text-sm font-medium transition-colors select-none group-open/source:rounded-b-none hover:bg-knob [&::-webkit-details-marker]:hidden">
            <span className="font-mono text-xs">
              {block.title ?? `components/ui/${block.name}.tsx`}
            </span>
            <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200 group-open/source:rotate-180" />
          </summary>
          <Code code={code} className="rounded-t-none" />
        </details>
      )
    }
    case "callout":
      return (
        <div className="my-4 rounded-2xl bg-muted px-5 py-3">
          <Prose>{block.text}</Prose>
        </div>
      )
    case "label":
      return (
        <h4 className="mt-6 mb-1 text-sm font-medium text-muted-foreground">
          {LABELS[block.text] ?? block.text}
        </h4>
      )
  }
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getPage(slug)
  if (!page) notFound()

  const toc = page.blocks.flatMap((b) =>
    b.type === "md"
      ? [...b.text.matchAll(/^## (.+)$/gm)].map((m) => m[1].replace(/`/g, ""))
      : []
  )
  const index = pages.findIndex((p) => p.slug === slug)
  const prev = pages[index - 1]
  const next = pages[index + 1]

  return (
    <div className="flex gap-10 px-4 pt-6 pb-28 lg:px-10">
      <main className="max-w-3xl min-w-0 flex-1">
        <h1 className="m-0 text-4xl leading-10 font-semibold tracking-[-0.045em]">
          {page.title}
        </h1>
        <p className="mt-3 text-[17px] leading-7 text-muted-foreground">
          {page.description}
        </p>
        {(page.links.doc || page.links.api) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {page.links.doc && (
              <Button
                variant="soft"
                size="xs"
                nativeButton={false}
                render={
                  <a href={page.links.doc} target="_blank" rel="noreferrer" />
                }
              >
                Docs <ArrowUpRightIcon />
              </Button>
            )}
            {page.links.api && (
              <Button
                variant="soft"
                size="xs"
                nativeButton={false}
                render={
                  <a href={page.links.api} target="_blank" rel="noreferrer" />
                }
              >
                API Reference <ArrowUpRightIcon />
              </Button>
            )}
          </div>
        )}

        <div className="mt-8">
          {page.blocks.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-2.5">
          {prev ? (
            <Link
              href={`/docs/${prev.slug}`}
              className="flex flex-col gap-0.5 rounded-[20px] bg-card px-5 py-3.5 transition-colors hover:bg-accent"
            >
              <span className="text-xs text-muted-foreground">Previous</span>
              <b className="font-medium tracking-[-0.02em]">{prev.title}</b>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/docs/${next.slug}`}
              className="col-start-2 flex flex-col items-end gap-0.5 rounded-[20px] bg-card px-5 py-3.5 transition-colors hover:bg-accent"
            >
              <span className="text-xs text-muted-foreground">Next</span>
              <b className="font-medium tracking-[-0.02em]">{next.title}</b>
            </Link>
          )}
        </div>
      </main>

      {toc.length > 1 && (
        <aside className="sticky top-8 hidden h-fit w-48 flex-none xl:block">
          <p className="mb-2 text-sm font-medium">On this page</p>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[13px]">
            {toc.map((t) => (
              <li key={t}>
                <a
                  href={`#${slugify(t)}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  )
}
