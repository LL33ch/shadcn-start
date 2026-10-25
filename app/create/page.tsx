import type { Metadata } from "next"

import { site } from "@/lib/site"
import { CreateClient } from "@/components/create/create-client"

export const metadata: Metadata = {
  title: `Create · ${site.name}`,
  description:
    "Make the theme your own: accent and colours for light and dark, radius and density, live on the components, then copy the CSS.",
}

export default function CreatePage() {
  return <CreateClient />
}
