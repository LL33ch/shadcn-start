import { GlassIcon } from "@/components/ui/glass-icon"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="red" />}>
        Remove
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <GlassIcon name="trash" tone="red" />
          </AlertDialogMedia>
          <AlertDialogTitle>Remove this device?</AlertDialogTitle>
          <AlertDialogDescription>
            The router will forget its key. To use the device again you will
            have to add it from the start.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="red">Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
