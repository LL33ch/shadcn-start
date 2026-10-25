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

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="red" />}>Remove</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove this device?</DialogTitle>
          <DialogDescription>
            The router will forget its key. To use the device again you will
            have to add it from the start.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="soft" />}>Cancel</DialogClose>
          <DialogClose render={<Button variant="red" />}>Remove</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
