import { RefreshCwIcon } from "lucide-react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { GlassIcon } from "@/components/ui/glass-icon"

export function AlertActionExample() {
  return (
    <Alert variant="warn" className="max-w-lg">
      <AlertIcon>
        <GlassIcon name="refresh" tone="orange" className="size-9" />
      </AlertIcon>
      <AlertTitle>A device needs an update</AlertTitle>
      <AlertDescription>The admin changed the settings.</AlertDescription>
      <AlertAction>
        <Button variant="soft" size="sm">
          <RefreshCwIcon />
          Reconnect
        </Button>
      </AlertAction>
    </Alert>
  )
}
