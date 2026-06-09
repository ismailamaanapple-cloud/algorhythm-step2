import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next.js stops warning about the sibling
  // lockfile in ~/. We want THIS directory to be the project root.
  turbopack: {
    root: path.join(__dirname),
  },

  // Pre-installed icon trees from lucide-react can balloon the client
  // bundle — `optimizePackageImports` rewrites the bare imports into
  // per-icon module paths, so only the icons we actually use ship to
  // the browser. Same trick helps with framer-motion's sub-paths.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
