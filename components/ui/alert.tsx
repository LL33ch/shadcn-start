import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
  Notice. One message that says what stops or changes things: a glass icon, a title and
  a line that adds to it. The tone is state, never decoration: ok (fine), warn (attention) and
  bad (an end). A tone is a tint of the card with a thin ring in the same colour: no border.
*/

const ok =
  "bg-[color-mix(in_srgb,var(--ok)_9%,var(--card))] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--ok)_20%,transparent)] *:[svg]:text-ok *:data-[slot=alert-icon]:text-ok"
const warn =
  "bg-[color-mix(in_srgb,var(--warn)_10%,var(--card))] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--warn)_22%,transparent)] *:[svg]:text-warn *:data-[slot=alert-icon]:text-warn"
const bad =
  "bg-[color-mix(in_srgb,var(--destructive)_10%,var(--card))] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--destructive)_22%,transparent)] *:[svg]:text-destructive *:data-[slot=alert-icon]:text-destructive"

const alertVariants = cva(
  [
    "group/alert relative grid w-full grid-cols-[1fr] items-center gap-x-3.5 rounded-3xl py-3.5 pr-[18px] pl-3.5 text-left text-sm",
    "has-data-[slot=alert-icon]:grid-cols-[auto_1fr] has-[>svg]:grid-cols-[auto_1fr]",
    "has-data-[slot=alert-action]:grid-cols-[1fr_auto] has-data-[slot=alert-icon]:has-data-[slot=alert-action]:grid-cols-[auto_1fr_auto] has-[>svg]:has-data-[slot=alert-action]:grid-cols-[auto_1fr_auto]",
    "*:[svg]:row-span-2 *:[svg:not([class*='size-'])]:size-[18px]",
    "motion-safe:animate-[notice-in_var(--spring-soft-dur)_var(--spring-soft)_backwards]",
  ],
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        ok,
        warn,
        bad,
        destructive: bad,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

/** The notice's icon: a 36px box. Put a glass icon (`size-9`) or a line icon (18px) in it. */
function AlertIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="alert-icon"
      className={cn(
        "row-span-2 flex size-9 items-center justify-center [&>svg:not([class*='size-'])]:size-[18px]",
        className
      )}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-1 text-[15px] leading-[22px] font-medium tracking-[-0.02em] group-has-data-[slot=alert-icon]/alert:col-start-2 group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-1 text-sm leading-5 text-balance text-muted-foreground group-has-data-[slot=alert-icon]/alert:col-start-2 group-has-[>svg]/alert:col-start-2 md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

/** A button beside the text, centred against both lines. */
function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 ml-3 self-center justify-self-end group-has-data-[slot=alert-icon]/alert:col-start-3 group-has-[>svg]/alert:col-start-3",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertIcon, AlertTitle, AlertDescription, AlertAction }
