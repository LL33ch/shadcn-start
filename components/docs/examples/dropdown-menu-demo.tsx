import {
  CopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  RefreshCwIcon,
  Trash2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuDescription,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuText,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="soft" size="icon" aria-label="Device" />}
      >
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <CopyIcon />
          <DropdownMenuText>
            Copy address
            <DropdownMenuDescription>10.8.0.12</DropdownMenuDescription>
          </DropdownMenuText>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PencilIcon />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem variant="warn">
          <RefreshCwIcon />
          Reconnect
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Trash2Icon />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
