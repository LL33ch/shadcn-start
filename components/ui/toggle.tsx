import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
  Toggle: the soft button that stays down. A pill in
  `text-2`; under the pointer it lights up in half a knob, pressed it sits on `knob` in `text`
  (+6% under the pointer). It shrinks to 0.95 under a press. `outline` has no line: it stands
  on `field`. Sizes follow the buttons: 32, 40 and 48.

  No state and no effects: it renders on the server.
*/

const toggleVariants = cva(
  "group/toggle inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium tracking-[-0.012em] whitespace-nowrap text-muted-foreground transition-[background-color,color,scale] duration-200 ease-(--ease-out) outline-none select-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/65 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-pressed:bg-secondary data-pressed:text-foreground data-pressed:hover:bg-[color-mix(in_srgb,var(--secondary),var(--foreground)_6%)] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-transparent hover:bg-[color-mix(in_srgb,var(--secondary)_55%,transparent)]",
        outline:
          "bg-field hover:bg-[color-mix(in_srgb,var(--field),var(--secondary)_50%)]",
      },
      size: {
        default:
          "h-10 min-w-10 px-4 text-[15px] has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5 [&_svg:not([class*='size-'])]:size-[18px]",
        sm: "h-8 min-w-8 px-3 text-sm has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 min-w-12 px-5 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
