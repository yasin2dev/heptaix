import type { NextConfig } from "next";
// import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      "root": "..",
      resolveAlias: {
        "@common/helpers": "../common/helpers/index.ts"
      }
    }
  }
};

export default nextConfig;