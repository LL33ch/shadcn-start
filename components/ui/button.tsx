import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
  Button. A pill, 48px high, that shrinks to 0.95 under a press.
  accent is the one primary action, tint a quiet primary, soft a control on any surface, red the
  destructive one. Waiting: the button keeps its size, its content blurs away and the orb comes up
  through the blur in the button's own colour. The motion lives in app/globals.css.

  No state and no effects: it renders on the server, and buttonVariants can be called there too.
*/

const accent =
  "bg-primary font-semibold text-primary-foreground hover:bg-primary/82"
const red = "bg-destructive font-semibold text-white hover:bg-destructive/85"
const soft =
  "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_srgb,var(--secondary),var(--foreground)_6%)] aria-expanded:bg-[color-mix(in_srgb,var(--secondary),var(--foreground)_10%)]"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-full text-base font-medium tracking-[-0.015em] whitespace-nowrap transition-[scale,background-color,color,opacity] duration-200 ease-(--ease-out) outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/65 active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: accent,
        accent,
        tint: "bg-primary/13 font-semibold text-primary hover:bg-primary/20 active:bg-primary/24",
        soft,
        secondary: soft,
        red,
        destructive: red,
        outline:
          "bg-muted text-foreground hover:bg-secondary aria-expanded:bg-secondary",
        ghost: "text-foreground hover:bg-secondary aria-expanded:bg-secondary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-[18px]",
        sm: "h-8 gap-2 px-4 text-[15px] has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5 [&_svg:not([class*='size-'])]:size-4",
        xs: "h-6 gap-1.5 px-3 text-[13px] active:scale-[0.94] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2.5 px-7 text-lg [&_svg:not([class*='size-'])]:size-5",
        icon: "size-8 p-0 duration-150 active:scale-80 [&_svg:not([class*='size-'])]:size-4",
        "icon-xs":
          "size-6 p-0 duration-150 active:scale-80 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 p-0 duration-150 active:scale-80 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg":
          "size-10 p-0 duration-150 active:scale-[0.85] [&_svg:not([class*='size-'])]:size-[18px]",
      },
    },
    compoundVariants: [
      { variant: "link", className: "h-auto rounded-md px-0 active:scale-100" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  loading,
  disabled,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /**
     * Waiting for an answer: the button keeps its size, its content blurs away and the orb
     * comes up in its place. It stays focusable and ignores clicks meanwhile. Leave it out
     * for a plain button.
     */
    loading?: boolean
  }) {
  const orbs = typeof loading === "boolean"

  return (
    <ButtonPrimitive
      data-slot="button"
      data-size={size}
      data-orbs={orbs ? "" : undefined}
      data-busy={loading ? "" : undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      focusableWhenDisabled={!!loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {orbs
        ? React.Children.map(children, (child) =>
            typeof child === "string" || typeof child === "number" ? (
              <span>{child}</span>
            ) : (
              child
            )
          )
        : children}
      {orbs && (
        <span data-slot="button-orb" aria-hidden="true">
          <i />
          <i />
        </span>
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
