import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Gauge,
  Globe2,
  Headphones,
  MessageCircle,
  Palette,
  Server,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";
import { faqs } from "@/config/faqs";
import { packages, addOns } from "@/config/pricing";
import { getWhatsAppLink, siteConfig } from "@/config/site";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  Badge,
  Card,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/LayoutPrimitives";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { IndustryShowcase } from "@/components/sections/IndustryShowcase";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase";
import { cn } from "@/lib/utils";

const quoteCta = "Free call · Fixed price · Ready in days";

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden pb-8 pt-8 sm:pb-12 sm:pt-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 atmosphere-warm" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl motion-safe:animate-[soft-float_8s_ease-in-out_infinite]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl motion-safe:animate-[soft-float_10s_ease-in-out_infinite]"
      />
      <Container className="relative grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <p className="mb-3 inline-flex flex-wrap items-center gap-2 text-sm font-semibold text-primary sm:mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(228,160,26,0.3)]" />
            Bangalore · Karnataka & Andhra Pradesh
          </p>
          <h1 className="max-w-xl font-heading text-[1.75rem] font-bold leading-[1.15] text-text sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Get a website that{" "}
            <span className="bg-gradient-to-r from-primary via-primary-mid to-primary bg-clip-text text-transparent">
              sells while you sleep.
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg">
            Logo + custom-coded website + domain + hosting + maintenance for restaurants,
            hotels, hospitals, shops & cloud kitchens. Fixed price. Free quote in 24 hours.
          </p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button href="#quote" variant="primary" className="w-full sm:w-auto">
              Get a free quote
            </Button>
            <Button
              href={getWhatsAppLink()}
              variant="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Talk to an expert
            </Button>
          </div>
          <ul className="mt-8 grid gap-2 text-sm font-medium text-text sm:grid-cols-2">
            {[
              "Custom coded (not a template dump)",
              "Logo + domain + hosting included",
              "Works great on mobile",
              "AMC care after launch",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-lg px-1 py-0.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-mid" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <div
            id="quote"
            className="relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface/95 p-5 shadow-[var(--glow-teal)] transition duration-300 hover:border-accent/40 hover:shadow-[var(--glow-amber)] sm:p-6"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary-mid"
            />
            <p className="font-heading text-xl font-bold text-text">Get your free quote</p>
            <p className="mt-1 text-sm text-muted">Fixed price and timeline in 24 hours.</p>
            <div className="mt-5">
              <ContactForm compact />
            </div>
          </div>
        </Reveal>
      </Container>

      <IndustryMarquee />
    </Section>
  );
}

