"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

function useWait() {
  const [loading, setLoading] = React.useState(false)
  const run = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2200)
  }
  return [loading, run] as const
}

export function ButtonLoading() {
  const [a, runA] = useWait()
  const [b, runB] = useWait()
  const [c, runC] = useWait()

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button loading={a} onClick={runA}>
        Add this device
      </Button>
      <Button variant="tint" loading={b} onClick={runB}>
        Connect
      </Button>
      <Button variant="soft" loading={c} onClick={runC}>
        Start over
      </Button>
    </div>
  )
}
