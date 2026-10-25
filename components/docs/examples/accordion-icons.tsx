import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { GlassIcon } from "@/components/ui/glass-icon"

export function AccordionIcons() {
  return (
    <Accordion className="max-w-md" defaultValue={["data"]}>
      <AccordionItem value="network">
        <AccordionTrigger icon={<GlassIcon name="shield" />}>
          Home network and internet
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Your devices reach the home network and the internet through the
            router.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="data">
        <AccordionTrigger
          icon={<GlassIcon name="chart" />}
          meta={<span className="tabular-nums">20.4 GB / 20.0 GB</span>}
        >
          Data this month
        </AccordionTrigger>
        <AccordionContent>
          <p>
            The value in the head gives way to the content while the row is
            open: one place per fact.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="until">
        <AccordionTrigger
          icon={<GlassIcon name="calendar" />}
          meta={
            <>
              <span>4 Dec</span>
              <span className="font-medium text-ok">42 days</span>
            </>
          }
        >
          Access until
        </AccordionTrigger>
        <AccordionContent>
          <p>Access ends on 4 December. Ask the admin to extend it.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
