import type { NextConfig } from "next";

/**
 * Next.js configuration
 * 
 * Configures image domains for external image sources (Unsplash).
 * This allows Next.js Image component to load images from these domains.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
