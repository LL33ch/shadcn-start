"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"

/*
  Drawer. A raised surface with a
  36px radius and the sheet's shadow, floating 16px off the edges (and the safe areas), at most
  400 wide. It rises `100% + 40px` from its edge in 500ms on the drawer curve and goes back in
  420ms, quicker after a flick; a pull follows the finger, the scrim fading with it, and a
  release that does not close it lets it settle back on the same curve. The scrim only dims,
  420ms in and 320ms out. The handle, when shown, is a 36 x 5 `knob` bar.

  It keeps its swipe settings in a context, so it is a client component.
*/

type DrawerContextProps = {
  hasSnapPoints: boolean
  modal: DrawerPrimitive.Root.Props["modal"]
  showSwipeHandle: boolean
  swipeDirection: NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]>
}

const DrawerContext = React.createContext<DrawerContextProps | null>(null)

function useDrawer() {
  const context = React.useContext(DrawerContext)

  if (!context) {
    throw new Error("useDrawer must be used within a Drawer.")
  }

  return context
}

function Drawer({
  modal = true,
  showSwipeHandle = false,
  snapPoints,
  swipeDirection = "down",
  ...props
}: DrawerPrimitive.Root.Props & {
  showSwipeHandle?: boolean
}) {
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0
  const contextValue = React.useMemo(
    () => ({ hasSnapPoints, modal, showSwipeHandle, swipeDirection }),
    [hasSnapPoints, modal, showSwipeHandle, swipeDirection]
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        modal={modal}
        snapPoints={snapPoints}
        swipeDirection={swipeDirection}
        {...props}
      />
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 min-h-dvh bg-scrim opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] transition-opacity duration-420 ease-out select-none data-ending-style:pointer-events-none data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*320ms)] data-snap-points:[--drawer-overlay-min-opacity:0.5] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute",
        className
      )}
      {...props}
    />
  )
}

function DrawerSwipeHandle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      className={cn(
        "relative z-10 flex shrink-0 cursor-grab transition-opacity duration-200 group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-[swipe-axis=x]/drawer-popup:h-full group-data-[swipe-axis=x]/drawer-popup:w-[18px] group-data-[swipe-axis=x]/drawer-popup:items-center group-data-[swipe-axis=y]/drawer-popup:h-[18px] group-data-[swipe-axis=y]/drawer-popup:w-full group-data-[swipe-axis=y]/drawer-popup:justify-center group-data-[swipe-direction=down]/drawer-popup:items-end group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=left]/drawer-popup:justify-start group-data-[swipe-direction=right]/drawer-popup:justify-end group-data-[swipe-direction=up]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:items-start after:block after:shrink-0 after:rounded-full after:bg-knob group-data-[swipe-axis=x]/drawer-popup:after:h-9 group-data-[swipe-axis=x]/drawer-popup:after:w-[5px] group-data-[swipe-axis=y]/drawer-popup:after:h-[5px] group-data-[swipe-axis=y]/drawer-popup:after:w-9 active:cursor-grabbing",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: DrawerPrimitive.Popup.Props) {
  const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = useDrawer()
  const swipeAxis =
    swipeDirection === "down" || swipeDirection === "up" ? "y" : "x"

  return (
    <DrawerPortal data-slot="drawer-portal">
      {modal === true && (
        <DrawerOverlay data-snap-points={hasSnapPoints ? "" : undefined} />
      )}
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-modal={modal}
        className="pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          data-swipe-axis={swipeAxis}
          data-snap-points={hasSnapPoints ? "" : undefined}
          className={cn(
            // Base.
            "group/drawer-popup pointer-events-auto fixed z-50 flex h-(--drawer-content-height) max-h-(--drawer-content-max-height,none) min-h-0 w-(--drawer-content-width,auto) max-w-[400px] transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))] flex-col rounded-[36px] bg-card text-sm text-card-foreground shadow-sheet transition-[transform,height,opacity,filter] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform outline-none select-none [interpolate-size:allow-keywords]",
            // Nested.
            "data-nested-drawer-open:overflow-hidden data-nested-drawer-open:brightness-95",
            // Sizing.
            "[--drawer-content-height:var(--drawer-height,auto)] [--drawer-room:calc(100dvh-2rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] data-[swipe-axis=x]:[--drawer-content-width:calc(100%-2rem)] data-[swipe-axis=y]:[--drawer-content-max-height:var(--drawer-room)] data-[swipe-axis=y]:data-snap-points:[--drawer-content-height:var(--drawer-room)]",
            // Stack.
            "[--peek:1rem] [--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0px))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))] [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--stack-shrink:calc(1-var(--stack-scale))] [--stack-step:0.05]",
            // Transitions.
            "data-ending-style:transform-(--closed-transform) data-ending-style:opacity-[0.9999] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*420ms)] data-nested-drawer-swiping:duration-0 data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*420ms)] data-starting-style:transform-(--closed-transform) data-swiping:duration-0 data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*420ms)]",
            // Axis: y.
            "data-[swipe-axis=y]:inset-x-4 data-[swipe-axis=y]:mx-auto data-[swipe-axis=y]:data-nested-drawer-open:h-(--stack-height)",
            // Axis: x.
            "data-[swipe-axis=x]:inset-y-4 data-[swipe-axis=x]:flex-row",
            // Direction: down.
            "data-[swipe-direction=down]:bottom-[max(1rem,env(safe-area-inset-bottom))] data-[swipe-direction=down]:origin-bottom data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+40px),0)] data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))]",
            // Direction: up.
            "data-[swipe-direction=up]:top-[max(1rem,env(safe-area-inset-top))] data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-40px),0)] data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))]",
            // Direction: left.
            "data-[swipe-direction=left]:left-4 data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-40px),0,0)] data-[swipe-direction=left]:[--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))]",
            // Direction: right.
            "data-[swipe-direction=right]:right-4 data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+40px),0,0)] data-[swipe-direction=right]:[--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))]",
            className
          )}
          {...props}
        >
          {showSwipeHandle && <DrawerSwipeHandle />}
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            className={cn(
              "flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain rounded-[inherit] transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] select-text group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-swiping/drawer-popup:select-none"
            )}
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex shrink-0 flex-col gap-1 p-6 pb-0 group-data-[swipe-axis=y]/drawer-popup:text-center md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex shrink-0 flex-col gap-2.5 p-6 pt-0", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "text-xl/7 font-medium tracking-[-0.5px] text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm/5 text-balance text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
