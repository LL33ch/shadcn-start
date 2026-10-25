import { ChevronDownIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      <Badge>
        Demo
        <ChevronDownIcon data-icon="inline-end" />
      </Badge>
      <Badge variant="ok">Connected</Badge>
      <Badge variant="warn">Update</Badge>
      <Badge variant="bad">Out of data</Badge>
      <Badge variant="soft">3 of 4</Badge>
    </div>
  )
}
