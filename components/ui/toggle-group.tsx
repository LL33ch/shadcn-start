"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

/*
  Toggle group. With `spacing={0}` it is the segmented control: a `field` track, padding 4, radius 16, the toggles inside it clear, `text` under the
  pointer, and the pressed ones on a `--seg` pill, radius 12 (white with a soft shadow in
  light). With spacing, it is a row of toggles that far apart.

  It hands its size and variant to its items through a context, so it is a client component.
*/

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-vertical:flex-col data-vertical:items-stretch data-[spacing=0]:gap-0.5 data-[spacing=0]:rounded-[16px] data-[spacing=0]:bg-field data-[spacing=0]:p-1 data-[spacing=0]:data-[size=lg]:rounded-[18px] data-[spacing=0]:data-[size=sm]:rounded-[14px]",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "focus-visible:z-10",
        // In a track: clear, square-ish segments, the pressed ones on the picked pill.
        "data-[spacing=0]:rounded-[12px] data-[spacing=0]:bg-transparent data-[spacing=0]:hover:bg-transparent data-[spacing=0]:data-pressed:bg-(--seg) data-[spacing=0]:data-pressed:shadow-(--seg-shadow) data-[spacing=0]:data-pressed:hover:bg-(--seg) data-[spacing=0]:data-[size=lg]:rounded-[14px] data-[spacing=0]:data-[size=sm]:rounded-[10px]",
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
}

export { ToggleGroup, ToggleGroupItem }
