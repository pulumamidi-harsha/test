import Link from "next/link";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/LayoutPrimitives";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-dark text-dark-text">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_0%,rgba(228,160,26,0.14),transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_100%,rgba(26,85,86,0.35),transparent_50%)]"
      />
      <Container className="relative grid gap-10 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-heading text-xl font-bold">{siteConfig.brandName}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
            {siteConfig.tagline}. Logo, custom site, domain, hosting & AMC for Karnataka
            & AP businesses — fixed price.
          </p>
          <p className="mt-4 text-sm text-white/70">{siteConfig.address}</p>
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-semibold text-accent transition hover:text-accent-hover hover:underline"
          >
            Open in Google Maps
          </a>
        </div>

        {(
          [
            ["Services", footerNav.services],
            ["Industries", footerNav.industries],
            ["Company", footerNav.company],
          ] as const
        ).map(([title, items]) => (
          <div key={title} className={title === "Industries" ? "sm:col-span-2 lg:col-span-1" : undefined}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent">
              {title}
            </p>
            <ul
              className={
                title === "Industries"
                  ? "grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-1"
                  : "space-y-2"
              }
            >
              {items.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    className="rounded-sm text-sm text-white/75 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>
          <p>Built in Bangalore · Serving Karnataka & AP</p>
        </Container>
      </div>
    </footer>
  );
}
