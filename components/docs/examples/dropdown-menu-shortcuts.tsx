import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuShortcuts() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="soft" />}>
        File
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            New
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Open
            <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Save
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Print
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
