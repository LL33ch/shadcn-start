import { ArrowUpRightIcon, DownloadIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function BadgeAsLink() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="warn" render={<a href="#update" />}>
        <DownloadIcon data-icon="inline-start" />
        Update
      </Badge>
      <Badge render={<a href="#link" />}>
        Open
        <ArrowUpRightIcon data-icon="inline-end" />
      </Badge>
      <Badge variant="soft" render={<button type="button" />}>
        Copy
      </Badge>
    </div>
  )
}
