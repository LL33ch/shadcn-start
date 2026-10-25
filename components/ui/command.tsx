import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { CheckIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"

/*
  Command: the dropdown menu's rows under a search field, on a raised
  surface. It stays on the page, so it is `card`, not glass: radius 24, padding 6. The field is
  40px on `field`, radius 18 (24 less 6), with a 16px search icon in `text-2`. Rows are 34px,
  radius 18, the icon under the highlight growing to 1.08; a checked row has an accent check.
  One highlight serves them all: components/menu-glide.tsx puts it in the list and glides it to
  the row the pointer or the keyboard is on (without it, the rows light up).

  CommandDialog is the same on a sheet that pops up a third of the way down (a drawer on a
  phone). No state and no effects here: cmdk holds them.
*/

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-[24px]! bg-card p-1.5 text-card-foreground in-data-[slot=dialog-content]:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
  children: React.ReactNode
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "max-w-[520px] gap-0 overflow-hidden rounded-[24px] p-0 min-[760px]:top-[18vh] min-[760px]:bottom-auto min-[760px]:my-0",
          className
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="pb-1.5">
      <InputGroup className="h-10 rounded-[18px]">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "h-full w-full min-w-0 flex-1 bg-transparent pr-3.5 text-[15px] font-medium tracking-[-0.012em] text-foreground caret-primary outline-hidden selection:bg-primary/26 placeholder:text-faint disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <InputGroupAddon className="pl-3.5">
          <SearchIcon className="size-4 text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar relative max-h-72 scroll-py-1.5 overflow-x-hidden overflow-y-auto overscroll-contain outline-none",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(
        "py-6 text-center text-[14px]/[18px] text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground **:[[cmdk-group-heading]]:px-3.5 **:[[cmdk-group-heading]]:pt-2 **:[[cmdk-group-heading]]:pb-1 **:[[cmdk-group-heading]]:text-xs/4 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("mx-4 my-1.5 h-px bg-border", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item relative flex min-h-[34px] cursor-default items-center gap-2.5 rounded-[18px] px-3.5 py-2 text-[14px]/[18px] tracking-[-0.2px] text-foreground outline-hidden transition-[scale] duration-160 ease-(--ease-out) select-none active:scale-[0.97] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-[scale,color] [&_svg]:duration-(--spring-glide-dur) [&_svg]:ease-(--spring-glide) [&_svg:not([class*='size-'])]:size-4 [&>svg:not([data-slot])]:text-muted-foreground data-[selected=true]:[&>svg:not([data-slot])]:scale-[1.08] data-[selected=true]:[&>svg:not([data-slot])]:text-foreground",
        className
      )}
      {...props}
    >
      {children}
      <CheckIcon
        data-slot="command-item-check"
        strokeWidth={2.4}
        className="ml-auto text-primary opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100"
      />
    </CommandPrimitive.Item>
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs tracking-[0.08em] text-faint tabular-nums transition-colors duration-160 group-data-[selected=true]/command-item:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
