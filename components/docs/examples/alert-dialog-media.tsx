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

export function AlertDialogWithMedia() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="soft" />}>
        Reconnect
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <GlassIcon name="refresh" tone="orange" />
          </AlertDialogMedia>
          <AlertDialogTitle>Reconnect this device?</AlertDialogTitle>
          <AlertDialogDescription>
            It will drop off the network for a few seconds while the router
            builds the tunnel again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Reconnect</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
