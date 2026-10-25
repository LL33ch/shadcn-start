import type { Metadata } from "next"

import { addCommand, site } from "@/lib/site"
import { Code } from "@/components/docs/code"
import { Prose } from "@/components/docs/prose"

export const metadata: Metadata = {
  title: "Installation",
  description: `How to add ${site.name} to a project with the shadcn CLI.`,
}

const registryConfig = `{
  "registries": {
    "${site.namespace}": "${site.registry}/{name}.json"
  }
}`

const layout = `import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { MenuGlide } from "@/components/menu-glide"
import { PressFootprint } from "@/components/press-footprint"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={\`dark \${fontSans.variable} \${fontMono.variable} font-sans antialiased\`}
    >
      <body>
        <PressFootprint />
        <MenuGlide />
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  )
}`

const usage = `import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Continue</Button>
}`

function Step({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: React.ReactNode
}) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  return (
    <section className="relative mt-12 pl-11 first:mt-0">
      <span className="absolute top-0.5 left-0 grid size-7 place-items-center rounded-full bg-knob text-[13px] font-semibold tabular-nums">
        {n}
      </span>
      <h2
        id={id}
        className="m-0 scroll-mt-24 text-xl leading-8 font-medium tracking-[-0.02em]"
      >
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  )
}

export default function InstallationPage() {
  return (
    <main className="max-w-3xl px-4 pt-6 pb-28 lg:px-10">
      <h1 className="m-0 text-4xl leading-10 font-semibold tracking-[-0.045em]">
        Installation
      </h1>
      <p className="mt-3 text-[17px] leading-7 text-muted-foreground">
        {site.name} is a shadcn registry. You add its theme and the
        components you need with the shadcn CLI, and the code lands in your
        project, yours to change.
      </p>

      <div className="mt-10">
        <Step n={1} title="Set up shadcn/ui">
          <Prose>
            {`Start from a project with React 19 and Tailwind CSS v4, such as a new Next.js app, and run \`init\` once. It writes \`components.json\`, \`lib/utils.ts\` and the base of your CSS file. The components are built on [Base UI](https://base-ui.com); the CLI installs \`@base-ui/react\` and every other package they import.`}
          </Prose>
          <Code code="npx shadcn@latest init" lang="bash" className="mt-4" />
        </Step>

        <Step n={2} title="Add the registry">
          <Prose>
            {`Name the registry in \`components.json\`, so the CLI knows where \`${site.namespace}/…\` comes from. The files are served straight from the GitHub repository.`}
          </Prose>
          <Code
            code={registryConfig}
            lang="json"
            title="components.json"
            className="mt-4"
          />
        </Step>

        <Step n={3} title="Add the theme">
          <Prose>
            {`The theme puts the colour tokens for light and dark, the spring curves and the shared motion of menus, sheets, toasts and tabs into your CSS file, and replaces the colours \`init\` wrote. Add it by name before anything else: a component brings the theme along too, but then the CLI only adds the tokens that are missing and leaves \`init\`'s colours in place.`}
          </Prose>
          <Code code={addCommand("theme")} lang="bash" className="mt-4" />
          <Prose className="mt-4">
            {`To change the accent, the colours, the radius or the density, make your theme on [Create](/create) and paste the CSS it gives you at the end of your CSS file.`}
          </Prose>
        </Step>

        <Step n={4} title="Add components">
          <Prose>
            {`Add components by name. The CLI also brings the components they are built from, so \`select\` needs nothing else.`}
          </Prose>
          <Code
            code={addCommand("button", "dialog", "select")}
            lang="bash"
            className="mt-4"
          />
          <Prose className="mt-4">
            {`Without the registry in \`components.json\`, give the CLI the file's address instead:`}
          </Prose>
          <Code
            code={`npx shadcn@latest add ${site.registry}/button.json`}
            lang="bash"
            className="mt-4"
          />
        </Step>

        <Step n={5} title="Set up the layout">
          <Prose>
            {`The kit is drawn for [Geist](https://vercel.com/font) and is dark first: put \`dark\` on \`<html>\`, or switch the class with \`next-themes\`. Two small client helpers make it feel right, and are worth mounting once in the root layout:

- **MenuGlide** moves one highlight from row to row in menus, selects, comboboxes and commands. Without it each row lights up by itself.
- **PressFootprint** keeps the click of a control that shrank under a press, when the pointer is let go near its edge.

\`TooltipProvider\` gives tooltips their shared delay, and \`Toaster\` shows toasts.`}
          </Prose>
          <Code
            code={addCommand("menu-glide", "press-footprint", "tooltip", "toast")}
            lang="bash"
            className="mt-4"
          />
          <Code
            code={layout}
            lang="tsx"
            title="app/layout.tsx"
            className="mt-4"
          />
        </Step>

        <Step n={6} title="Use them">
          <Code code={usage} lang="tsx" />
          <Prose className="mt-4">
            {`Every component page lists its own install command and shows the full source. To take a newer version of a component later, add it again with \`--overwrite\`.`}
          </Prose>
        </Step>
      </div>
    </main>
  )
}
