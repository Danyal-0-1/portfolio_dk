import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  // No experimental.appDir needed in Next 16 – App Router is default.
  // We’ll run Next with Webpack via CLI flags instead of Turbopack.
};

export default withContentlayer(nextConfig);
