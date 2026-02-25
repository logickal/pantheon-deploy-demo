import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: 'standalone',
  cacheHandler: path.resolve(__dirname, './cacheHandler.mjs'),
  cacheMaxMemorySize: 0, // Disable in-memory caching to use custom handler
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
