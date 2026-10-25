import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/*
  Accordion. Rows touch while closed and share their rounded ends; an open row
  lifts out with 10px gaps and its own corners, springing between the two shapes.
  Surfaces step up in brightness instead of borders: card on the page, field inside a card.
*/

function Accordion({
  className,
  variant = "default",
  ...props
}: AccordionPrimitive.Root.Props & {
  /** `inset` steps the rows one level up (field) for use inside a card or a sheet. */
  variant?: "default" | "inset"
}) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-variant={variant}
      className={cn("group/accordion flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group/item overflow-hidden bg-card px-2 [--acc-pl:--spacing(2)] has-data-[slot=accordion-icon]:[--acc-pl:--spacing(10)]",
        "[transition:margin_var(--spring-bouncy-dur)_var(--spring-bouncy),border-radius_var(--spring-bouncy-dur)_var(--spring-bouncy),background-color_150ms_ease-out]",
        // Closed rows touch: only the ends of the stack, and the sides facing an open row, are round.
        "first:rounded-t-[20px] last:rounded-b-[20px] has-[+[data-open]]:rounded-b-[20px] [[data-open]+&]:rounded-t-[20px]",
        // An open row lifts out; the stack's first and last rows keep their outer edge.
        "data-open:my-2.5 data-open:rounded-[20px] first:data-open:mt-0 last:data-open:mb-0",
        "not-data-open:not-data-disabled:hover:bg-[color-mix(in_srgb,var(--card),var(--knob)_40%)]",
        "group-data-[variant=inset]/accordion:bg-field",
        "group-data-[variant=inset]/accordion:not-data-open:not-data-disabled:hover:bg-[color-mix(in_srgb,var(--field),var(--knob)_50%)]",
        "data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  icon,
  meta,
  ...props
}: AccordionPrimitive.Trigger.Props & {
  /** A leading icon (a glass icon, 22px). The content indents to the title. */
  icon?: React.ReactNode
  /** A value at the end of the row; it gives way to the content while the row is open. */
  meta?: React.ReactNode
}) {
  return (
    <AccordionPrimitive.Header className="m-0 flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/trigger flex h-[52px] w-full items-center gap-2.5 rounded-[14px] pr-1.5 pl-2 text-left text-[15px] font-medium tracking-[-0.02em] outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        {icon && (
          <span
            data-slot="accordion-icon"
            className="flex size-[22px] flex-none items-center justify-center [&>svg]:size-full"
          >
            {icon}
          </span>
        )}
        <span className="min-w-0 flex-1 truncate">{children}</span>
        {meta && (
          <span
            data-slot="accordion-meta"
            className="flex items-center gap-2 text-sm font-normal tracking-normal whitespace-nowrap text-muted-foreground transition-[opacity,filter,transform] duration-200 ease-(--ease-out) group-aria-expanded/trigger:pointer-events-none group-aria-expanded/trigger:translate-x-2 group-aria-expanded/trigger:opacity-0 group-aria-expanded/trigger:blur-[4px]"
          >
            {meta}
          </span>
        )}
        <ChevronRightIcon
          data-slot="accordion-trigger-icon"
          className="size-4 flex-none rotate-90 text-muted-foreground transition-transform duration-(--spring-soft-dur) ease-(--spring-soft) group-aria-expanded/trigger:-rotate-90"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden text-sm [transition:height_var(--spring-bouncy-dur)_var(--spring-bouncy)] data-ending-style:h-0 data-starting-style:h-0"
      {...props}
    >
      <div
        className={cn(
          "flex flex-col gap-3 pr-2 pb-4 pl-(--acc-pl) text-sm leading-5 text-foreground/60 [&_p]:m-0",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
