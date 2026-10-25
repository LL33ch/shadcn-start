import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import { GlassIcon } from "@/components/ui/glass-icon"

export function AlertDemo() {
  return (
    <Alert variant="bad" className="max-w-md">
      <AlertIcon>
        <GlassIcon name="chart" tone="red" className="size-9" />
      </AlertIcon>
      <AlertTitle>Out of data</AlertTitle>
      <AlertDescription>
        Nothing gets through until the limit resets.
      </AlertDescription>
    </Alert>
  )
}
