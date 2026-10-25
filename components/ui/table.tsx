import * as React from "react"

import { cn } from "@/lib/utils"

/*
  Table. No lines between rows (the hairline only sets the head apart and the foot
  off), so rows are told apart by air: 14px text, cells padded 10 x 12. A row under the pointer
  lights up as a rounded strip (radius 14) in a tint of the text, a selected one in a tint of
  the accent. The head is 13/18 at 500 in `text-2`; figures are tabular, so sums line up. Put
  it on a card for a surface of its own.

  No state and no effects: it renders on the server.
*/

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom border-separate border-spacing-0 text-sm tabular-nums",
          className
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_th]:border-b [&_th]:border-border", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "font-medium [&_td]:border-t [&_td]:border-border",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "[&>td]:transition-colors [&>td]:duration-150 [&>td:first-child]:rounded-l-[14px] [&>td:last-child]:rounded-r-[14px]",
        "hover:[&>td]:bg-[color-mix(in_srgb,var(--foreground)_4%,transparent)] has-aria-expanded:[&>td]:bg-[color-mix(in_srgb,var(--foreground)_4%,transparent)]",
        "data-[state=selected]:[&>td]:bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] data-[state=selected]:hover:[&>td]:bg-[color-mix(in_srgb,var(--primary)_14%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-3 text-left align-middle text-[13px]/[18px] font-medium whitespace-nowrap text-muted-foreground [&:has([role=checkbox])]:w-px [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-3 py-2.5 align-middle whitespace-nowrap text-foreground [&:has([role=checkbox])]:w-px [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-[13px]/[18px] text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
