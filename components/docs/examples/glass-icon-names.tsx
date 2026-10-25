import { GlassIcon, type GlassName } from "@/components/ui/glass-icon"

const names: GlassName[] = [
  "phone",
  "mobile",
  "tablet",
  "computer",
  "router",
  "other",
  "plus",
  "globe",
  "home",
  "shield",
  "chart",
  "calendar",
  "clock",
  "lock",
  "check",
  "trash",
  "refresh",
]

export function GlassIconNames() {
  return (
    <div className="grid w-full max-w-lg grid-cols-4 gap-x-4 gap-y-5 sm:grid-cols-6">
      {names.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <GlassIcon name={name} className="size-10" />
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  )
}
