import { WifiIcon } from "lucide-react"

import { GlassIcon } from "@/components/ui/glass-icon"

const sizes = [
  { className: "size-6", label: "24" },
  { className: "size-8", label: "32" },
  { className: "size-11", label: "44" },
  { className: "size-14", label: "56" },
  { className: "size-16", label: "64" },
]

export function GlassIconSizes() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      {sizes.map(({ className, label }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <GlassIcon icon={WifiIcon} tone="blue" className={className} />
          <span className="text-[13px] text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  )
}
