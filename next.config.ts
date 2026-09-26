import type { NextConfig } from "next";

function cmsAdminBase() {
  const raw = process.env.NEXT_PUBLIC_CMS_ADMIN_BASE?.trim() || "/admin";
  const base = raw.startsWith("/") ? raw : `/${raw}`;
  return base.replace(/\/$/, "") || "/admin";
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
  async redirects() {
    return [
      { source: "/cms", destination: "/admin", permanent: false },
      { source: "/cms/:path*", destination: "/admin/:path*", permanent: false },
      { source: "/arun", destination: "/admin", permanent: false },
      { source: "/arun/:path*", destination: "/admin/:path*", permanent: false },
    ];
  },
  async rewrites() {
    if (cmsBase === "/admin") return [];
    return [
      { source: cmsBase, destination: "/admin" },
      { source: `${cmsBase}/:path*`, destination: "/admin/:path*" },
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
