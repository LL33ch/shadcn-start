"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(id)
  }, [copied])

  return (
    <Button
      variant="soft"
      size="icon"
      aria-label="Copy code"
      className="absolute top-2.5 right-2.5 opacity-0 transition-opacity group-hover/code:opacity-100 focus-visible:opacity-100"
      onClick={() => {
        void navigator.clipboard?.writeText(text)
        setCopied(true)
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  )
}
