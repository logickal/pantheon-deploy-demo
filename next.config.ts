import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheHandler: require.resolve('./cacheHandler.mjs'),
  cacheMaxMemorySize: 0, // Disable in-memory caching to use custom handler
  experimental: {
    // Disable prerendering for error pages to avoid Pantheon adapter conflicts
    skipMiddlewareUrlNormalize: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
