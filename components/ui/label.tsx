import * as React from "react"

import { cn } from "@/lib/utils"

/* A field's name: 14/20 at 500. No state and no effects, so it renders on the server. */

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm/5 font-medium tracking-[-0.01em] text-foreground select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
