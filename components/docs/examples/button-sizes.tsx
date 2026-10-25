import { Button } from "@/components/ui/button"

export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}
