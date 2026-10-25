"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { CheckIcon, CopyIcon, MoonIcon, RotateCcwIcon, SunIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/docs/logo"
import { ThemePreview } from "@/components/create/preview"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

/*
  The theme editor of /create. It writes the kit's tokens on <html> as inline custom properties,
  so everything on the page takes them, menus and dialogs in their portals too, and gives them
  back when the page is left. The panel keeps the default density and radius for itself, so its
  controls stay put while the preview changes. The result is a block of CSS for globals.css.
*/

type Mode = "light" | "dark"

const COLORS = [
  { key: "primary", label: "Accent", vars: ["primary", "sidebar-primary", "chart-1"] },
  { key: "primaryForeground", label: "On accent", vars: ["primary-foreground", "sidebar-primary-foreground"] },
  { key: "background", label: "Background", vars: ["background"] },
  { key: "card", label: "Card", vars: ["card", "popover", "sidebar"] },
  { key: "field", label: "Field", vars: ["field", "muted", "input"] },
  { key: "knob", label: "Knob", vars: ["knob", "secondary", "accent", "sidebar-accent"] },
  {
    key: "foreground",
    label: "Text",
    vars: [
      "foreground",
      "card-foreground",
      "popover-foreground",
      "secondary-foreground",
      "accent-foreground",
      "sidebar-foreground",
      "sidebar-accent-foreground",
    ],
  },
  { key: "mutedForeground", label: "Secondary text", vars: ["muted-foreground"] },
  { key: "faint", label: "Faint text", vars: ["faint"] },
  { key: "ok", label: "Success", vars: ["ok"] },
  { key: "warn", label: "Warning", vars: ["warn"] },
  { key: "destructive", label: "Destructive", vars: ["destructive"] },
] as const

type ColorKey = (typeof COLORS)[number]["key"]
type Palette = Record<ColorKey, string>

interface ThemeState {
  light: Palette
  dark: Palette
  radius: number
  density: number
}

// The values in app/globals.css.
const DEFAULTS: ThemeState = {
  light: {
    primary: "#2b9dff",
    primaryForeground: "#ffffff",
    background: "#f2f2f1",
    card: "#ffffff",
    field: "#f3f3f2",
    knob: "#e8e8e7",
    foreground: "#0b0b0b",
    mutedForeground: "#6d6d6b",
    faint: "#a6a6a4",
    ok: "#30d158",
    warn: "#ff8d28",
    destructive: "#ff383c",
  },
  dark: {
    primary: "#4eafff",
    primaryForeground: "#ffffff",
    background: "#080808",
    card: "#121212",
    field: "#161616",
    knob: "#232323",
    foreground: "#ededed",
    mutedForeground: "#8c8c8a",
    faint: "#4f4f4e",
    ok: "#30d158",
    warn: "#ff8d28",
    destructive: "#ff383c",
  },
  radius: 1,
  density: 1,
}

const ACCENTS = [
  { name: "Sky", light: "#2b9dff", dark: "#4eafff" },
  { name: "Violet", light: "#7a5cff", dark: "#9b85ff" },
  { name: "Green", light: "#1fb954", dark: "#34d26a" },
  { name: "Orange", light: "#f27a1a", dark: "#ff9a40" },
  { name: "Pink", light: "#ee3f86", dark: "#ff6aa6" },
  { name: "Graphite", light: "#3a3a3a", dark: "#d6d6d4" },
]

const STORAGE = "shadcn-start:theme"

/** Every custom property a state sets for one mode. */
function propsOf(state: ThemeState, mode: Mode): Record<string, string> {
  const palette = state[mode]
  const out: Record<string, string> = {}
  for (const c of COLORS) for (const v of c.vars) out[`--${v}`] = palette[c.key]
  out["--accent-soft"] = `color-mix(in srgb, ${palette.primary} 13%, transparent)`
  out["--ok-soft"] = `color-mix(in srgb, ${palette.ok} 14%, transparent)`
  out["--bad-soft"] = `color-mix(in srgb, ${palette.destructive} 13%, transparent)`
  out["--selection-bg"] = `color-mix(in srgb, ${palette.primary} 25%, transparent)`
  out["--selection-fg"] = palette.primary
  return out
}

const shared = (state: ThemeState) => ({
  "--radius-factor": String(state.radius),
  "--spacing": `${(0.25 * state.density).toFixed(4).replace(/0+$/, "")}rem`,
})

function toCss(state: ThemeState) {
  const block = (selector: string, props: Record<string, string>) =>
    `${selector} {\n${Object.entries(props)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n")}\n}`
  return [
    block(":root", { ...shared(state), ...propsOf(state, "light") }),
    block(".dark", propsOf(state, "dark")),
  ].join("\n\n")
}

function load(): ThemeState {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE) ?? "null")
    if (saved?.light && saved?.dark) return { ...DEFAULTS, ...saved }
  } catch {}
  return DEFAULTS
}

