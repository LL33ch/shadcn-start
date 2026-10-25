import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogNoCloseButton() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="soft" />}>
        No close button
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Reconnect this device?</DialogTitle>
          <DialogDescription>
            It will drop off the network for a few seconds while the router
            builds the tunnel again.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="soft" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Reconnect</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
