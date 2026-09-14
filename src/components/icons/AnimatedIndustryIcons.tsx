"use client";

export type IndustryIconType =
  | "ecommerce"
  | "restaurant"
  | "education"
  | "realestate"
  | "tourism"
  | "healthcare"
  | "beauty"
  | "finance";

/** Exact user GIFs from Downloads — do not replace with generated assets */
const ICON_SRC: Record<IndustryIconType, string> = {
  ecommerce: "/icons/ecommerce.gif",
  restaurant: "/icons/restaurant.gif",
  education: "/icons/education.gif",
  realestate: "/icons/realestate.gif",
  tourism: "/icons/tourism.gif",
  healthcare: "/icons/healthcare.gif",
  beauty: "/icons/beauty.gif",
  finance: "/icons/finance.gif",
};

export function AnimatedIndustryIcon({
  type,
  className = "h-14 w-14",
}: {
  type: IndustryIconType;
  className?: string;
}) {
  return (
    // Native <img> preserves animated GIF playback.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${ICON_SRC[type]}?v=exact4`}
      alt=""
      className={`pointer-events-none select-none object-contain ${className}`}
      draggable={false}
      aria-hidden
    />
  );
}
