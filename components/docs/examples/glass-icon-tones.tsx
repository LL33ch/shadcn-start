import { TruckIcon } from "lucide-react"

import { GlassIcon, type GlassTone } from "@/components/ui/glass-icon"

const tones: { tone: GlassTone; label: string }[] = [
  { tone: "grey", label: "grey" },
  { tone: "blue", label: "blue" },
  { tone: "green", label: "green" },
  { tone: "orange", label: "orange" },
  { tone: "red", label: "red" },
]

export function GlassIconTones() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {tones.map(({ tone, label }) => (
        <div key={tone} className="flex flex-col items-center gap-2">
          <GlassIcon icon={TruckIcon} tone={tone} className="size-14" />
          <span className="text-[13px] text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  )
}
