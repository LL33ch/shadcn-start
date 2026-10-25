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

export function AlertDialogTint() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="tint" />}>
        Add a device
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <GlassIcon name="plus" tone="blue" />
          </AlertDialogMedia>
          <AlertDialogTitle>Add a device?</AlertDialogTitle>
          <AlertDialogDescription>
            You have 2 of 3 devices. The next one uses the last place.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Not now</AlertDialogCancel>
          <AlertDialogAction>Add</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
