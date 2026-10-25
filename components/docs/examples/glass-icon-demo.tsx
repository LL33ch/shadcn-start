import {
  BellIcon,
  CameraIcon,
  HeartIcon,
  MusicIcon,
  RocketIcon,
} from "lucide-react"

import { GlassIcon } from "@/components/ui/glass-icon"

export default function GlassIconDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      <GlassIcon icon={RocketIcon} className="size-14" />
      <GlassIcon icon={CameraIcon} tone="blue" className="size-14" />
      <GlassIcon icon={MusicIcon} tone="green" className="size-14" />
      <GlassIcon icon={BellIcon} tone="orange" className="size-14" />
      <GlassIcon icon={HeartIcon} tone="red" className="size-14" />
    </div>
  )
}
