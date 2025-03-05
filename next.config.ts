import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Set a larger limit (e.g., 10 MB)
    },
  },
};

export default nextConfig;
