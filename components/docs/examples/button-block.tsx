import { QrCodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonBlock() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2.5">
      <Button className="w-full">Add this device</Button>
      <Button variant="tint" className="w-full">
        <QrCodeIcon />
        Connect
      </Button>
    </div>
  )
}
