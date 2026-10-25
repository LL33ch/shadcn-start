import type { Metadata } from "next"
import Link from "next/link"

import { pages, restyled } from "@/lib/docs"
import { site } from "@/lib/site"
import { GithubIcon, Logo } from "@/components/docs/logo"
import { DocsMobileNav, DocsSidebar } from "@/components/docs/nav"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toast"

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const items = pages.map(({ slug, title }) => ({
    slug,
    title,
    isNew: restyled.has(slug),
  }))

  return (
    <div className="mx-auto flex max-w-[1400px]">
      <DocsSidebar items={items} />
      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center gap-3 px-4 lg:px-10">
          <DocsMobileNav items={items} />
          <Link
            href="/"
            className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] lg:hidden"
          >
            <Logo />
            {site.name}
          </Link>
          <nav className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href="/blocks" />}
              className="text-muted-foreground hover:text-foreground"
            >
              Blocks
            </Button>
            <Button
              variant="ghost"
              size="icon"
              nativeButton={false}
              render={
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                />
              }
              className="text-muted-foreground hover:text-foreground"
            >
              <GithubIcon className="size-[18px]" />
            </Button>
          </nav>
        </header>
        {children}
      </div>
      {/* The Base UI toasts of the Toast examples; the rest of the site uses Sonner. */}
      <Toaster />
    </div>
  )
}
