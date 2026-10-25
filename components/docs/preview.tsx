"use client"

import * as React from "react"

import { registry } from "./registry"

class Boundary extends React.Component<
  { name: string; children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <p className="max-w-md text-center text-sm text-warn">
          {this.props.name} failed to render: {this.state.error.message}
        </p>
      )
    }
    return this.props.children
  }
}

/** Renders one docs example, loaded on demand. */
export function Preview({ name }: { name: string }) {
  const Example = registry[name]

  if (!Example) {
    return (
      <p className="max-w-sm text-center text-sm text-muted-foreground">
        This example is not available here: it needs the RTL setup or the AI
        SDK.
      </p>
    )
  }

  return (
    <Boundary name={name}>
      <React.Suspense
        fallback={
          <div className="h-10 w-40 animate-pulse rounded-xl bg-muted" />
        }
      >
        <Example />
      </React.Suspense>
    </Boundary>
  )
}
