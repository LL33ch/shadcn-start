import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button>Add this device</Button>
      <Button variant="tint">Connect</Button>
      <Button variant="soft">Cancel</Button>
      <Button variant="red">Remove</Button>
    </div>
  )
}
