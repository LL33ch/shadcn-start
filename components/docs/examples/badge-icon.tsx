import { CheckIcon, ClockIcon, RefreshCwIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="ok">
        <CheckIcon data-icon="inline-start" />
        Connected
      </Badge>
      <Badge variant="warn">
        <ClockIcon data-icon="inline-start" />
        42 days
      </Badge>
      <Badge variant="soft">
        Reconnect
        <RefreshCwIcon data-icon="inline-end" />
      </Badge>
    </div>
  )
}
