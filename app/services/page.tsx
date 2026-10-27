import MeshBackground from '@/components/mesh';
import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { ButtonLink, Container, PageHero } from '@/components/ui';
import { services } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Software development, systems integration, digital transformation consultancy, IT infrastructure, cloud computing and cybersecurity services from Monolith Technologies Limited.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Comprehensive IT services, engineered end to end."
        lead="Monolith Technologies Limited provides software development, systems integration and digital transformation consultancy, plus the design, deployment and management of IT infrastructure, cloud computing solutions and cybersecurity frameworks for corporate and individual clients."
      />

      <section className="theme-light bg-bg py-20 text-fg sm:py-28 relative isolate">
        <MeshBackground strength={0.18} />
        <Container className="divide-y divide-line">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="grid scroll-mt-24 gap-8 py-12 first:pt-0 last:pb-0 md:grid-cols-[1fr_1.2fr] md:gap-16"
            >
              <div className="space-y-3">
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="text-3xl font-semibold tracking-[-0.035em]">
                  {s.title}
                </h2>
                <p className="text-lg leading-relaxed text-muted">{s.summary}</p>
              </div>
              <ul className="space-y-3 self-center">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Check size={18} className="mt-1 shrink-0 text-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Container>
      </section>

      <section className="py-24 text-center relative isolate">
        <MeshBackground strength={0.18} />
        <Container className="space-y-6">
          <h2 className="text-gradient text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto max-w-xl text-white/55">
            Describe the problem. We will recommend the simplest route to solve
            it.
          </p>
          <div className="flex justify-center">
            <ButtonLink href="/contact">Talk to an engineer</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
