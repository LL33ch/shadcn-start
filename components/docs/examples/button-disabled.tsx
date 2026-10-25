import { Button } from "@/components/ui/button"

export function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button disabled>Accent</Button>
      <Button variant="tint" disabled>
        Tint
      </Button>
      <Button variant="soft" disabled>
        Soft
      </Button>
    </div>
  )
}
