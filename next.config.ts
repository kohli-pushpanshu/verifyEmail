import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

export default nextConfig;
