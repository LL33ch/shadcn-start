import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@/lib/utils"

/*
  Tooltip. One 26px pill in toast colours
  (`knob` on dark, inverted on light), 12px at 500, padding 0 10, with the pop shadow and a
  hairline. It shows after 420ms of hover; moving on to the next trigger it is there at once.
  It comes in on SOFT (`scale .9, blur 3`) and fades in 120ms. A Kbd inside takes the pill's
  colours. The motion lives in app/globals.css.

  No state and no effects: it renders on the server.
*/

function TooltipProvider({
  delay = 420,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
  collisionPadding = 12,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "collisionPadding"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className="isolate z-80"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "inline-flex h-6.5 w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-[calc(var(--spacing)*3.25*var(--radius-factor,1))] bg-(--toast) px-2.5 text-xs font-medium tracking-[-0.1px] whitespace-nowrap text-(--toast-fg) shadow-[var(--pop-shadow),0_0_0_1px_var(--line)] has-data-[slot=kbd]:pr-1 **:data-[slot=kbd]:h-4.5 **:data-[slot=kbd]:min-w-4.5 **:data-[slot=kbd]:rounded-full **:data-[slot=kbd]:bg-[color-mix(in_srgb,var(--toast-fg)_14%,transparent)] **:data-[slot=kbd]:px-1.5 **:data-[slot=kbd]:text-(--toast-fg) **:data-[slot=kbd]:shadow-none",
            className
          )}
          {...props}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
