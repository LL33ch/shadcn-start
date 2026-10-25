import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

/*
  Button group. Grouped things stand 2px apart and share their rounded ends, as the
  accordion's closed rows do: no borders between them. The
  group's outer ends keep the pill (a field keeps its 16); the sides that face a neighbour are
  6px. Each button still presses in on its own. Groups inside a group stand 8px apart.
  A field in a group takes the buttons' height. Text is a `field` segment in `text-2`.
  In a group an icon button is as high as its text partner (icon-sm 32, icon 40, icon-lg 48),
  as in shadcn; alone, `icon` stays the 32px knob.

  No state and no effects: it renders on the server.
*/

const buttonGroupVariants = cva(
  "flex w-fit items-stretch gap-0.5 *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-[16px]! [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>[data-slot=select-trigger]]:h-auto! [&>input]:h-auto [&>input]:flex-1 [&>[data-slot=input-group]]:h-auto [&>[data-size=icon-xs]]:size-6 [&>[data-size=icon-sm]]:size-8 [&>[data-size=icon]]:size-10 [&>[data-size=icon-lg]]:size-12",
  {
    variants: {
      orientation: {
        horizontal:
          "*:data-slot:rounded-r-[6px] [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-full! [&>input[data-slot]:not(:has(~[data-slot]))]:rounded-r-[16px]! [&>[data-slot=select-trigger][data-size]:not(:has(~[data-slot]))]:rounded-r-[16px]! [&>[data-slot]~[data-slot]]:rounded-l-[6px]",
        vertical:
          "flex-col *:data-slot:rounded-b-[6px] [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-full! [&>input[data-slot]:not(:has(~[data-slot]))]:rounded-b-[16px]! [&>[data-slot=select-trigger][data-size]:not(:has(~[data-slot]))]:rounded-b-[16px]! [&>[data-slot]~[data-slot]]:rounded-t-[6px]",
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
          "flex items-center gap-2 rounded-full bg-field px-4 text-[15px] font-medium tracking-[-0.015em] text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[18px]",
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
