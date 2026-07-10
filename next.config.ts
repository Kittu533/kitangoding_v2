import type { NextConfig } from "next";

const defaultSiteOrigin = "https://www.kitangoding.my.id";

function resolveCanonicalOrigin() {
  return (process.env.NEXT_PUBLIC_APP_URL || defaultSiteOrigin).replace(/\/$/, "");
}

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  async redirects() {
    const canonicalOrigin = resolveCanonicalOrigin();
    const canonicalHostname = new URL(canonicalOrigin).hostname;
    return [
      "kitangoding.com",
      "www.kitangoding.com",
      "kitangoding.my.id",
      "www.kitangoding.my.id",
    ]
      .filter((hostname) => hostname !== canonicalHostname)
      .map((hostname) => ({
      source: "/:path*",
      has: [
        {
          type: "host" as const,
          value: hostname,
        },
      ],
      destination: `${canonicalOrigin}/:path*`,
      basePath: false,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lfmlibtzaxsisgojyjei.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
