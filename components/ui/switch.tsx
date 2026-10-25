import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

/*
  Switch. A 44 x 26 pill on `knob`, accent when on.
  Its knob is 20px, 3px in, `text-2` (on: `accent-ink`), and moves 18px. Held down, it stretches
  to 27px toward where it goes (from the left when off, toward the left when on) and finishes
  the move when let go, as iOS switches do. Track colour, knob travel, width and colour all run
  on SMOOTH; no hover, no press shrink. `sm` is the same at 36 x 22 (16px knob, 22 held).

  No state and no effects: it renders on the server.
*/

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full bg-knob shadow-[inset_0_0_0_1.5px_transparent] transition-[background-color,box-shadow] duration-(--spring-smooth-dur) ease-(--spring-smooth) outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/65 aria-invalid:not-data-checked:shadow-[inset_0_0_0_1.5px_var(--destructive)] data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[size=default]:h-[26px] data-[size=default]:w-[44px] data-[size=sm]:h-[22px] data-[size=sm]:w-[36px] group-has-disabled/field:opacity-50 group-has-focus-visible/field-label:outline-none",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none absolute top-[3px] left-[3px] block rounded-full bg-muted-foreground transition-[translate,width,background-color] duration-(--spring-smooth-dur) ease-(--spring-smooth) data-checked:bg-primary-foreground group-data-[size=default]/switch:h-5 group-data-[size=default]/switch:w-5 group-data-[size=default]/switch:data-checked:translate-x-[18px] group-data-[size=default]/switch:group-[:active:not([data-disabled])]/switch:w-[27px] group-data-[size=default]/switch:group-[:active:not([data-disabled])]/switch:data-checked:translate-x-[11px] group-data-[size=sm]/switch:h-4 group-data-[size=sm]/switch:w-4 group-data-[size=sm]/switch:data-checked:translate-x-[14px] group-data-[size=sm]/switch:group-[:active:not([data-disabled])]/switch:w-[22px] group-data-[size=sm]/switch:group-[:active:not([data-disabled])]/switch:data-checked:translate-x-[8px]"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
