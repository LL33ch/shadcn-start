import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import { GlassIcon } from "@/components/ui/glass-icon"

export function AlertTones() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2.5">
      <Alert>
        <AlertIcon>
          <GlassIcon name="globe" className="size-9" />
        </AlertIcon>
        <AlertTitle>Settings changed</AlertTitle>
        <AlertDescription>
          Your page follows the router&apos;s new rules.
        </AlertDescription>
      </Alert>
      <Alert variant="ok">
        <AlertIcon>
          <GlassIcon name="check" tone="green" className="size-9" />
        </AlertIcon>
        <AlertTitle>Everything works</AlertTitle>
        <AlertDescription>All three devices are connected.</AlertDescription>
      </Alert>
      <Alert variant="warn">
        <AlertIcon>
          <GlassIcon name="clock" tone="orange" className="size-9" />
        </AlertIcon>
        <AlertTitle>Access ends soon</AlertTitle>
        <AlertDescription>Your access ends in 3 days.</AlertDescription>
      </Alert>
      <Alert variant="bad">
        <AlertIcon>
          <GlassIcon name="chart" tone="red" className="size-9" />
        </AlertIcon>
        <AlertTitle>Out of data</AlertTitle>
        <AlertDescription>
          Nothing gets through until the limit resets.
        </AlertDescription>
      </Alert>
    </div>
  )
}
