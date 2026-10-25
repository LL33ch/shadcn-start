import { Button } from "@/components/ui/button"

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button variant="accent">Accent</Button>
      <Button variant="tint">Tint</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="red">Red</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
