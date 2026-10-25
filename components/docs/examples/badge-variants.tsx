import { Badge } from "@/components/ui/badge"

export function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>Accent</Badge>
      <Badge variant="ok">Ok</Badge>
      <Badge variant="warn">Warn</Badge>
      <Badge variant="bad">Bad</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  )
}
