"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

/*
  Toast. Bottom centre, 24px above the safe area, one at a
  time: a new one replaces the one shown. A 42px pill in toast colours (`knob` on dark, inverted
  on light) with the sheet's pop shadow, padding `0 18 0 13`, 14px at 500 and an 18px icon: a
  check in `ok`, an alert in `bad`. A line under the title makes it a rounded block. 2.4s on
  screen. It comes in on BOUNCY (`y 18, scale .9, blur 6`), goes in 180ms EASE_IN
  (`y 6, scale .96, blur 4`), 140ms when another replaces it; a swipe takes it away. The motion
  lives in app/globals.css.

  The list reads the toast manager, so this file is a client component.
*/

const toast = ToastPrimitive.createToastManager()

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "pointer-events-none fixed inset-x-4 bottom-[calc(24px+env(safe-area-inset-bottom))] z-70 mx-auto h-0 max-w-[420px] outline-none",
        className
      )}
      {...props}
    />
  )
}

function Toast({ className, ...props }: ToastPrimitive.Root.Props) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn(
        "group/toast pointer-events-auto absolute inset-x-0 bottom-0 mx-auto w-fit max-w-full origin-bottom rounded-[21px] bg-(--toast) text-(--toast-fg) shadow-(--pop-shadow) outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/65",
        className
      )}
      {...props}
    />
  )
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "flex min-h-[42px] items-center gap-2 py-2.5 pr-[18px] pl-[13px] has-data-[slot=toast-close]:pr-2 has-data-[slot=toast-action]:pr-2",
        className
      )}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn(
        "text-sm/[22px] font-medium tracking-[-0.01em] empty:hidden",
        className
      )}
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ...props
}: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn(
        "text-sm/[22px] font-medium tracking-[-0.01em] empty:hidden group-has-[[data-slot=toast-title]:not(:empty)]/toast:text-[13px]/[18px] group-has-[[data-slot=toast-title]:not(:empty)]/toast:font-normal group-has-[[data-slot=toast-title]:not(:empty)]/toast:opacity-65",
        className
      )}
      {...props}
    />
  )
}

function ToastAction({ className, ...props }: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      className={cn(
        "ml-2 inline-flex h-7 shrink-0 items-center rounded-full bg-[color-mix(in_srgb,var(--toast-fg)_12%,transparent)] px-3 text-[13px] font-semibold text-(--toast-fg) transition-[background-color,scale] duration-150 ease-(--ease-out) outline-none hover:bg-[color-mix(in_srgb,var(--toast-fg)_18%,transparent)] focus-visible:outline-2 focus-visible:outline-primary/65 active:scale-95",
        className
      )}
      {...props}
    />
  )
}

function ToastClose({
  className,
  children,
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      className={cn(
        "relative grid size-7 shrink-0 place-items-center rounded-full text-[color-mix(in_srgb,var(--toast-fg)_60%,transparent)] transition-[background-color,color,scale] duration-150 ease-(--ease-out) outline-none after:absolute after:-inset-1.5 hover:bg-[color-mix(in_srgb,var(--toast-fg)_12%,transparent)] hover:text-(--toast-fg) focus-visible:outline-2 focus-visible:outline-primary/65 active:scale-80 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ToastPrimitive.Close>
  )
}

const icons: Record<string, React.ReactNode> = {
  success: <CircleCheckIcon className="text-ok" />,
  error: <CircleAlertIcon className="text-destructive" />,
  warning: <TriangleAlertIcon className="text-warn" />,
  info: <InfoIcon className="text-primary" />,
  loading: <Loader2Icon className="animate-spin opacity-70" />,
}

function ToastIcon({ type }: { type: string | undefined }) {
  const icon = type ? icons[type] : null
  if (!icon) return null

  return (
    <span
      data-slot="toast-icon"
      aria-hidden="true"
      className="flex shrink-0 self-start pt-0.5 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[18px]"
    >
      {icon}
    </span>
  )
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()

  return toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem}>
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div className="flex min-w-0 flex-col">
          <ToastTitle />
          <ToastDescription />
        </div>
        {toastItem.actionProps && <ToastAction />}
      </ToastContent>
    </Toast>
  ))
}

/** Mount it once. One toast at a time, 2.4s each. */
function Toaster({
  children,
  toastManager = toast,
  limit = 1,
  timeout = 2400,
  ...props
}: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider
      toastManager={toastManager}
      limit={limit}
      timeout={timeout}
      {...props}
    >
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

const createToastManager = ToastPrimitive.createToastManager
const useToastManager = ToastPrimitive.useToastManager

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
}
