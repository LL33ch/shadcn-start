import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/*
  Checkbox. It is the switch's sibling: a 20px box, radius 6, on `knob` with no border, accent when on, the colour on SMOOTH.
  Its mark is a bold 14px check (a minus when indeterminate) in `accent-ink`
  that pops in on POP as the copy check does, and leaves in 110ms EASE_IN. Hover +6% text, press
  `scale(.85)`. A refused one gets the field's inset 1.5px red ring until it is checked.
  The motion lives in app/globals.css.

  No state and no effects: it renders on the server.
*/

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "group/checkbox peer relative flex size-5 shrink-0 items-center justify-center rounded-[calc(6px*var(--radius-factor,1))] bg-knob text-primary-foreground shadow-[inset_0_0_0_1.5px_transparent] transition-[background-color,box-shadow,scale] duration-(--spring-smooth-dur) ease-(--spring-smooth) outline-none after:absolute after:-inset-x-3 after:-inset-y-2 hover:bg-[color-mix(in_srgb,var(--knob),var(--foreground)_6%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/65 active:scale-[0.85] active:duration-150 active:ease-(--ease-out) aria-invalid:not-data-checked:not-data-indeterminate:shadow-[inset_0_0_0_1.5px_var(--destructive)] data-checked:bg-primary data-checked:hover:bg-primary/82 data-indeterminate:bg-primary data-indeterminate:hover:bg-primary/82 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:active:scale-100 group-has-disabled/field:opacity-50 group-has-focus-visible/field-label:outline-none",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center [&>svg]:size-3.5"
      >
        <CheckIcon
          strokeWidth={2.8}
          className="group-data-indeterminate/checkbox:hidden"
        />
        <MinusIcon
          strokeWidth={2.8}
          className="hidden group-data-indeterminate/checkbox:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
