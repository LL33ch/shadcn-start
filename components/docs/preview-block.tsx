import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { readExample } from "@/lib/docs"
import { Code } from "./code"
import { Preview } from "./preview"

export async function PreviewBlock({
  name,
  className,
  figureClassName,
}: {
  name: string
  className?: string
  figureClassName?: string
}) {
  const source = readExample(name)

  return (
    <figure
      id={name}
      className={cn(
        "m-0 scroll-mt-24 overflow-hidden rounded-[28px] bg-background ring-1 ring-foreground/8 ring-inset",
        figureClassName
      )}
    >
      <div
        className={cn(
          "preview relative isolate flex max-h-[800px] min-h-[180px] [transform:translateZ(0)] items-center justify-center overflow-auto p-6",
          className
        )}
      >
        <Preview name={name} />
      </div>
      {source && (
        <details className="group/details">
          <summary className="flex h-11 cursor-pointer list-none items-center justify-between px-5 text-sm font-medium text-muted-foreground transition-colors select-none hover:text-foreground [&::-webkit-details-marker]:hidden">
            <span className="font-mono text-xs">{name}.tsx</span>
            <span className="flex items-center gap-1.5">
              Code
              <ChevronDownIcon className="size-4 transition-transform duration-200 group-open/details:rotate-180" />
            </span>
          </summary>
          <div className="px-2 pb-2">
            <Code code={source} className="bg-field" />
          </div>
        </details>
      )}
    </figure>
  )
}
