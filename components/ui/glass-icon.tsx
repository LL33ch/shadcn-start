import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type GlassTone = "grey" | "blue" | "green" | "red" | "orange"

interface Shape {
  /** The tinted back shape. */
  b: string
  /** The frosted front pane. */
  f: string
  /** Detail strokes on the pane. */
  d: string
}

// Glass icons: a tinted back shape, the same shape blurred behind a
// frosted pane, a rim, and white detail strokes. Colours come from the .gi rules in globals.css.
const SHAPES = {
  phone: {
    b: '<rect x="10" y="2" width="10" height="16" rx="3"/>',
    f: '<rect x="4" y="5" width="11.5" height="17" rx="3.2"/>',
    d: '<path d="M8.3 19h3.9"/>',
  },
  mobile: {
    b: '<rect x="8.5" y="2" width="13.5" height="17" rx="2.6"/>',
    f: '<rect x="2.5" y="7" width="9.5" height="15" rx="2.6"/>',
    d: '<path d="M6 19.4h2.5"/>',
  },
  tablet: {
    b: '<rect x="9.5" y="2" width="12" height="15" rx="2.6"/>',
    f: '<rect x="2.5" y="5.5" width="14.5" height="16.5" rx="2.8"/>',
    d: '<path d="M8 19h3.5"/>',
  },
  computer: {
    b: '<rect x="6" y="14" width="17" height="7" rx="2.2"/>',
    f: '<rect x="1.5" y="3.5" width="19" height="13" rx="2.6"/>',
    d: '<path d="M5.5 12.5h5"/>',
  },
  router: {
    b: '<rect x="5.5" y="2" width="2.8" height="11" rx="1.4"/><rect x="15.7" y="2" width="2.8" height="11" rx="1.4"/>',
    f: '<rect x="2" y="10.5" width="20" height="10.5" rx="3"/>',
    d: '<path d="M6.6 15.75h.4M10 15.75h.4" stroke-width="2.4"/>',
  },
  other: {
    b: '<circle cx="16" cy="8" r="6"/>',
    f: '<rect x="2.5" y="8" width="14" height="14" rx="3.6"/>',
    d: "",
  },
  plus: {
    b: '<rect x="9" y="2" width="13" height="13" rx="4"/>',
    f: '<circle cx="10" cy="14" r="8"/>',
    d: '<path d="M10 10.6v6.8M6.6 14h6.8"/>',
  },
  globe: {
    b: '<circle cx="16" cy="8" r="6"/>',
    f: '<circle cx="10.5" cy="13.5" r="8.5"/>',
    d: '<path d="M2.5 13.5h16" stroke-width="1.1"/><path d="M10.5 5.2c2.4 2.6 2.4 14 0 16.6M10.5 5.2c-2.4 2.6-2.4 14 0 16.6" stroke-width="1.1"/>',
  },
  home: {
    b: '<rect x="12" y="2" width="10" height="10" rx="3"/>',
    f: '<path d="M2.5 11.6 10.5 5l8 6.6V20a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2z"/>',
    d: '<path d="M8.8 22v-4.2h3.4V22"/>',
  },
  shield: {
    b: '<circle cx="16" cy="8" r="6"/>',
    f: '<path d="M10.5 4.5l7.5 2.8v5.4c0 4.6-3.2 7.4-7.5 8.8C6.2 20.1 3 17.3 3 12.7V7.3z"/>',
    d: '<path d="M7.3 13.2l2.3 2.3 4.2-4.6"/>',
  },
  chart: {
    b: '<rect x="14.5" y="2" width="7" height="20" rx="2.6"/>',
    f: '<rect x="2.5" y="8.5" width="14" height="13.5" rx="3.4"/>',
    d: '<path d="M6 18l2.8-3 2.2 1.8L14 12.8"/>',
  },
  calendar: {
    b: '<rect x="8.5" y="2" width="13.5" height="13" rx="3"/>',
    f: '<rect x="2" y="6" width="15.5" height="16" rx="3.4"/>',
    d: '<path d="M2.4 10.6h14.7" stroke-width="1"/><path d="M6.2 14.6h.4M9.5 14.6h.4M12.8 14.6h.4M6.2 18h.4M9.5 18h.4" stroke-width="2.2"/>',
  },
  clock: {
    b: '<circle cx="16" cy="8" r="6"/>',
    f: '<circle cx="10.5" cy="13.5" r="8.5"/>',
    d: '<path d="M10.5 9v4.8l3 1.8"/>',
  },
  lock: {
    b: '<rect x="7" y="2" width="10" height="11" rx="5"/>',
    f: '<rect x="3" y="9" width="18" height="13" rx="3.4"/>',
    d: '<path d="M12 14v3"/>',
  },
  check: {
    b: '<circle cx="14.5" cy="9.5" r="7.5"/>',
    f: '<circle cx="10.5" cy="13.5" r="8.5"/>',
    d: '<path d="M6.6 13.8l2.7 2.7 5.3-5.6"/>',
  },
  trash: {
    b: '<rect x="3" y="2.5" width="18" height="5" rx="2.3"/>',
    f: '<path d="M4.8 8.5h14.4l-1.1 11.6a2.2 2.2 0 0 1-2.2 1.9H8.1a2.2 2.2 0 0 1-2.2-1.9z"/>',
    d: '<path d="M10 12v6M14 12v6"/>',
  },
  refresh: {
    b: '<circle cx="16" cy="8" r="6"/>',
    f: '<circle cx="10.5" cy="13.5" r="8.5"/>',
    d: '<path d="M14.2 11.3a4.2 4.2 0 1 0 .3 3.6"/><path d="M14.6 8.8v2.8h-2.8"/>',
  },
} satisfies Record<string, Shape>

