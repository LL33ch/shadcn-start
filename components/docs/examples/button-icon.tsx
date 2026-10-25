import { ArrowUpIcon, MoreHorizontalIcon, PlusIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button variant="soft" size="icon-lg" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button variant="soft" size="icon" aria-label="More">
        <MoreHorizontalIcon />
      </Button>
      <Button variant="soft" size="icon-sm" aria-label="Up">
        <ArrowUpIcon />
      </Button>
      <Button variant="soft" size="icon-xs" aria-label="Close">
        <XIcon />
      </Button>
      <Button variant="accent" size="icon-lg" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
  )
}
