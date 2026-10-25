import { DownloadIcon, ShieldCheckIcon, UsersIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { GlassIcon } from "@/components/ui/glass-icon"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export function GlassIconUsage() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert>
        <GlassIcon icon={ShieldCheckIcon} tone="green" className="size-9" />
        <AlertTitle>Protected</AlertTitle>
        <AlertDescription>Traffic goes through the tunnel.</AlertDescription>
      </Alert>
      <Item variant="muted">
        <ItemMedia>
          <GlassIcon icon={UsersIcon} tone="blue" className="size-8" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Invite a friend</ItemTitle>
          <ItemDescription>Add up to three people.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemMedia>
          <GlassIcon icon={DownloadIcon} tone="orange" className="size-8" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Update ready</ItemTitle>
          <ItemDescription>Restart to apply it.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}
