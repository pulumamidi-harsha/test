import {
  AmcSection,
  FaqSection,
  FinalCtaSection,
  FullStackSection,
  HeroSection,
  IndustriesSection,
  NewsSection,
  PitchSection,
  PortfolioSection,
  PricingTeaserSection,
  ProcessSection,
  ServicesSection,
  StatsSection,
  TestimonialsSection,
  WhyUsSection,
} from "@/components/sections/HomeSections";
import { getNewsSummaries } from "@/lib/contentful/news";
import { getPublishedTestimonials } from "@/lib/testimonials/queries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Classic (V1)",
  description:
    "Legacy Nexora Sites homepage — kept for reference. Main site is the black V2 experience.",
  path: "/v1",
});

/** Legacy teal/cream homepage — not linked in nav. Main site is `/`. */
export default async function LegacyV1HomePage() {
  const [testimonials, news] = await Promise.all([
    getPublishedTestimonials(),
    getNewsSummaries(8),
  ]);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <FullStackSection />
      <PitchSection />
      <ServicesSection />
      <ProcessSection />
      <IndustriesSection />
      <PortfolioSection />
      <AmcSection />
      <PricingTeaserSection />
      <WhyUsSection />
      <TestimonialsSection items={testimonials} />
      <NewsSection items={news} />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
