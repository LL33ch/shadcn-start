import { Alert, AlertTitle } from "@/components/ui/alert"

export function AlertTitleOnly() {
  return (
    <Alert variant="ok" className="max-w-md">
      <AlertTitle>Saved</AlertTitle>
    </Alert>
  )
}
