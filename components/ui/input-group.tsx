import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

/*
  Field with something beside it. The group is the
  field: 48px, radius 16, `field` fill, the same focus ring as Input drawn around the whole
  group. The input inside has no fill of its own. A button at the end sits 4px in with a radius
  of 12 (16 less 4).

  No state and no effects: it renders on the server. A press on an addon does not focus the
  input; put the text in a `Label` for that.
*/

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-12 w-full min-w-0 items-center rounded-[16px] bg-field shadow-[inset_0_0_0_1.5px_transparent] transition-shadow duration-300 ease-(--ease-out) outline-none in-data-[slot=combobox-content]:focus-within:shadow-none has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:shadow-[inset_0_0_0_1.5px_color-mix(in_srgb,var(--foreground)_16%,transparent)] has-[[data-slot][aria-invalid=true]]:shadow-[inset_0_0_0_1.5px_var(--destructive)] has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-2 has-[>[data-align=inline-start]]:[&>input]:pl-2",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto items-center justify-center gap-2 text-[15px] font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[8px] [&>svg:not([class*='size-'])]:size-[18px]",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-4 has-[>button]:pl-1",
        "inline-end": "order-last pr-4 has-[>button]:pr-1",
        "block-start":
          "order-first w-full justify-start px-4 pt-3 group-has-[>input]/input-group:pt-3",
        "block-end":
          "order-last w-full justify-start px-4 pb-3 group-has-[>input]/input-group:pb-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva("flex items-center gap-2 shadow-none", {
  variants: {
    size: {
      xs: "h-8 gap-1.5 rounded-[12px] px-3 text-[15px] [&>svg:not([class*='size-'])]:size-4",
      sm: "h-10 rounded-[12px] px-4",
      "icon-xs": "size-8 rounded-[12px] p-0 has-[>svg]:p-0",
      "icon-sm": "h-10 w-12 rounded-[12px] p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
})

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-[15px] text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[18px]",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "h-full flex-1 rounded-none bg-transparent shadow-none focus-visible:shadow-none disabled:bg-transparent aria-invalid:shadow-none",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "min-h-20 flex-1 resize-none rounded-none bg-transparent shadow-none focus-visible:shadow-none disabled:bg-transparent aria-invalid:shadow-none",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
