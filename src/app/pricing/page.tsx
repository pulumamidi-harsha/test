import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Badge, Card, Container, Section } from "@/components/ui/LayoutPrimitives";
import { addOns, packages } from "@/config/pricing";
import { getWhatsAppLink } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pricing",
  description:
    "Transparent INR website packages for local businesses in Karnataka and Andhra Pradesh — starter, growth, and business plans.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple packages. Clear INR ranges."
        description="No hidden lock-in to start. Maintenance continues only if you want ongoing care after the included period."
      />
      <Section>
        <Container className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              interactive
              className={`h-full ${
                pkg.popular
                  ? "border-accent/60 shadow-[var(--glow-amber)] ring-1 ring-accent/35 md:col-span-2 lg:col-span-1"
                  : ""
              }`}
            >
              {pkg.popular ? (
                <Badge className="mb-3 border-accent/40 bg-accent-soft text-accent-hover">
                  Most Popular
                </Badge>
              ) : (
                <Badge className="mb-3 opacity-0">Package</Badge>
              )}
              <h2 className="font-heading text-2xl font-bold">{pkg.name}</h2>
              <p className="mt-2 text-3xl font-bold text-primary">
                <span className="text-base font-medium text-muted">{pkg.note} </span>
                {pkg.price}
              </p>
              <p className="mt-2 text-sm text-muted">{pkg.bestFor}</p>
              <ul className="mt-5 space-y-2">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                href={getWhatsAppLink(`Hi, I'm interested in the ${pkg.name} package.`)}
                variant={pkg.popular ? "whatsapp" : "secondary"}
                className="mt-6 w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                Choose {pkg.name}
              </Button>
            </Card>
          ))}
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <h2 className="font-heading text-2xl font-bold">Add-ons</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {addOns.map((item) => (
              <Card key={item.name} interactive className="flex items-center justify-between gap-4 py-4">
                <p className="text-sm font-semibold text-text">{item.name}</p>
                <p className="shrink-0 text-sm font-medium text-primary">{item.price}</p>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Custom quote available for multi-branch businesses, large villas, and advanced portals.
          </p>
        </Container>
      </Section>
    </>
  );
}
