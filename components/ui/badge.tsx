import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
  Chips and badge tiles.

  Badge is the small pill that names a state: 26px, 13px at 600, a tint of its colour with the
  colour as text, never a border. The tone is state: accent for the plain one, ok, warn and bad.
  Drawn as a link or a button (`render`) it presses to 0.95 and its tint deepens on hover.

  BadgeTile is the larger "badge": a 60px tile with an inverted icon tile, two lines and a
  trailing mark, for a store or an action.

  No state and no effects: both render on the server.
*/

const accent = "bg-primary/13 text-primary data-interactive:hover:bg-primary/20"
const ok = "bg-ok/14 text-ok data-interactive:hover:bg-ok/22"
const warn = "bg-warn/14 text-warn data-interactive:hover:bg-warn/22"
const bad =
  "bg-destructive/13 text-destructive data-interactive:hover:bg-destructive/20"
const soft =
  "bg-secondary text-muted-foreground data-interactive:hover:bg-[color-mix(in_srgb,var(--secondary),var(--foreground)_8%)] data-interactive:hover:text-foreground"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full font-semibold whitespace-nowrap transition-[background-color,color,scale] duration-200 ease-(--ease-out) outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/65 data-interactive:cursor-pointer data-interactive:active:scale-95 [&>svg]:pointer-events-none [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: accent,
        tint: accent,
        secondary: soft,
        soft,
        ok,
        warn,
        bad,
        destructive: bad,
        outline: "bg-muted text-foreground data-interactive:hover:bg-secondary",
        ghost:
          "text-muted-foreground data-interactive:hover:bg-secondary data-interactive:hover:text-foreground",
        link: "text-primary underline-offset-4 data-interactive:hover:underline",
      },
      size: {
        default:
          "h-[26px] px-3 text-[13px] has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "h-5 gap-1 px-2 text-[11.5px] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg:not([class*='size-'])]:size-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
        ...(render ? { "data-interactive": "" } : {}),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

const tileVariants = cva(
  "group/badge-tile flex h-[60px] w-full items-center gap-3 rounded-[18px] py-0 pr-3.5 pl-3 text-left transition-[background-color,scale] duration-200 ease-(--ease-out) outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/65 data-interactive:cursor-pointer data-interactive:active:scale-[0.98] [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-faint",
  {
    variants: {
      inset: {
        false: "bg-field data-interactive:hover:bg-knob",
        true: "bg-[color-mix(in_srgb,var(--knob)_65%,var(--field))] data-interactive:hover:bg-knob",
      },
    },
    defaultVariants: { inset: false },
  }
)

/** A store or an action as a tile: its mark, two lines and a trailing chevron or "open" mark. */
function BadgeTile({
  className,
  inset,
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof tileVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(tileVariants({ inset }), className),
        ...(render ? { "data-interactive": "" } : {}),
      },
      props
    ),
    render,
    state: { slot: "badge-tile" },
  })
}

/** The 36px tile for the mark: inverted by default, an accent tint when it is the one thing to tap. */
function BadgeTileIcon({
  className,
  primary,
  ...props
}: React.ComponentProps<"span"> & { primary?: boolean }) {
  return (
    <span
      data-slot="badge-tile-icon"
      data-primary={primary ? "" : undefined}
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-[10px] bg-foreground text-card data-primary:bg-primary/13 data-primary:text-primary [&>svg]:size-5",
        className
      )}
      {...props}
    />
  )
}

/** The two lines. Put a `BadgeTileLabel` first, then the main line as text. */
function BadgeTileText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge-tile-text"
      className={cn(
        "flex min-w-0 flex-1 flex-col text-[15px]/5 font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function BadgeTileLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge-tile-label"
      className={cn("text-xs/4 font-normal text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Badge,
  badgeVariants,
  BadgeTile,
  BadgeTileIcon,
  BadgeTileText,
  BadgeTileLabel,
}
