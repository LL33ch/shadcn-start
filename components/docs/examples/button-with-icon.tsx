import { QrCodeIcon, RefreshCwIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button variant="tint">
        <QrCodeIcon />
        Connect
      </Button>
      <Button variant="soft">
        <RefreshCwIcon />
        Reconnect
      </Button>
      <Button variant="red">
        <Trash2Icon />
        Remove
      </Button>
    </div>
  )
}
