import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

/*
  Combobox: the field with a dropdown under it (Dropdowns). The input
  is an InputGroup, 48px on `field`, its chevron in `text-2` turning over as the list opens
  (260ms EASE_OUT). The list is the dropdowns' liquid glass, radius 24, 8px
  from the field; it grows from there on SOFT (`scale .5, blur 6`) and goes back in 110ms.
  Rows are the dropdown menu's: 34px, radius 18 (24 less 6), pressing in to 0.97; the picked one has
  an accent check. One highlight serves them all: components/menu-glide.tsx puts it in the list
  and glides it to the row the pointer or the keyboard is on (without it, the rows light up). With `multiple`, the picked ones are
  chips in the field: 32px, radius 10 (the name chip), on `knob`. The motion lives in
  app/globals.css.

  No state and no effects: it renders on the server. Lists drawn from a function (`items`)
  need a client parent, as every render prop does.
*/

const Combobox = ComboboxPrimitive.Root

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        "group/combobox-trigger [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground transition-[rotate] duration-260 ease-(--ease-out) group-data-popup-open/combobox-trigger:rotate-180" />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn("text-muted-foreground hover:text-foreground", className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-popup-open:bg-transparent"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  collisionPadding = 12,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "collisionPadding" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
        anchor={anchor}
        className="isolate z-60 outline-none"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            "group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+28px)] origin-(--transform-origin) overflow-hidden rounded-[24px] text-(--glass-text) shadow-[inset_0_0_0_1px_var(--glass-edge),var(--glass-shadow)] backdrop-blur-[28px] backdrop-saturate-[1.8] outline-none [background:var(--glass-bg)] data-[chips=true]:min-w-(--anchor-width) *:data-[slot=input-group]:m-1.5 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-10 *:data-[slot=input-group]:w-auto *:data-[slot=input-group]:rounded-[18px] *:data-[slot=input-group]:bg-[color-mix(in_srgb,var(--glass-text)_6%,transparent)] *:data-[slot=input-group]:[&_input]:text-[15px]",
            className
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar relative max-h-[min(calc(18rem-46px),calc(var(--available-height)-46px))] scroll-py-1.5 overflow-y-auto overscroll-contain p-1.5 data-empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex min-h-[34px] w-full cursor-default items-center gap-2.5 rounded-[18px] py-2 pr-10 pl-3.5 text-[14px]/[18px] tracking-[-0.2px] text-(--glass-text) outline-hidden transition-[background-color,scale] duration-160 ease-(--ease-out) select-none active:scale-[0.97] data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-3.5 flex size-4 items-center justify-center text-primary" />
        }
      >
        <CheckIcon className="pointer-events-none" strokeWidth={2.4} />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        "px-3.5 pt-2 pb-1 text-xs/4 font-medium text-(--glass-sub)",
        className
      )}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center px-3.5 py-3 text-center text-[14px]/[18px] text-(--glass-sub) group-data-empty/combobox-content:flex",
        className
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("mx-4 my-1.5 h-px bg-(--glass-sep)", className)}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-12 flex-wrap items-center gap-1.5 rounded-[16px] bg-field p-2 shadow-[inset_0_0_0_1.5px_transparent] transition-shadow duration-300 ease-(--ease-out) has-disabled:opacity-50 has-aria-invalid:shadow-[inset_0_0_0_1.5px_var(--destructive)] has-[[data-slot=combobox-chip-input]:focus-visible]:shadow-[inset_0_0_0_1.5px_color-mix(in_srgb,var(--foreground)_16%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-8 w-fit items-center justify-center gap-1 rounded-[10px] bg-knob pr-2.5 pl-3 text-sm font-medium tracking-[-0.01em] whitespace-nowrap text-foreground transition-colors duration-150 outline-none has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-1 data-highlighted:bg-[color-mix(in_srgb,var(--knob),var(--foreground)_10%)]",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          className="grid size-6 place-items-center rounded-full text-muted-foreground transition-[background-color,color,scale] duration-150 ease-(--ease-out) hover:bg-[color-mix(in_srgb,var(--knob),var(--foreground)_10%)] hover:text-foreground active:scale-80"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none size-3.5" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn(
        "h-8 min-w-16 flex-1 bg-transparent px-2 text-base font-medium tracking-[-0.012em] text-foreground caret-primary outline-none selection:bg-primary/26 placeholder:text-faint",
        className
      )}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
