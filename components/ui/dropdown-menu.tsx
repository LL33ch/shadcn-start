import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/*
  Dropdown. Liquid glass: radius 24, padding 6, at
  least 210 wide, 8px from its button and centred on it. Rows are 34px high (50 with a line under
  the label), radius 18, concentric with the glass. It grows from its button on SOFT
  (`scale .5, blur 6`) and goes back in 110ms; the motion lives in app/globals.css.

  One highlight serves all the rows (the span under the popup's top). components/menu-glide.tsx
  fades it in under the pointer or the keyboard, glides it from row to row on the glide spring and
  presses it in to 0.97; the icon under it grows to 1.08. Without MenuGlide the rows light up
  themselves, so nothing breaks. This file has no state and no effects: it renders on the server.
*/

const row =
  "group/dropdown-menu-item relative flex min-h-8.5 cursor-default items-center gap-2.5 rounded-[calc(18px*var(--radius-factor,1))] px-3.5 py-2 text-[14px]/[18px] font-normal tracking-[-0.2px] text-(--glass-text) outline-hidden transition-[background-color,color,scale] duration-160 ease-(--ease-out) select-none active:scale-[0.97] data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-10 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-[scale] [&_svg]:duration-(--spring-glide-dur) [&_svg]:ease-(--spring-glide) data-highlighted:[&_svg]:scale-[1.08] [&_svg:not([class*='size-'])]:size-4"

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 8,
  collisionPadding = 12,
  className,
  children,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "collisionPadding"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-60 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "relative max-h-(--available-height) min-w-[210px] origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-[calc(24px*var(--radius-factor,1))] p-1.5 text-(--glass-text) shadow-[inset_0_0_0_1px_var(--glass-edge),var(--glass-shadow)] backdrop-blur-[28px] backdrop-saturate-[1.8] outline-none [background:var(--glass-bg)]",
            className
          )}
          {...props}
        >
          <span data-slot="dropdown-menu-highlight" aria-hidden="true" />
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset ? "" : undefined}
      className={cn(
        "px-3.5 pt-2 pb-1 text-xs/4 font-medium text-(--glass-sub) data-inset:pl-10",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  /** `warn` is for an action with a cost, `destructive` for one that cannot be undone. */
  variant?: "default" | "destructive" | "warn"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset ? "" : undefined}
      data-variant={variant}
      className={cn(
        row,
        "data-[variant=destructive]:text-destructive data-[variant=warn]:text-warn",
        className
      )}
      {...props}
    />
  )
}

/** The label and its line under it, when an item has one: `DropdownMenuText` holds both. */
function DropdownMenuText({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-text"
      className={cn("flex min-w-0 flex-1 flex-col gap-px", className)}
      {...props}
    />
  )
}

function DropdownMenuDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-description"
      className={cn(
        "block text-[11.5px]/[15px] tracking-normal text-(--glass-sub) tabular-nums",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset ? "" : undefined}
      className={cn(row, "data-popup-open:bg-(--glass-hl)", className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto text-(--glass-sub)" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -6,
  side = "right",
  sideOffset = 4,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("min-w-[160px]", className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset ? "" : undefined}
      className={cn(row, "pr-10", className)}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-3.5 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset ? "" : undefined}
      className={cn(row, "pr-10", className)}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-3.5 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("mx-4 my-1.5 h-px bg-(--glass-sep)", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto pl-4 text-xs tracking-widest text-(--glass-sub)",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuText,
  DropdownMenuDescription,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
