import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/*
  Panel from an edge. A raised surface with a
  36px radius and no shadow, floating 16px off the edges (and the safe areas), at most
  400 wide from the left or the right. It comes in from its side, `100% + 40px` away, in 500ms on
  the drawer curve and goes back in 420ms; the scrim only dims, 420ms in and 320ms out. The ×
  is a soft knob at top 22 / right 22. Padding 24, the title 20/28 at 500.

  No state and no effects: it renders on the server.
*/

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-scrim transition-opacity duration-420 ease-out data-ending-style:opacity-0 data-ending-style:duration-320 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left"
  /** The round × pinned at the top right. Escape and the scrim close the sheet either way. */
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        data-closable={showCloseButton ? "" : undefined}
        className={cn(
          "group/sheet fixed z-50 flex flex-col gap-5 overflow-hidden rounded-[calc(36px*var(--radius-factor,1))] bg-card text-sm text-card-foreground transition-[translate] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none data-ending-style:duration-420",
          // Left and right: the height of the screen less the gutters, at most 400 wide.
          "data-[side=left]:inset-y-4 data-[side=left]:left-4 data-[side=right]:inset-y-4 data-[side=right]:right-4 data-[side=left]:w-[calc(100%-2rem)] data-[side=right]:w-[calc(100%-2rem)] data-[side=left]:max-w-[400px] data-[side=right]:max-w-[400px]",
          // Top and bottom: the width of the screen less the gutters, as high as it needs.
          "data-[side=bottom]:inset-x-4 data-[side=bottom]:bottom-[max(1rem,env(safe-area-inset-bottom))] data-[side=top]:inset-x-4 data-[side=top]:top-[max(1rem,env(safe-area-inset-top))] data-[side=bottom]:max-h-[calc(100dvh-2rem)] data-[side=top]:max-h-[calc(100dvh-2rem)]",
          // In from its side, from 40px past the edge.
          "data-[side=bottom]:data-ending-style:translate-y-[calc(100%+40px)] data-[side=bottom]:data-starting-style:translate-y-[calc(100%+40px)] data-[side=left]:data-ending-style:translate-x-[calc(-100%-40px)] data-[side=left]:data-starting-style:translate-x-[calc(-100%-40px)] data-[side=right]:data-ending-style:translate-x-[calc(100%+40px)] data-[side=right]:data-starting-style:translate-x-[calc(100%+40px)] data-[side=top]:data-ending-style:translate-y-[calc(-100%-40px)] data-[side=top]:data-starting-style:translate-y-[calc(-100%-40px)]",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="soft"
                size="icon"
                className="absolute top-5.5 right-5.5"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-1 p-6 pb-0 group-data-closable/sheet:pr-16",
        className
      )}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2.5 p-6 pt-0", className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "text-xl/7 font-medium tracking-[-0.5px] text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm/5 text-pretty text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
