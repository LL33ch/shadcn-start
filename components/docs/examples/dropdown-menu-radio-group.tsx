import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuRadioGroupDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="soft" />}>
        Position
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Panel position</DropdownMenuLabel>
          <DropdownMenuRadioGroup defaultValue="bottom">
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
