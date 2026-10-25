import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"

import { cn } from "@/lib/utils"

/*
  Hover card: the popover's glass for a preview that opens under the pointer. Liquid glass,
  radius 24, padding 16 (it holds words and a picture, not controls), 8px from its trigger and
  12px inside the screen, in `glass-text`. It grows from its trigger on SOFT (`scale .5,
  blur 6`) and goes back in 110ms, as every dropdown; the motion lives in app/globals.css.

  No state and no effects: it renders on the server.
*/

function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
  return (
    <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  collisionPadding = 12,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "collisionPadding"
  >) {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className="isolate z-60 outline-none"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            "w-72 max-w-(--available-width) origin-(--transform-origin) rounded-[calc(24px*var(--radius-factor,1))] p-4 text-sm text-(--glass-text) shadow-[inset_0_0_0_1px_var(--glass-edge),var(--glass-shadow)] backdrop-blur-[28px] backdrop-saturate-[1.8] outline-hidden [background:var(--glass-bg)]",
            className
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
