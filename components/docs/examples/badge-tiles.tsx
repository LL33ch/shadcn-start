import { AppleIcon, PlayIcon } from "lucide-react"

import {
  BadgeTile,
  BadgeTileIcon,
  BadgeTileLabel,
  BadgeTileText,
} from "@/components/ui/badge"

export function BadgeTiles() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-2">
      <BadgeTile
        render={<a href="#app-store" />}
        className="gap-2.5 px-2.5 [&_[data-slot=badge-tile-icon]]:size-8"
      >
        <BadgeTileIcon>
          <AppleIcon />
        </BadgeTileIcon>
        <BadgeTileText>
          <BadgeTileLabel>Download on</BadgeTileLabel>
          App Store
        </BadgeTileText>
      </BadgeTile>
      <BadgeTile
        render={<a href="#google-play" />}
        className="gap-2.5 px-2.5 [&_[data-slot=badge-tile-icon]]:size-8"
      >
        <BadgeTileIcon>
          <PlayIcon />
        </BadgeTileIcon>
        <BadgeTileText>
          <BadgeTileLabel>Get it on</BadgeTileLabel>
          Google Play
        </BadgeTileText>
      </BadgeTile>
    </div>
  )
}
