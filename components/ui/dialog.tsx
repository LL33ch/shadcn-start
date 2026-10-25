import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/*
  Sheet. A raised surface with a 36px radius: below 760px a drawer
  floating 16px off the edges and rising from the bottom, from 760px a dialog centred by layout
  (inset + auto margins, no transform) that pops up from its centre. The scrim only dims.
  The motion lives in app/globals.css (data-slot="dialog-overlay" / "dialog-content").

  No state and no effects: it renders on the server.
*/

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn("fixed inset-0 z-50 bg-scrim", className)}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  /** The round × pinned at the top right. Escape and the scrim close the dialog either way. */
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        data-closable={showCloseButton ? "" : undefined}
        className={cn(
          "group/dialog fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 mx-auto grid h-fit max-h-[calc(100dvh-2rem)] max-w-[400px] gap-5 overflow-y-auto rounded-[36px] bg-card p-6 text-sm text-card-foreground shadow-sheet outline-none min-[760px]:top-4 min-[760px]:bottom-4 min-[760px]:my-auto",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="soft"
                size="icon"
                className="absolute top-[22px] right-[22px]"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-1 group-data-closable/dialog:pr-9",
        className
      )}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** Adds a soft Close button before the others. */
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex gap-2.5 *:flex-1", className)}
      {...props}
    >
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="soft" />}>
          Close
        </DialogPrimitive.Close>
      )}
      {children}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "text-xl/7 font-medium tracking-[-0.5px] text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm/5 text-pretty text-muted-foreground *:[a]:text-primary *:[a]:underline-offset-3 *:[a]:hover:underline",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
