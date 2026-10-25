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

export function DialogStickyFooter() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="soft" />}>
        Sticky footer
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of use</DialogTitle>
          <DialogDescription>
            The buttons stay in view while the text scrolls.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-6 no-scrollbar max-h-[40vh] overflow-y-auto px-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="soft" />}>Decline</DialogClose>
          <DialogClose render={<Button />}>Accept</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
