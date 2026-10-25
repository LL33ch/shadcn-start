import { Button } from "@/components/ui/button"

export function ButtonRender() {
  return (
    <Button
      variant="soft"
      nativeButton={false}
      render={<a href="https://base-ui.com" target="_blank" rel="noreferrer" />}
    >
      Open Base UI
    </Button>
  )
}
