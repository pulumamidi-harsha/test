import { siteConfig } from "@/config/site";

/**
 * Brand assets — swap logos here without touching layout components.
 *
 * 1. Drop your file into `/public/brand/` (svg, png, webp, or jpg)
 * 2. Update `src` (and width/height if needed)
 *
 * Examples:
 *   src: "/brand/logo.png"
 *   src: "/brand/logo-footer.webp"
 */
export const brandAssets = {
  /** Header / compact logo (on light backgrounds) */
  logo: {
    src: "/brand/logo.svg",
    alt: siteConfig.brandName,
    width: 180,
    height: 36,
  },
  /** Header logo for dark / V2 surfaces */
  logoOnDark: {
    src: "/brand/logo-white.svg",
    alt: siteConfig.brandName,
    width: 180,
    height: 36,
  },
  /** Large footer wordmark (on dark backgrounds) */
  logoFooter: {
    src: "/brand/logo-footer.svg",
    alt: siteConfig.brandName,
    width: 1200,
    height: 220,
  },
} as const;
