import type { NextConfig } from "next";

function cmsAdminBase() {
  const raw = process.env.NEXT_PUBLIC_CMS_ADMIN_BASE?.trim() || "/cms";
  const base = raw.startsWith("/") ? raw : `/${raw}`;
  return base.replace(/\/$/, "") || "/cms";
}

const cmsBase = cmsAdminBase();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "**.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    if (cmsBase === "/cms") return [];
    return [
      { source: cmsBase, destination: "/cms" },
      { source: `${cmsBase}/:path*`, destination: "/cms/:path*" },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
