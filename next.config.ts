import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/todo-app-Next.js",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
