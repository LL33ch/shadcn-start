import { InfoIcon, TriangleAlertIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertLineIcon() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2.5">
      <Alert>
        <InfoIcon />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          A line icon works too: it takes the tone&apos;s colour.
        </AlertDescription>
      </Alert>
      <Alert variant="warn">
        <TriangleAlertIcon />
        <AlertTitle>Outside allowed hours</AlertTitle>
        <AlertDescription>Access is open from 08:00 to 23:00.</AlertDescription>
      </Alert>
    </div>
  )
}
