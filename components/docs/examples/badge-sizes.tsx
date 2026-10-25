import { Badge } from "@/components/ui/badge"

export function BadgeSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>Default</Badge>
      <Badge size="sm">Small</Badge>
      <Badge variant="ok" size="sm">
        4
      </Badge>
    </div>
  )
}