function IndustryMarquee() {
  const labels = [
    "E-commerce",
    "Restaurants",
    "Education",
    "Real estate",
    "Tourism",
    "Healthcare",
    "Beauty",
    "Finance",
    "Logistics",
    "Manufacturing",
  ];
  const loop = [...labels, ...labels];

  return (
    <div className="mt-10 overflow-hidden border-y border-border/60 bg-gradient-to-r from-primary-soft/40 via-surface/70 to-accent-soft/50 py-3.5">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-8 px-6 text-sm font-semibold text-primary/80 hover:[animation-play-state:paused]">
        {loop.map((label, i) => (
          <span key={`${label}-${i}`} className="flex items-center gap-8 transition hover:text-primary">
            {label}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatsSection() {
  const stats = [
    { to: 1000, suffix: "+", label: "Projects delivered", decimals: 0 },
    { to: 10, suffix: "+", label: "Years of craft", decimals: 0 },
    { to: 4.9, suffix: "", label: "Customer rating", decimals: 1 },
  ];

  return (
    <Section className="py-8 sm:py-10 md:py-12">
      <Container className="grid grid-cols-3 gap-2 text-center sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-transparent px-1 py-3 transition hover:border-border hover:bg-surface hover:shadow-[var(--shadow-card)] sm:px-3 sm:py-4"
          >
            <p className="font-heading text-xl font-bold text-primary sm:text-3xl md:text-4xl">
              <CountUp to={stat.to} suffix={stat.suffix} decimals={stat.decimals} />
            </p>
            <p className="mt-1 text-[10px] leading-snug text-muted sm:text-xs md:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </Container>
    </Section>
  );
}

/** Research gap: full care stack visible on homepage */
export function FullStackSection() {
  const stack = [
    { icon: Palette, title: "Logo & brand", desc: "Clean identity that looks trusted", href: "/services/logo-branding" },
    { icon: Code2, title: "Custom website", desc: "Coded from scratch, mobile-first", href: "/services/website-design-development" },
    { icon: Globe2, title: "Domain setup", desc: "We buy & connect your .in / .com", href: "/services/domain-hosting" },
    { icon: Server, title: "Hosting + SSL", desc: "Secure hosting and go-live", href: "/services/domain-hosting" },
    { icon: MessageCircle, title: "WhatsApp leads", desc: "Click-to-chat enquiry flows", href: "/services/website-design-development" },
    { icon: Wrench, title: "AMC care", desc: "Backups, updates, small edits", href: "/services/maintenance" },
  ];

  return (
    <Section className="band-primary relative overflow-hidden text-white">
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            What you get
          </p>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Logo to go-live — one team handles it
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
            Domain, design, code, hosting, and maintenance under one roof. Not five vendors.
          </p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((item, i) => (
            <Reveal key={item.title} delay={i * 40}>
              <Link
                href={item.href}
                className="flex h-full gap-3 rounded-2xl border border-white/15 bg-white/8 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-white/14 hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]"
              >
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <item.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-heading font-bold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/80">{item.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function PitchSection() {
  return (
    <Section className="relative overflow-hidden bg-surface-muted/60" id="services">
      <div aria-hidden className="pointer-events-none absolute inset-0 atmosphere-muted" />
      <Container className="relative grid items-center gap-10 lg:grid-cols-2">
        <SectionHeading
          eyebrow="Website development"
          title="Stop searching. Your website team is here."
          description="From small shops to growing brands, we build websites that look great and bring real results."
        />
        <div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Fixed price, no hidden costs",
              "Dedicated project manager",
              "Google-friendly page speed",
              "Payment gateway integration",
              "Content & image support",
              "Post-launch training",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-xl border border-transparent bg-surface/70 px-3 py-2 text-sm text-text shadow-sm transition hover:border-primary/15 hover:bg-surface hover:shadow-[var(--shadow-card)]"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-mid" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button href="#quote" variant="primary">
              Get a free quote
            </Button>
            <p className="mt-2 text-sm text-muted">{quoteCta}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function ServicesSection() {
  const items = [
    {
      n: "01",
      title: "Logo & brand identity",
      desc: "A clean logo, colors, and fonts so your restaurant, clinic, or shop looks trusted from day one.",
      tags: ["Logo concepts", "Brand kit"],
      href: "/services/logo-branding",
    },
    {
      n: "02",
      title: "Custom website build",
      desc: "A brand-new, custom-coded site made for your business — designed to turn visitors into customers.",
      tags: ["Not a template dump", "Ready in days"],
      href: "/services/website-design-development",
    },
    {
      n: "03",
      title: "Domain, hosting & SSL",
      desc: "We buy the domain, set DNS, enable SSL, and host your site so you don’t juggle vendors.",
      tags: ["Domain + hosting", "Secure go-live"],
      href: "/services/domain-hosting",
    },
    {
      n: "04",
      title: "Maintenance / AMC",
      desc: "Updates, backups, uptime checks, and small content edits after launch — named care plan.",
      tags: ["Monthly AMC", "Small edits"],
      href: "/services/maintenance",
    },
  ];

  return (
    <Section>
      <Container>
        <SectionHeading
          align="center"
          title="Your business. Our team. A website that sells."
          description="Logo, site, domain, hosting, and AMC — everything under one roof."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.n} delay={i * 50}>
              <Card className="group h-full" interactive>
                <p className="text-xs font-bold tracking-[0.16em] text-accent">{item.n}</p>
                <p className="mt-3 font-heading text-xl font-bold text-text">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-primary transition group-hover:bg-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={item.href}
                  className="text-link mt-5 inline-flex items-center gap-1 text-sm"
                >
                  Get a quote{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="#quote" variant="primary">
            Get a free quote
          </Button>
          <p className="mt-2 text-sm text-muted">{quoteCta}</p>
        </div>
      </Container>
    </Section>
  );
}

/** Named Maintenance / AMC product band */
export function AmcSection() {
  const perks = [
    "Weekly backups & security updates",
    "Uptime checks so you know you’re online",
    "Small content edits (menu, photos, timings)",
    "WhatsApp support for urgent fixes",
  ];

  return (
    <Section className="bg-surface-muted/50">
      <Container className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Badge>Maintenance / AMC</Badge>
          <h2 className="mt-4 font-heading text-3xl font-bold text-text sm:text-4xl">
            Don’t go live and get left alone
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            After launch, our AMC plan covers backups, updates, and small edits — so your
            site stays fast, secure, and current without hiring another vendor.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {perks.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-text">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/services/maintenance" variant="primary">
              See AMC details
            </Button>
            <Button
              href={getWhatsAppLink("Hi, I want a maintenance / AMC plan for my website.")}
              variant="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask about AMC
            </Button>
          </div>
        </div>
        <Card className="relative overflow-hidden border-transparent bg-gradient-to-br from-primary via-primary to-primary-mid text-white shadow-[var(--shadow-dark)]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/25 blur-2xl"
          />
          <p className="relative text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            From
          </p>
          <p className="relative mt-2 font-heading text-4xl font-bold">
            ₹1,999
            <span className="text-lg font-semibold text-white/75"> / month</span>
          </p>
          <p className="relative mt-3 text-sm text-white/85">
            Starter packages include 1–3 months care. Extend with monthly AMC when you need ongoing edits.
          </p>
          <ul className="relative mt-6 space-y-2 text-sm text-white/90">
            {addOns.filter((a) => a.name.toLowerCase().includes("maintenance")).map((a) => (
              <li
                key={a.name}
                className="flex flex-col gap-1 border-b border-white/15 pb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <span>{a.name}</span>
                <span className="shrink-0 font-semibold text-accent">{a.price}</span>
              </li>
            ))}
            <li className="flex flex-col gap-1 pt-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span>Included care in packages</span>
              <span className="shrink-0 font-semibold text-accent">1–3 months</span>
            </li>
          </ul>
        </Card>
      </Container>
    </Section>
  );
}

/** Homepage pricing packages band */
export function PricingTeaserSection() {
  return (
    <Section id="pricing">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Packages"
          title="Clear packages. Fixed prices."
          description="Logo, website, domain, hosting, and care — pick a starting point. Exact quote after a short call."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 60}>
              <Card
                interactive
                className={cn(
                  "flex h-full flex-col",
                  pkg.popular &&
                    "border-accent/60 shadow-[var(--glow-amber)] ring-1 ring-accent/35 md:col-span-2 lg:col-span-1",
                )}
              >
                {pkg.popular ? (
                  <Badge className="mb-3 w-fit border-accent/40 bg-accent-soft text-accent-hover">
                    Most popular
                  </Badge>
                ) : (
                  <Badge className="mb-3 w-fit opacity-0">Package</Badge>
                )}
                <p className="font-heading text-xl font-bold text-text">{pkg.name}</p>
                <p className="mt-2 font-heading text-3xl font-bold text-primary">
                  {pkg.price}
                  <span className="ml-1 text-sm font-medium text-muted">{pkg.note}</span>
                </p>
                <p className="mt-2 text-sm text-muted">{pkg.bestFor}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {pkg.includes.slice(0, 5).map((line) => (
                    <li key={line} className="flex items-start gap-2 text-sm text-text">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {line}
                    </li>
                  ))}
                </ul>
                <Button href="#quote" variant={pkg.popular ? "primary" : "secondary"} className="mt-6 w-full">
                  Get this package
                </Button>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Need ecommerce, chatbot, or multilingual?{" "}
          <Link href="/pricing" className="font-semibold text-primary underline-offset-2 hover:underline">
            See full pricing
          </Link>
        </p>
      </Container>
    </Section>
  );
}

export function ProcessSection() {
  const steps = [
    { title: "Free call", desc: "A quick call to understand what you need." },
    { title: "Fixed price in 24h", desc: "Clear plan, price, and timeline. No hidden costs." },
    { title: "Design & build", desc: "Daily updates so you see real progress." },
    { title: "Launch & support", desc: "We launch your site, train you, and stay with you after go-live." },
  ];

  return (
    <Section className="bg-surface-muted/40" id="process">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="How we work"
          title="4 simple steps. No surprises."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 70}>
              <Card className="h-full" interactive>
                <p className="text-sm font-bold text-accent">0{index + 1}</p>
                <p className="mt-2 font-heading text-lg font-bold text-text">{step.title}</p>
                <p className="mt-2 text-sm text-muted">{step.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href={getWhatsAppLink("Hi, I want to start my website project.")} variant="whatsapp" target="_blank" rel="noopener noreferrer">
            Start my project
          </Button>
          <p className="mt-2 text-sm text-muted">{quoteCta}</p>
        </div>
      </Container>
    </Section>
  );
}

export function IndustriesSection() {
  return <IndustryShowcase />;
}

export function PortfolioSection() {
  return (
    <div id="work">
      <PortfolioShowcase />
    </div>
  );
}

export function WhyUsSection() {
  const points = [
    {
      icon: Palette,
      title: "Unique design",
      desc: "No templates. Your website is made for your brand, so you stand out from competitors.",
    },
    {
      icon: Gauge,
      title: "Google-friendly",
      desc: "Fast pages and clean code help your site show up on Google.",
    },
    {
      icon: Smartphone,
      title: "Responsive design",
      desc: "Looks right on mobile, tablet, and desktop — where your customers are.",
    },
    {
      icon: ShieldCheck,
      title: "Fixed price & deadline",
      desc: "You know the price and delivery date before we start. No surprise bills.",
    },
    {
      icon: Headphones,
      title: "Ready in days",
      desc: "Our in-house team builds your site fast — in days, not months.",
    },
    {
      icon: MessageCircle,
      title: "Support after launch",
      desc: "Edits, fixes, and WhatsApp support so you are not left alone after go-live.",
    },
  ];

  return (
    <Section className="bg-surface-muted/50" id="why-us">
      <Container>
        <SectionHeading
          align="center"
          title={`Why choose ${siteConfig.shortName}`}
          description="We treat your website like our own."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={i * 40}>
              <Card className="h-full" interactive>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-soft to-accent-soft text-primary shadow-sm ring-1 ring-primary/10">
                  <point.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-heading text-lg font-bold text-text">{point.title}</p>
                <p className="mt-2 text-sm text-muted">{point.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href={siteConfig.phoneHref} variant="dark">
            Schedule a free call
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export function TestimonialsSection() {
  const items = [
    {
      quote:
        "They rebuilt our slow shop site, fixed product pages, and set up WhatsApp enquiry. Orders picked up within weeks. Very responsive on chat.",
      name: "Rohit N.",
      role: "E-commerce · Bangalore",
    },
    {
      quote:
        "Restaurant website with digital menu and table enquiry, done quickly. Walk-ins from Google have gone up. Worth every rupee.",
      name: "Sneha I.",
      role: "Restaurant · Mysuru",
    },
    {
      quote:
        "Clean clinic site with appointment enquiry and Maps. A few extra revision rounds, but they fixed everything without fuss.",
      name: "Dr. Anitha R.",
      role: "Healthcare · Hyderabad",
    },
  ];

  return (
    <Section id="reviews">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Reviews"
          title="Rated highly by business owners like you"
          description="Sample launch quotes — we’ll replace these with your live Google reviews."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.name} delay={i * 70}>
              <Card className="h-full" interactive>
                <div className="mb-4 flex gap-1 text-accent" aria-hidden>
                  {Array.from({ length: 5 }).map((_, star) => (
                    <span key={star} className="text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-text">“{item.quote}”</p>
                <p className="mt-5 font-semibold text-primary">{item.name}</p>
                <p className="text-sm text-muted">{item.role}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">Join happy clients · {quoteCta}</p>
      </Container>
    </Section>
  );
}

export function FaqSection() {
  return (
    <Section className="relative overflow-hidden bg-surface-muted/50" id="faq">
      <div aria-hidden className="pointer-events-none absolute inset-0 atmosphere-muted" />
      <Container className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions business owners ask us"
            description={`Still have questions? Call ${siteConfig.phone} or WhatsApp a real person.`}
          />
          <Button href="#quote" variant="primary" className="mt-6">
            Still have questions? Get a free quote
          </Button>
        </div>
        <Accordion items={faqs} />
      </Container>
    </Section>
  );
}

export function FinalCtaSection() {
  return (
    <Section>
      <Container>
        <div className="grid overflow-hidden rounded-[2rem] shadow-[var(--shadow-dark)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="band-cta relative px-6 py-12 text-white sm:px-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-10 right-0 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
            />
            <p className="relative inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(228,160,26,0.28)]" />
              Free call
            </p>
            <h2 className="relative mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
              Ready to grow your business online?
            </h2>
            <p className="relative mt-4 text-white/85">
              Tell us about your business. We’ll send a clear plan, timeline, and fixed
              price — no obligation.
            </p>
            <p className="relative mt-3 text-sm text-white/75">
              {siteConfig.address} ·{" "}
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline decoration-accent/40 underline-offset-2 transition hover:text-accent-soft hover:decoration-accent"
              >
                Maps
              </a>
            </p>
            <div className="relative mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                href={getWhatsAppLink()}
                variant="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                Talk to our experts
              </Button>
              <Button
                href={siteConfig.phoneHref}
                variant="secondary"
                className="w-full border-white/30 bg-white/10 text-white shadow-none hover:border-white/50 hover:bg-white/18 hover:text-white sm:w-auto"
              >
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>
          <div className="border-t border-border bg-surface px-6 py-10 sm:border-l sm:border-t-0 sm:px-8">
            <p className="font-heading text-xl font-bold text-text">Get your free quote</p>
            <p className="mt-1 text-sm text-muted">Fixed price and timeline in 24 hours.</p>
            <div className="mt-5">
              <ContactForm compact />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
