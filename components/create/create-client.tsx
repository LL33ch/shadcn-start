"use client"

import dynamic from "next/dynamic"

/* The editor reads the saved theme from localStorage, so it renders on the client only. */
export const CreateClient = dynamic(
  () => import("@/components/create/theme-editor").then((m) => m.ThemeEditor),
  { ssr: false }
)
