import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

/*
  Slider. It is the meter with a knob: a 6px track, radius 3, on
  `--bar`, the range in the accent. The knob is a 22px white disc with a soft shadow, as iOS
  draws one (white in both themes, as the switch's knob on the accent). Held, it swells to 1.15
  on SMOOTH; keyboard focus draws the accent outline. The hit area is wider than the knob.

  No state and no effects: it renders on the server.
*/

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-horizontal:h-[22px] data-vertical:h-full data-vertical:min-h-40 data-vertical:w-[22px] data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-[3px] bg-bar select-none data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="relative block size-[22px] shrink-0 rounded-full bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.25),0_3px_8px_rgba(0,0,0,0.12)] transition-[scale] duration-(--spring-smooth-dur) ease-(--spring-smooth) select-none after:absolute after:-inset-2.5 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary/65 data-dragging:scale-[1.15] active:scale-[1.15] data-disabled:pointer-events-none"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
