"use client"

import * as React from "react"

const PRESSABLE = 'button, a[href], [role="button"], label'

/**
 * A control pressed scales down. Let go near its edge after a moment and the pointer is outside
 * it by then, so the browser would drop the click. What was pressed keeps the footprint it had
 * when pressed: let go inside that and it gets the click. Mouse and trackpad only: a touch stays
 * with what it pressed.
 */
export function PressFootprint() {
  React.useEffect(() => {
    let pressed: { el: HTMLElement; at: DOMRect } | null = null
    // The browser's own click of this press, to the ancestor, is to be dropped.
    let swallow = false

    const down = (e: PointerEvent) => {
      const el =
        e.pointerType === "mouse" && e.button === 0
          ? (e.target as Element).closest?.<HTMLElement>(PRESSABLE)
          : null
      pressed = el ? { el, at: el.getBoundingClientRect() } : null
    }
    const up = (e: PointerEvent) => {
      const p = pressed
      pressed = null
      if (!p || p.el.contains(e.target as Node)) return
      const { at } = p
      if (
        e.clientX < at.left ||
        e.clientX > at.right ||
        e.clientY < at.top ||
        e.clientY > at.bottom
      )
        return
      swallow = true
      // The click, if the browser sends one, comes right after this; anything later is another press.
      setTimeout(() => (swallow = false))
      p.el.click()
    }
    const click = (e: MouseEvent) => {
      if (!swallow || !e.isTrusted) return
      swallow = false
      e.stopPropagation()
      e.preventDefault()
    }

    document.addEventListener("pointerdown", down, true)
    document.addEventListener("pointerup", up, true)
    document.addEventListener("click", click, true)
    return () => {
      document.removeEventListener("pointerdown", down, true)
      document.removeEventListener("pointerup", up, true)
      document.removeEventListener("click", click, true)
    }
  }, [])

  return null
}
