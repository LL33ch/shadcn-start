import {
  AppleIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  SmartphoneIcon,
} from "lucide-react"

import {
  BadgeTile,
  BadgeTileIcon,
  BadgeTileLabel,
  BadgeTileText,
} from "@/components/ui/badge"

export function BadgeTileDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <BadgeTile render={<a href="#app-store" />}>
        <BadgeTileIcon>
          <AppleIcon />
        </BadgeTileIcon>
        <BadgeTileText>
          <BadgeTileLabel>Download on the</BadgeTileLabel>
          App Store
        </BadgeTileText>
        <ExternalLinkIcon />
      </BadgeTile>
      <BadgeTile render={<button type="button" />}>
        <BadgeTileIcon primary>
          <SmartphoneIcon />
        </BadgeTileIcon>
        <BadgeTileText>
          <BadgeTileLabel>Step 2</BadgeTileLabel>
          Open the app
        </BadgeTileText>
        <ChevronRightIcon />
      </BadgeTile>
    </div>
  )
}
