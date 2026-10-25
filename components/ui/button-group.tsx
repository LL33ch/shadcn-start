import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

/*
  Button group. Grouped things stand 2px apart and share their rounded ends, as the
  accordion's closed rows do: no borders between them. The
  group's outer ends keep each item's own radius (a button's pill, a field's 16); the sides that face a neighbour are
  6px. Each button still presses in on its own. Groups inside a group stand 8px apart.
  A field in a group takes the buttons' height. Text is a `field` segment in `text-2`.
  In a group an icon button is as high as its text partner (icon-sm 32, icon 40, icon-lg 48),
  as in shadcn; alone, `icon` stays the 32px knob.

  No state and no effects: it renders on the server.
*/

const buttonGroupVariants = cva(
  "flex w-fit items-stretch gap-0.5 *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>[data-slot=select-trigger]]:h-auto! [&>input]:h-auto [&>input]:flex-1 [&>[data-slot=input-group]]:h-auto [&>[data-size=icon-xs]]:size-6 [&>[data-size=icon-xs]]:rounded-[calc(var(--spacing)*3*var(--radius-factor,1))] [&>[data-size=icon-sm]]:size-8 [&>[data-size=icon-sm]]:rounded-[calc(var(--spacing)*4*var(--radius-factor,1))] [&>[data-size=icon]]:size-10 [&>[data-size=icon]]:rounded-[calc(var(--spacing)*5*var(--radius-factor,1))] [&>[data-size=icon-lg]]:size-12 [&>[data-size=icon-lg]]:rounded-[calc(var(--spacing)*6*var(--radius-factor,1))]",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>[data-slot]:has(~[data-slot])]:rounded-r-[calc(6px*var(--radius-factor,1))] [&>[data-slot]~[data-slot]]:rounded-l-[calc(6px*var(--radius-factor,1))]",
        vertical:
          "flex-col [&>[data-slot]:has(~[data-slot])]:rounded-b-[calc(6px*var(--radius-factor,1))] [&>[data-slot]~[data-slot]]:rounded-t-[calc(6px*var(--radius-factor,1))]",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex items-center gap-2 rounded-[calc(var(--spacing)*5*var(--radius-factor,1))] bg-field px-4 text-[15px] font-medium tracking-[-0.015em] text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4.5",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  })
}

/* A stronger break than the 2px between buttons: the hairline, short of the buttons' ends. */
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-border data-horizontal:mx-3 data-horizontal:w-auto data-vertical:my-2.5 data-vertical:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
