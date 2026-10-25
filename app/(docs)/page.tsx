import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { countPreviews, pages, restyled } from "@/lib/docs"
import { addCommand, site } from "@/lib/site"
import { Code } from "@/components/docs/code"
import { GithubIcon } from "@/components/docs/logo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const PRINCIPLES = [
  {
    title: "Brightness, not borders",
    text: "Surfaces step up in brightness: background, card, field, knob. Levels read from fill and radius, so nothing needs a line around it.",
  },
  {
    title: "One accent",
    text: "`primary` is the only colour that means “this”. `ok`, `warn` and `destructive` only ever mean state.",
  },
  {
    title: "Spring motion",
    text: "Menus, sheets, toasts and tabs move on physical springs written as CSS `linear()` curves, with no JavaScript animation library.",
  },
  {
    title: "Server first",
    text: "Components render on the server wherever Base UI lets them. State lives in `data-*` attributes and CSS, not in effects.",
  },
]

export default function HomePage() {
  return (
    <main className="px-4 pt-6 pb-28 lg:px-10">
      <section className="max-w-3xl">
        <h1 className="m-0 text-4xl leading-11 font-semibold tracking-[-0.045em] sm:text-5xl sm:leading-14">
          {site.name}
        </h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-7 text-muted-foreground">
          {site.description} Install the components you need from a shadcn
          registry and own the code.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Button
            nativeButton={false}
            render={<Link href="/docs/installation" />}
          >
            Get started <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button
            variant="soft"
            nativeButton={false}
            render={<a href={site.github} target="_blank" rel="noreferrer" />}
          >
            <GithubIcon className="size-[18px]" data-icon="inline-start" />
            GitHub
          </Button>
        </div>
        <Code
          code={`${addCommand("theme")}\n${addCommand("button", "dialog", "select")}`}
          lang="bash"
          className="mt-8"
        />
      </section>

      <section className="mt-14 grid max-w-5xl gap-2.5 sm:grid-cols-2">
        {PRINCIPLES.map((p) => (
          <div key={p.title} className="rounded-[28px] bg-card p-5">
            <b className="text-base leading-[22px] font-medium tracking-[-0.02em]">
              {p.title}
            </b>
            <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
              {p.text.split("`").map((part, i) =>
                i % 2 ? (
                  <code key={i} className="font-mono text-[12px] text-foreground">
                    {part}
                  </code>
                ) : (
                  part
                )
              )}
            </p>
          </div>
        ))}
      </section>

      <section id="components" className="mt-16 scroll-mt-20">
        <h2 className="m-0 text-2xl leading-8 font-medium tracking-[-0.025em]">
          Components
        </h2>
        <p className="mt-2 mb-6 max-w-xl text-[15px] leading-6 text-muted-foreground">
          {pages.length} components, every example live with its code. The ones
          marked New are restyled; the rest are shadcn/ui as it comes.
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {pages.map((p) => (
            <Link
              key={p.slug}
              href={`/docs/${p.slug}`}
              className="group flex min-h-32 flex-col gap-1 rounded-[28px] bg-card p-5 transition-[background-color,scale] duration-200 ease-(--ease-out) hover:bg-[color-mix(in_srgb,var(--card),var(--knob)_45%)] active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <b className="text-base leading-[22px] font-medium tracking-[-0.02em]">
                  {p.title}
                </b>
                {restyled.has(p.slug) && <Badge size="sm">New</Badge>}
                <span className="ml-auto text-xs font-medium text-faint tabular-nums">
                  {countPreviews(p)}
                </span>
              </span>
              <span className="line-clamp-3 text-[13px] leading-[18px] text-muted-foreground">
                {p.description}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