export function ThemeEditor() {
  const { resolvedTheme, setTheme } = useTheme()
  const mode: Mode = resolvedTheme === "light" ? "light" : "dark"
  // Rendered on the client only (components/create/create-client.tsx), so the saved theme is there.
  const [state, setState] = React.useState<ThemeState>(load)

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify(state))
    } catch {}
  }, [state])

  // The tokens go on <html> while the editor is open.
  React.useEffect(() => {
    const root = document.documentElement
    const props = { ...shared(state), ...propsOf(state, mode) }
    for (const [k, v] of Object.entries(props)) root.style.setProperty(k, v)
    return () => {
      for (const k of Object.keys(props)) root.style.removeProperty(k)
    }
  }, [state, mode])

  const setColor = (key: ColorKey, value: string) =>
    setState((s) => ({ ...s, [mode]: { ...s[mode], [key]: value } }))

  const css = toCss(state)

  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <aside
        // The panel keeps the default density and radius, whatever the preview shows.
        style={{ "--spacing": "0.25rem", "--radius-factor": "1" } as React.CSSProperties}
        className="flex flex-none flex-col gap-6 bg-card p-4 lg:sticky lg:top-0 lg:h-svh lg:w-80 lg:overflow-y-auto lg:p-5"
      >
        <header className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]"
          >
            <Logo />
            Create
          </Link>
          <ToggleGroup
            spacing={0}
            size="sm"
            value={[mode]}
            onValueChange={(v) => v[0] && setTheme(v[0] as Mode)}
            className="ml-auto"
          >
            <ToggleGroupItem value="light" aria-label="Light">
              <SunIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" aria-label="Dark">
              <MoonIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </header>

        <Section title="Accent">
          <div className="flex flex-wrap gap-2">
            {ACCENTS.map((a) => {
              const picked = state[mode].primary === a[mode]
              return (
                <button
                  key={a.name}
                  type="button"
                  title={a.name}
                  aria-label={a.name}
                  aria-pressed={picked}
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      light: { ...s.light, primary: a.light },
                      dark: { ...s.dark, primary: a.dark },
                    }))
                  }
                  className="grid size-8 place-items-center rounded-full text-white transition-[scale] duration-150 ease-(--ease-out) outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/65 active:scale-90"
                  style={{ background: a[mode] }}
                >
                  {picked && <CheckIcon className="size-4" strokeWidth={2.6} />}
                </button>
              )
            })}
          </div>
        </Section>

        <Section title="Radius" value={`${Math.round(state.radius * 100)}%`}>
          <Slider
            value={[state.radius]}
            min={0}
            max={2}
            step={0.05}
            onValueChange={(v) =>
              setState((s) => ({ ...s, radius: (v as number[])[0] }))
            }
          />
        </Section>

        <Section title="Density" value={`${Math.round(state.density * 100)}%`}>
          <Slider
            value={[state.density]}
            min={0.8}
            max={1.2}
            step={0.025}
            onValueChange={(v) =>
              setState((s) => ({ ...s, density: (v as number[])[0] }))
            }
          />
          <p className="mt-2 text-xs/4 text-muted-foreground">
            Heights, paddings and gaps follow it; type keeps its size.
          </p>
        </Section>

        <Section title={`Colours · ${mode}`}>
          <div className="flex flex-col gap-1">
            {COLORS.map((c) => (
              <label
                key={c.key}
                className="flex h-10 items-center gap-3 rounded-[12px] px-2 transition-colors hover:bg-field"
              >
                <span className="relative size-6 flex-none overflow-hidden rounded-full shadow-[inset_0_0_0_1px_var(--line)]">
                  <span
                    className="absolute inset-0"
                    style={{ background: state[mode][c.key] }}
                  />
                  <input
                    type="color"
                    value={state[mode][c.key]}
                    onChange={(e) => setColor(c.key, e.target.value)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </span>
                <span className="flex-1 text-sm font-medium">{c.label}</span>
                <span className="font-mono text-xs text-muted-foreground uppercase">
                  {state[mode][c.key]}
                </span>
              </label>
            ))}
          </div>
        </Section>

        <div className="mt-auto flex gap-2 pt-2">
          <Button
            variant="soft"
            size="sm"
            onClick={() => setState(DEFAULTS)}
            className="flex-1"
          >
            <RotateCcwIcon data-icon="inline-start" /> Reset
          </Button>
          <ExportDialog css={css} />
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-4 lg:p-8">
        <ThemePreview />
      </main>
    </div>
  )
}

function Section({
  title,
  value,
  children,
}: {
  title: string
  value?: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="mb-3 flex items-center text-xs/4 font-medium text-muted-foreground">
        {title}
        {value && (
          <span className="ml-auto text-faint tabular-nums">{value}</span>
        )}
      </h2>
      {children}
    </section>
  )
}

function ExportDialog({ css }: { css: string }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(id)
  }, [copied])

  return (
    <Dialog>
      <DialogTrigger render={<Button size="sm" className="flex-1" />}>
        Copy CSS
      </DialogTrigger>
      <DialogContent className="max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Your theme</DialogTitle>
          <DialogDescription>
            Paste it at the end of app/globals.css, after the theme the
            registry added. Both colour modes are in it.
          </DialogDescription>
        </DialogHeader>
        <pre className="max-h-[50vh] overflow-auto rounded-[16px] bg-field p-4 font-mono text-xs/5 text-foreground select-text">
          {css}
        </pre>
        <Button
          onClick={() => {
            void navigator.clipboard?.writeText(css)
            setCopied(true)
          }}
          className={cn(copied && "bg-ok hover:bg-ok")}
        >
          {copied ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
