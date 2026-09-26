/**
 * Configurable CMS admin base path (Arun-style Contentful + n8n panel).
 * Default: /cms — set NEXT_PUBLIC_CMS_ADMIN_BASE=/studio (etc.) and matching rewrite.
 * Existing Supabase testimonials admin stays at /admin.
 */
export function getCmsAdminBase(): string {
  const raw = process.env.NEXT_PUBLIC_CMS_ADMIN_BASE?.trim() || "/cms";
  const base = raw.startsWith("/") ? raw : `/${raw}`;
  return base.replace(/\/$/, "") || "/cms";
}

export function cmsPath(...segments: string[]): string {
  const base = getCmsAdminBase();
  const rest = segments
    .map((s) => s.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
  return rest ? `${base}/${rest}` : base;
}

/** True for configured public base and the physical /cms App Router tree. */
export function isCmsAdminPath(pathname: string): boolean {
  const bases = new Set([getCmsAdminBase(), "/cms"]);
  for (const base of bases) {
    if (pathname === base || pathname.startsWith(`${base}/`)) return true;
  }
  return false;
}

export function isCmsLoginPath(pathname: string): boolean {
  return (
    pathname === cmsPath("login") ||
    pathname === "/cms/login"
  );
}
