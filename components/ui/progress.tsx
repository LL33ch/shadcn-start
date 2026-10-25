import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"

/*
  Meter. A 6px bar, radius 3, on
  `--bar`, filled in the accent; the fill glides on SMOOTH. As a `meter` it also tells how
  close it is to the end: `warn` from 90%, `bad` at 100%. The label is
  14/20 at 500, the value 13/18 `text-2` in tabular figures.

  No state and no effects: it renders on the server.
*/

function Progress({
  className,
  children,
  value,
  max = 100,
  meter = false,
  ...props
}: ProgressPrimitive.Root.Props & {
  /** Colour the fill by how full it is: warn from 90%, destructive at 100%. */
  meter?: boolean
}) {
  const share = value == null ? 0 : value / max
  const tone = !meter ? undefined : share >= 1 ? "bad" : share >= 0.9 ? "warn" : undefined

  return (
    <ProgressPrimitive.Root
      value={value}
      max={max}
      data-slot="progress"
      data-tone={tone}
      className={cn("group/progress flex flex-wrap gap-x-3 gap-y-2", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex h-1.5 w-full items-center overflow-hidden rounded-[calc(3px*var(--radius-factor,1))] bg-bar",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        "h-full rounded-[calc(3px*var(--radius-factor,1))] bg-primary transition-[width,background-color] duration-(--spring-smooth-dur) ease-(--spring-smooth) group-data-[tone=bad]/progress:bg-destructive group-data-[tone=warn]/progress:bg-warn",
        className
      )}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn(
        "text-sm/5 font-medium tracking-[-0.01em] text-foreground",
        className
      )}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-[13px]/5 text-muted-foreground tabular-nums group-data-[tone=bad]/progress:text-destructive",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
