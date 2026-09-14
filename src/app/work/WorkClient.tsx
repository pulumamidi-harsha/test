"use client";

import { useMemo, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Badge, Card, Container, Section } from "@/components/ui/LayoutPrimitives";
import { portfolio } from "@/config/portfolio";
import { getWhatsAppLink } from "@/config/site";

const filters = ["All", ...Array.from(new Set(portfolio.map((p) => p.industry)))];

export function WorkClient() {
  const [filter, setFilter] = useState("All");
  const items = useMemo(
    () => (filter === "All" ? portfolio : portfolio.filter((p) => p.industry === filter)),
    [filter],
  );

  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Selected website directions for local businesses"
        description="Filter by industry. These are launch portfolio samples — replace with your live client projects anytime."
      />
      <Section>
        <Container>
          <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 snap-x snap-mandatory sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`snap-start whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  filter === item
                    ? "bg-primary text-white shadow-sm"
                    : "border border-border bg-surface text-muted hover:border-primary/25 hover:bg-surface-muted hover:text-primary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Card key={item.title} interactive className="overflow-hidden p-0">
                <div
                  className="h-40 p-5 text-text"
                  style={{
                    background: `linear-gradient(145deg, ${item.accent} 0%, #f7f4ef 55%, #e8e0d4 100%)`,
                  }}
                >
                  <Badge className="border-primary/15 bg-white/70 text-primary backdrop-blur-sm">
                    {item.industry}
                  </Badge>
                  <h2 className="mt-8 font-heading text-2xl font-bold">{item.title}</h2>
                </div>
                <div className="p-5">
                  <p className="text-sm text-muted">{item.blurb}</p>
                  <p className="mt-3 text-sm font-semibold text-primary">{item.metric}</p>
                  <p className="mt-1 text-xs text-muted">{item.outcome}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-10">
            <Button
              href={getWhatsAppLink("Hi, I want a website like one of your portfolio examples.")}
              variant="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request a similar website
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
