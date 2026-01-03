import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  // No experimental.appDir needed in Next 16 – App Router is default.
  // We’ll run Next with Webpack via CLI flags instead of Turbopack.
  async redirects() {
    return [
      { source: "/research", destination: "/projects", permanent: true },
      { source: "/research-systems", destination: "/projects", permanent: true },
      { source: "/installations", destination: "/projects", permanent: true },
      {
        source: "/installations-and-media",
        destination: "/projects",
        permanent: true,
      },
      { source: "/experiments", destination: "/projects", permanent: true },
      { source: "/writing", destination: "/publications", permanent: true },
      { source: "/writing-and-talks", destination: "/publications", permanent: true },
      { source: "/cv", destination: "/about", permanent: true },
      { source: "/cv-and-contact", destination: "/about", permanent: true },
    ];
  },
};

export default withContentlayer(nextConfig);
