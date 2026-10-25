"use client"

import * as React from "react"

const ITEM = '[role^="menuitem"]:not([data-disabled])'
const POPUP =
  '[data-slot="dropdown-menu-content"], [data-slot="dropdown-menu-sub-content"], [data-slot="context-menu-content"], [data-slot="context-menu-sub-content"]'
const HIGHLIGHT =
  ':is([data-slot="dropdown-menu-highlight"], [data-slot="context-menu-highlight"])'

// A combobox, a command and a select mark the row they are on (Base UI `data-highlighted`, cmdk
// `data-selected="true"`), for the pointer and the keyboard alike: their highlight follows that
// mark, inside the list.
const LIST =
  '[data-slot="combobox-list"], [data-slot="command-list"], [data-slot="select-list"]'
const OPTION =
  '[data-slot="combobox-item"], [data-slot="command-item"], [data-slot="select-item"]'
const MARKED =
  ':is([data-slot="combobox-item"], [data-slot="select-item"])[data-highlighted]:not([data-disabled]), [data-slot="command-item"][data-selected="true"]:not([data-disabled="true"])'
const LIST_HIGHLIGHT = '[data-slot="list-highlight"]'

const lit = (of = `:is(${HIGHLIGHT}, ${LIST_HIGHLIGHT})`) =>
  document.querySelectorAll<HTMLElement>(`${of}[data-on]`)

function highlightOf(popup: Element) {
  return popup.querySelector<HTMLElement>(`:scope > ${HIGHLIGHT}`)
}

function hide(hl: HTMLElement) {
  hl.removeAttribute("data-on")
  hl.style.opacity = "0"
  hl.style.scale = ""
}

/** One highlight for all the rows of a dropdown, under their icons and words. */
function show(item: HTMLElement) {
  const popup = item.closest<HTMLElement>(POPUP)
  const hl = popup && highlightOf(popup)
  if (!popup || !hl) return
  place(hl, item)
}

/** The list's own highlight, put in as its first child (under the rows) the first time it lights. */
function listHighlightOf(list: HTMLElement) {
  let hl = list.querySelector<HTMLElement>(`:scope > ${LIST_HIGHLIGHT}`)
  if (!hl) {
    hl = document.createElement("span")
    hl.setAttribute("data-slot", "list-highlight")
    hl.setAttribute("aria-hidden", "true")
    list.prepend(hl)
  }
  return hl
}

/** Where a list's highlight should be: on its marked row, or gone. */
function syncList(list: HTMLElement) {
  const item = list.querySelector<HTMLElement>(MARKED)
  if (item) place(listHighlightOf(list), item)
  else {
    const hl = list.querySelector<HTMLElement>(`:scope > ${LIST_HIGHLIGHT}`)
    if (hl) hide(hl)
  }
}

function place(hl: HTMLElement, item: HTMLElement) {
  // From nothing it appears where it is; still on screen (even fading) it glides from where it stands.
  const showing = +getComputedStyle(hl).opacity > 0.01
  if (!showing) hl.style.transition = "none"
  hl.style.translate = `${item.offsetLeft}px ${item.offsetTop}px`
  hl.style.width = `${item.offsetWidth}px`
  hl.style.height = `${item.offsetHeight}px`
  hl.style.borderRadius = getComputedStyle(item).borderRadius
  hl.style.scale = ""
  if (!showing) {
    void hl.offsetWidth
    hl.style.transition = ""
  }
  hl.style.opacity = "1"
  hl.setAttribute("data-ready", "")
  hl.setAttribute("data-on", "")
}

/**
 * The glide of a dropdown's highlight. It fades in (160ms) where the pointer
 * or the keyboard is, glides from row to row on the glide spring (place, size and corners), presses
 * in to 0.97 with its row and fades where the pointer leaves. The lists of a combobox and a command
 * get the same one.
 * Mount it once in the root layout.
 */
export function MenuGlide() {
  React.useEffect(() => {
    const over = (e: PointerEvent) => {
      const target = e.target as Element
      const item = target.closest<HTMLElement>(ITEM)
      if (item && item.closest(POPUP) && e.pointerType !== "touch") {
        show(item)
        return
      }
      // On the glass between rows: let go of it. A row whose submenu is open keeps it.
      const popup = target.closest(POPUP)
      lit(HIGHLIGHT).forEach((hl) => {
        const own = hl.parentElement
        if (popup && own !== popup) return
        if (own?.querySelector("[data-popup-open]")) return
        hide(hl)
      })
    }
    const focus = (e: FocusEvent) => {
      const item = (e.target as Element).closest<HTMLElement>(ITEM)
      if (item && item.closest(POPUP)) show(item)
    }
    const press = (e: PointerEvent) => {
      const option = (e.target as Element).closest<HTMLElement>(OPTION)
      const list = option?.closest<HTMLElement>(LIST)
      const listHl = list?.querySelector<HTMLElement>(
        `:scope > ${LIST_HIGHLIGHT}[data-on]`
      )
      if (listHl) listHl.style.scale = "0.97"

      const item = (e.target as Element).closest<HTMLElement>(ITEM)
      const hl = item?.closest(POPUP) && highlightOf(item.closest(POPUP)!)
      if (hl && hl.hasAttribute("data-on")) hl.style.scale = "0.97"
    }
    const release = () =>
      lit().forEach((hl) => {
        hl.style.scale = ""
      })

    // A row marked or unmarked, or rows filtered in and out: once a frame, each list touched.
    const touched = new Set<HTMLElement>()
    let frame = 0
    const observer = new MutationObserver((records) => {
      for (const r of records) {
        const el = r.target instanceof Element ? r.target : null
        const list = el?.closest<HTMLElement>(LIST)
        if (list) touched.add(list)
      }
      if (touched.size && !frame)
        frame = requestAnimationFrame(() => {
          frame = 0
          touched.forEach((list) => list.isConnected && syncList(list))
          touched.clear()
        })
    })
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-highlighted", "data-selected"],
    })

    document.addEventListener("pointerover", over, true)
    document.addEventListener("focusin", focus, true)
    document.addEventListener("pointerdown", press, true)
    document.addEventListener("pointerup", release, true)
    document.addEventListener("pointercancel", release, true)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      document.removeEventListener("pointerover", over, true)
      document.removeEventListener("focusin", focus, true)
      document.removeEventListener("pointerdown", press, true)
      document.removeEventListener("pointerup", release, true)
      document.removeEventListener("pointercancel", release, true)
    }
  }, [])

  return null
}
