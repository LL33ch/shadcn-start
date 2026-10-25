import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

export function AccordionInset() {
  return (
    <Card className="w-full max-w-md gap-0 rounded-[28px] p-2 ring-0">
      <Accordion variant="inset" defaultValue={["ios"]}>
        <AccordionItem value="ios">
          <AccordionTrigger>iPhone and iPad</AccordionTrigger>
          <AccordionContent>
            <p>Install the app from the App Store, then scan the QR code.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="android">
          <AccordionTrigger>Android</AccordionTrigger>
          <AccordionContent>
            <p>Install the app from Google Play, then scan the QR code.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="desktop">
          <AccordionTrigger>Windows, macOS and Linux</AccordionTrigger>
          <AccordionContent>
            <p>Download the app, open it and import the configuration file.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
