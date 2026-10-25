"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, SearchIcon } from "lucide-react"

import { site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/docs/logo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export interface NavItem {
  slug: string
  title: string
  isNew?: boolean
}

const GUIDES = [
  { href: "/", title: "Introduction" },
  { href: "/docs/installation", title: "Installation" },
]

function NavList({
  items,
  onNavigate,
}: {
  items: NavItem[]
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const [query, setQuery] = React.useState("")
  const shown = items.filter((i) =>
    i.title.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <label className="relative block">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search components"
          className="h-10 w-full rounded-2xl bg-field pr-3 pl-10 text-sm font-medium tracking-[-0.012em] outline-none placeholder:text-faint focus-visible:ring-[1.5px] focus-visible:ring-foreground/16"
        />
      </label>
      <nav className="-mx-1 min-h-0 flex-1 overflow-y-auto px-1 pb-8">
        {!query && (
          <>
            <p className="mb-1 px-3 text-xs/8 font-medium text-faint">
              Getting started
            </p>
            {GUIDES.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                onClick={onNavigate}
                aria-current={pathname === g.href ? "page" : undefined}
                className={cn(
                  "flex h-9 items-center rounded-[14px] px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground",
                  pathname === g.href
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {g.title}
              </Link>
            ))}
            <p className="mt-4 mb-1 flex items-center px-3 text-xs/8 font-medium text-faint">
              Components
              <span className="ml-auto tabular-nums">{items.length}</span>
            </p>
          </>
        )}
        {shown.map((i) => {
          const active = pathname === `/docs/${i.slug}`
          return (
            <Link
              key={i.slug}
              href={`/docs/${i.slug}`}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-9 items-center rounded-[14px] px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground",
                active ? "bg-accent text-foreground" : "text-muted-foreground"
              )}
            >
              {i.title}
              {i.isNew && (
                <Badge size="sm" className="ml-auto">
                  New
                </Badge>
              )}
            </Link>
          )
        })}
        {shown.length === 0 && (
          <p className="px-3 py-2 text-sm text-muted-foreground">
            Nothing found
          </p>
        )}
      </nav>
    </div>
  )
}

export function DocsSidebar({ items }: { items: NavItem[] }) {
  return (
    <aside className="sticky top-0 hidden h-svh w-64 flex-none flex-col gap-5 pt-4 pr-4 pl-4 lg:flex">
      <Link
        href="/"
        className="flex h-12 items-center gap-2 px-2 text-[15px] font-semibold tracking-[-0.02em]"
      >
        <Logo />
        {site.name}
      </Link>
      <NavList items={items} />
    </aside>
  )
}

export function DocsMobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = React.useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="soft"
            size="icon"
            aria-label="Menu"
            className="lg:hidden"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 gap-0 p-4">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex min-h-0 flex-1 flex-col pt-8">
          <NavList items={items} onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
