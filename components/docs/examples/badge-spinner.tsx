import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export function BadgeWithSpinner() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="warn">
        <Spinner data-icon="inline-start" />
        Connecting
      </Badge>
      <Badge variant="soft">
        Generating
        <Spinner data-icon="inline-end" />
      </Badge>
    </div>
  )
}
