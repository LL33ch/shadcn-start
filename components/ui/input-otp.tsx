"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/*
  One-time code in fields: each slot is a 48px `field` tile with radius 16, 8px apart.
  The slot being typed in carries the focus ring (16% of the text colour) and a soft accent
  caret. A refused code rings every slot in red.

  It stays a client component: `input-otp` reads the typed characters from a context.
*/

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex items-center has-disabled:opacity-50",
        containerClassName
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-12 items-center justify-center rounded-[calc(16px*var(--radius-factor,1))] bg-field text-lg font-medium text-foreground shadow-[inset_0_0_0_1.5px_transparent] transition-shadow duration-300 ease-(--ease-out) outline-none aria-invalid:shadow-[inset_0_0_0_1.5px_var(--destructive)] data-[active=true]:shadow-[inset_0_0_0_1.5px_color-mix(in_srgb,var(--foreground)_16%,transparent)] data-[active=true]:aria-invalid:shadow-[inset_0_0_0_1.5px_var(--destructive)]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-0.5 animate-caret-blink rounded-[calc(1px*var(--radius-factor,1))] bg-primary duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="mx-2 flex items-center text-faint [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
