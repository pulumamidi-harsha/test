import {
  AmcSection,
  FaqSection,
  FinalCtaSection,
  FullStackSection,
  HeroSection,
  IndustriesSection,
  PitchSection,
  PortfolioSection,
  PricingTeaserSection,
  ProcessSection,
  ServicesSection,
  StatsSection,
  TestimonialsSection,
  WhyUsSection,
} from "@/components/sections/HomeSections";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Get a website that sells while you sleep",
  description:
    "Logo, custom-coded website, domain, hosting, and AMC for Karnataka & AP businesses. Fixed price. Free quote in 24 hours.",
  path: "/",
});

export default function HomePage() {
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
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
