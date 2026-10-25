import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/*
  Select: the field that opens a dropdown (Dropdowns). The trigger
  is 48px on `field`, radius 16, 16/24 at 500, the placeholder `faint`; under the pointer it
  steps up (field + knob 50%), focus is the field's inset ring, a refused one the red ring. Its
  `text-2` chevron turns over as the list opens (260ms EASE_OUT). `sm` is 40px, radius 14.

  The list is the dropdowns' liquid glass, radius 24, padding 6; laid over the trigger with
  the picked row on it (as macOS does) or, with `alignItemWithTrigger={false}`, 8px under it.
  Rows are the dropdown menu's: 34px, radius 18, an accent check on the picked one. One highlight
  glides from row to row (components/menu-glide.tsx). The motion lives in app/globals.css.

  No state and no effects: it renders on the server.
*/

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1.5", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "group/select-trigger flex w-fit items-center justify-between gap-2 rounded-[16px] bg-field pr-3.5 pl-4 text-base font-medium tracking-[-0.012em] whitespace-nowrap text-foreground shadow-[inset_0_0_0_1.5px_transparent] transition-[background-color,box-shadow] duration-200 ease-(--ease-out) outline-none select-none hover:bg-[color-mix(in_srgb,var(--field),var(--knob)_50%)] focus-visible:shadow-[inset_0_0_0_1.5px_color-mix(in_srgb,var(--foreground)_16%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:shadow-[inset_0_0_0_1.5px_var(--destructive)] data-placeholder:text-faint data-[size=default]:h-12 data-[size=sm]:h-10 data-[size=sm]:rounded-[14px] data-[size=sm]:pr-3 data-[size=sm]:pl-3.5 data-[size=sm]:text-[15px] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground transition-[rotate] duration-260 ease-(--ease-out) group-data-popup-open/select-trigger:rotate-180" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  collisionPadding = 12,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    | "align"
    | "alignOffset"
    | "side"
    | "sideOffset"
    | "alignItemWithTrigger"
    | "collisionPadding"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        collisionPadding={collisionPadding}
        className="isolate z-60 outline-none"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "relative isolate max-h-(--available-height) w-(--anchor-width) min-w-[210px] origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-[24px] text-(--glass-text) shadow-[inset_0_0_0_1px_var(--glass-edge),var(--glass-shadow)] backdrop-blur-[28px] backdrop-saturate-[1.8] outline-none [background:var(--glass-bg)]",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List
            data-slot="select-list"
            className="relative p-1.5"
          >
            {children}
          </SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        "px-3.5 pt-2 pb-1 text-xs/4 font-medium text-(--glass-sub)",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex min-h-[34px] w-full cursor-default items-center gap-2.5 rounded-[18px] py-2 pr-10 pl-3.5 text-[14px]/[18px] tracking-[-0.2px] text-(--glass-text) outline-hidden transition-[scale] duration-160 ease-(--ease-out) select-none active:scale-[0.97] data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-3.5 flex size-4 items-center justify-center text-primary" />
        }
      >
        <CheckIcon className="pointer-events-none" strokeWidth={2.4} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "pointer-events-none mx-4 my-1.5 h-px bg-(--glass-sep)",
        className
      )}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex h-7 w-full cursor-default items-center justify-center text-(--glass-sub) backdrop-blur-[28px] [background:var(--glass-bg)] [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex h-7 w-full cursor-default items-center justify-center text-(--glass-sub) backdrop-blur-[28px] [background:var(--glass-bg)] [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
