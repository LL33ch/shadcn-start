import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuCheckboxes() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="soft" />}>
        View
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuCheckboxItem defaultChecked>
            Status bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem disabled>
            Activity bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Panel</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
