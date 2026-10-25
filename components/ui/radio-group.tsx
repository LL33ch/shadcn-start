import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

/*
  Radio, the checkbox's sibling: a 20px disc on `knob` with no border, accent when
  picked, the colour on SMOOTH. Its mark is an 8px `accent-ink` dot that pops in on POP as the
  checkbox's check does, and leaves in 110ms EASE_IN. Hover +6% text, press `scale(.85)`. A
  refused one gets the field's inset 1.5px red ring until one is picked. The motion lives in
  app/globals.css.

  No state and no effects: it renders on the server.
*/

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-5 shrink-0 items-center justify-center rounded-full bg-knob shadow-[inset_0_0_0_1.5px_transparent] transition-[background-color,box-shadow,scale] duration-(--spring-smooth-dur) ease-(--spring-smooth) outline-none after:absolute after:-inset-x-3 after:-inset-y-2 hover:bg-[color-mix(in_srgb,var(--knob),var(--foreground)_6%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/65 active:scale-[0.85] active:duration-150 active:ease-(--ease-out) aria-invalid:not-data-checked:shadow-[inset_0_0_0_1.5px_var(--destructive)] data-checked:bg-primary data-checked:hover:bg-primary/82 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:active:scale-100 group-has-disabled/field:opacity-50 group-has-focus-visible/field-label:outline-none",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-2 items-center justify-center rounded-full bg-primary-foreground"
      />
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
