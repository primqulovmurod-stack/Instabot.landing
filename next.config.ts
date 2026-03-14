import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/partner",
        permanent: true,
      },
      {
        source: "/dashboard/:path*",
        destination: "/partner/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
