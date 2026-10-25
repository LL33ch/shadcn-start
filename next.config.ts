import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // The /docs examples use remote images (unsplash, avatars): let the browser load them directly.
    unoptimized: true,
  },
}

export default nextConfig
