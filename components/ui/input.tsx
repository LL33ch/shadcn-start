import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

/*
  Field. 48px, radius 16, a `field` fill with no border and no
  shadow, text 16/24 at 500 (16px stops iOS from zooming in) and a `faint` placeholder. Focus
  is an inset 1.5px ring at 16% of the text colour, fading in on 300ms. A refused entry is the
  same ring in red (`aria-invalid`). The caret and the selection wash are the accent.

  No state and no effects: it renders on the server.
*/

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-[16px] bg-field px-4 text-base/6 font-medium tracking-[-0.012em] text-foreground caret-primary shadow-[inset_0_0_0_1.5px_transparent] transition-shadow duration-300 ease-(--ease-out) outline-none selection:bg-primary/26 file:mr-3 file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-faint focus-visible:shadow-[inset_0_0_0_1.5px_color-mix(in_srgb,var(--foreground)_16%,transparent)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:shadow-[inset_0_0_0_1.5px_var(--destructive)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
