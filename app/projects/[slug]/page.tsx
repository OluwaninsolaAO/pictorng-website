import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check } from 'lucide-react';
import MeshBackground from '@/components/mesh';
import ProjectCard, { ProjectMark, StatusPill } from '@/components/project-card';
import { ButtonLink, Container, PageHero, SectionHead } from '@/components/ui';
import { getProject, projects } from '@/lib/projects';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const others = projects.filter((o) => o.slug !== p.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={p.kind} title={p.name} lead={p.tagline} />

      <section className="theme-light bg-bg py-16 text-fg sm:py-24 relative isolate">
        <MeshBackground opacity={0.4} />
        <Container className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="space-y-6">
            <ProjectMark project={p} size={64} />
            <SectionHead eyebrow="Overview" title={`What ${p.name} is.`} />
            {p.summary.map((t) => (
              <p key={t} className="text-lg leading-relaxed text-muted">
                {t}
              </p>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white transition hover:brightness-110"
                >
                  Visit {p.name} <ArrowUpRight size={16} />
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white transition hover:brightness-110"
                >
                  Ask about {p.name} <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
          </div>

          <aside className="space-y-8 self-start rounded-2xl border border-line bg-raised p-7">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Status</p>
              <StatusPill status={p.status} />
            </div>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                Highlights
              </p>
              <ul className="space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li key={t} className="rounded-md bg-fg/[0.06] px-2 py-1 text-xs text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      {others.length > 0 && (
        <section className="relative isolate py-20 sm:py-28">
          <MeshBackground opacity={0.4} />
          <Container className="space-y-10">
            <div className="flex items-end justify-between">
              <SectionHead eyebrow="More" title="Other projects." />
              <Link href="/projects" className="hidden text-sm text-accent-soft sm:block">
                All projects &rarr;
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <ProjectCard key={o.slug} project={o} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-20 text-center">
        <Container>
          <ButtonLink href="/contact">Talk to us</ButtonLink>
        </Container>
      </section>
    </>
  );
}
