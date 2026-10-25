import * as React from "react"

import { cn } from "@/lib/utils"

/*
  The field for more than one line: the same `field` fill, radius 16, text and focus
  ring as Input, growing with its content. No state and no effects.
*/

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-[calc(16px*var(--radius-factor,1))] bg-field px-4 py-3 text-base/6 font-medium tracking-[-0.012em] text-foreground caret-primary shadow-[inset_0_0_0_1.5px_transparent] transition-shadow duration-300 ease-(--ease-out) outline-none selection:bg-primary/26 placeholder:text-faint focus-visible:shadow-[inset_0_0_0_1.5px_color-mix(in_srgb,var(--foreground)_16%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:shadow-[inset_0_0_0_1.5px_var(--destructive)]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
