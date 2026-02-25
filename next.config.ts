import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheHandler: require.resolve('./cacheHandler.mjs'),
  cacheMaxMemorySize: 0, // Disable in-memory caching to use custom handler
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
