import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.102', 'localhost'],
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig