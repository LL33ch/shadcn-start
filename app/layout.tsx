import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MenuGlide } from "@/components/menu-glide"
import { PressFootprint } from "@/components/press-footprint"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const fontSans = Geist({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        fontSans.variable,
        "font-sans"
      )}
    >
      <body>
        <ThemeProvider defaultTheme="dark" enableSystem={false}>
          <PressFootprint />
          <MenuGlide />
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
