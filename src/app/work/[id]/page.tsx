import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/LayoutPrimitives";
import { portfolio } from "@/config/portfolio";
import { getWhatsAppLink } from "@/config/site";
import { createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return portfolio.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const project = portfolio.find((p) => p.id === id);
  if (!project) return {};
  return createMetadata({
    title: project.title,
    description: project.blurb,
    path: `/work/${project.id}`,
  });
}

export default async function WorkProjectPage({ params }: Props) {
  const { id } = await params;
  const project = portfolio.find((p) => p.id === id);
  if (!project) notFound();

  const tags = project.category
    .split("·")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <Section className="bg-[#0a0a0a] text-white">
      <Container className="max-w-4xl">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition hover:text-[#18d45a]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to case studies
        </Link>

        <p className="mt-10 flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
          {tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1.5">
              <span className="text-[#18d45a]">◆</span>
              {tag}
            </span>
          ))}
        </p>

        <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg font-semibold text-accent">{project.metric}</p>
        <p className="mt-2 text-white/60">{project.outcome}</p>

        <div className="relative mt-10 aspect-[16/10] overflow-hidden bg-[#101010]">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(155deg, ${project.accent} 0%, #1a2224 55%, #0c1012 100%)`,
            }}
          />
          <video
            src={project.videoDesktop}
            muted
            loop
            playsInline
            autoPlay
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <p className="mt-8 text-base leading-relaxed text-white/70 sm:text-lg">
          {project.blurb}
        </p>
        <p className="mt-4 text-sm text-white/40">
          Full case-study layout (process, screens, results) coming next. For now this page
          holds the project summary.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button
            href={getWhatsAppLink(
              `Hi, I want a website like ${project.title}. Can we talk?`,
            )}
            variant="whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Request a similar site
          </Button>
          <Button href="/work" variant="secondary">
            All work
          </Button>
        </div>
      </Container>
    </Section>
  );
}
