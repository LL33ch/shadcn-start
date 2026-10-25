import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

/*
  Row. Radius 18, padding `12 12 12 14`,
  gap 12; the title 15/20 at 500 over a 13/18 `text-2` line. Levels step up instead of
  borders: `default` is clear, `outline` is a raised card (on a card it steps up to `field`),
  `muted` is an inset row on `field` (on a card, knob 65% over field, as a badge in an inset
  row). Drawn as a link it lights up a step (card + knob 40%, field + knob 50%) and presses in
  to 0.98. An icon sits in a 36px `knob` tile, radius 10.

  No state and no effects: it renders on the server.
*/

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "group/item-group flex w-full flex-col gap-2 has-[>[data-slot=item][data-size=sm]]:gap-1.5 has-[>[data-slot=item][data-size=xs]]:gap-1",
        className
      )}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("mx-3.5 my-1 w-auto", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex w-full flex-wrap items-center rounded-[18px] text-left transition-[background-color,scale] duration-200 ease-(--ease-out) outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/65 [a]:active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "[a]:hover:bg-field",
        outline:
          "bg-card [a]:hover:bg-[color-mix(in_srgb,var(--card),var(--knob)_40%)] in-data-[slot=card]:bg-field in-data-[slot=card]:[a]:hover:bg-[color-mix(in_srgb,var(--field),var(--knob)_50%)]",
        muted:
          "bg-field [a]:hover:bg-[color-mix(in_srgb,var(--field),var(--knob)_50%)] in-data-[slot=card]:bg-[color-mix(in_srgb,var(--knob)_65%,var(--field))] in-data-[slot=card]:[a]:hover:bg-knob",
      },
      size: {
        default: "gap-3 py-3 pr-3 pl-3.5",
        sm: "gap-2.5 rounded-[16px] py-2.5 pr-2.5 pl-3",
        xs: "gap-2 rounded-[14px] px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Item({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(itemVariants({ variant, size, className })),
      },
      props
    ),
    render,
    state: {
      slot: "item",
      variant,
      size,
    },
  })
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-9 rounded-[10px] bg-knob text-foreground group-data-[size=sm]/item:size-8 group-data-[size=sm]/item:rounded-[9px] group-data-[size=xs]/item:size-6 group-data-[size=xs]/item:rounded-[7px] [&_svg:not([class*='size-'])]:size-[18px] group-data-[size=sm]/item:[&_svg:not([class*='size-'])]:size-4 group-data-[size=xs]/item:[&_svg:not([class*='size-'])]:size-3.5",
        image:
          "size-10 overflow-hidden rounded-[10px] group-data-[size=sm]/item:size-8 group-data-[size=sm]/item:rounded-[9px] group-data-[size=xs]/item:size-6 group-data-[size=xs]/item:rounded-[7px] [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-0.5 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "line-clamp-1 flex w-fit items-center gap-2 text-[15px]/5 font-medium tracking-[-0.015em] text-foreground underline-offset-4 group-data-[size=sm]/item:text-sm/5 group-data-[size=xs]/item:text-[13px]/[18px]",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-left text-[13px]/[18px] font-normal tracking-normal text-pretty text-muted-foreground group-data-[size=xs]/item:text-xs/4 [&>a]:text-primary [&>a]:underline-offset-4 [&>a:hover]:underline",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