export type GlassName = keyof typeof SHAPES

// Any Lucide icon sits on the same pane as `other`: a tinted circle behind a frosted square.
// Lucide draws on a 24 grid at stroke 2; at 9px it is scaled to 0.375, so the stroke is raised
// to 4 to keep the 1.5 line of the drawn details.
const PANE: Shape = {
  b: SHAPES.other.b,
  f: SHAPES.other.f,
  d: "",
}
const MARK = { x: 5, y: 10.5, size: 9, stroke: 4 }

type GlassIconProps = {
  tone?: GlassTone
  className?: string
} & (
  | {
      /** One of the drawn glass shapes. */
      name: GlassName
      icon?: never
    }
  | {
      name?: never
      /** Any Lucide icon, such as `TruckIcon`. */
      icon: LucideIcon
    }
)

/*
  A glass icon: a tinted back shape, the same shape blurred behind a frosted pane, a rim and
  white detail. Pass `name` for a drawn shape or `icon` for any Lucide icon. The size is the
  CSS size (`size-9`), the colour is `tone`. No state and no effects: it renders on the server.
*/
export function GlassIcon({
  name,
  icon: Icon,
  tone = "grey",
  className,
}: GlassIconProps) {
  const g: Shape = Icon ? PANE : (SHAPES[name ?? "other"] ?? SHAPES.other)
  const id = React.useId().replace(/:/g, "")

  return (
    <svg
      className={cn("gi", `t-${tone}`, className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" className="ta" />
          <stop offset="1" className="tb" />
        </linearGradient>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="fa" />
          <stop offset=".55" className="fb" />
          <stop offset="1" className="fc" />
        </linearGradient>
        <clipPath id={`${id}c`} dangerouslySetInnerHTML={{ __html: g.f }} />
        <filter id={`${id}x`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <g fill={`url(#${id}b)`} dangerouslySetInnerHTML={{ __html: g.b }} />
      <g clipPath={`url(#${id}c)`}>
        <g
          fill={`url(#${id}b)`}
          filter={`url(#${id}x)`}
          dangerouslySetInnerHTML={{ __html: g.b }}
        />
      </g>
      <g fill={`url(#${id}f)`} dangerouslySetInnerHTML={{ __html: g.f }} />
      <g
        className="ge"
        fill="none"
        strokeWidth="1.1"
        dangerouslySetInnerHTML={{ __html: g.f }}
      />
      <g
        className="gr"
        fill="none"
        strokeWidth=".6"
        dangerouslySetInnerHTML={{ __html: g.f }}
      />
      <g
        className="gd"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: g.d }}
      />
      {Icon && (
        <Icon
          className="gd"
          x={MARK.x}
          y={MARK.y}
          width={MARK.size}
          height={MARK.size}
          strokeWidth={MARK.stroke}
        />
      )}
    </svg>
  )
}
