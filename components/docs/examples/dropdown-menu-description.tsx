import { CopyIcon, DownloadIcon, LinkIcon } from "lucide-react"

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

export function DropdownMenuDescriptionDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="soft" />}>
        Copy
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <CopyIcon />
          <DropdownMenuText>
            Copy address
            <DropdownMenuDescription>10.8.0.12</DropdownMenuDescription>
          </DropdownMenuText>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LinkIcon />
          <DropdownMenuText>
            Copy name
            <DropdownMenuDescription>laptop.dawn</DropdownMenuDescription>
          </DropdownMenuText>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DownloadIcon />
          Download config
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
