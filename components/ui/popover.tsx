import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"

/*
  Popover: a dropdown that holds things rather than rows. Liquid glass, radius 24, padding 10,
  gap 8, 8px from its button and 12px inside the screen. The title is 15/20 at 500 in `glass-text`, the line
  under it 13/18 in `glass-sub`. It grows from its button on SOFT (`scale .5, blur 6`) and goes
  back in 110ms, as every dropdown; the motion lives in app/globals.css.

  No state and no effects: it renders on the server.
*/

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 8,
  collisionPadding = 12,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "collisionPadding"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className="isolate z-60 outline-none"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "flex w-72 max-w-(--available-width) origin-(--transform-origin) flex-col gap-2 rounded-[calc(24px*var(--radius-factor,1))] p-2.5 text-sm text-(--glass-text) shadow-[inset_0_0_0_1px_var(--glass-edge),var(--glass-shadow)] backdrop-blur-[28px] backdrop-saturate-[1.8] outline-hidden [background:var(--glass-bg)]",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 px-1.5 pt-1", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn(
        "text-[15px]/5 font-medium tracking-[-0.015em] text-(--glass-text)",
        className
      )}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-[13px]/[18px] text-(--glass-sub)", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
