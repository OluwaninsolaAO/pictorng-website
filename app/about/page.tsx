import MeshBackground from '@/components/mesh';
import type { Metadata } from 'next';
import { ButtonLink, Container, PageHero, SectionHead } from '@/components/ui';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Monolith Technologies Limited is a Nigerian IT services company building software, cloud and security systems.',
};

const facts = [
  ['Legal name', site.legalName],
  ['Registration', site.rcNumber ? `${site.rcNumber}, Nigeria` : 'Registered in Nigeria'],
  ['Principal activity', 'Information technology services'],
  ['Contact', site.email],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A software company that builds things to last."
        lead="Monolith Technologies Limited is an information technology services company. We carry on business as a provider of software development, systems integration and digital transformation consultancy, and we design, deploy and manage IT infrastructure, cloud and cybersecurity frameworks for corporate and individual clients."
      />

      <section className="theme-light bg-bg py-20 text-fg sm:py-28 relative isolate">
        <MeshBackground strength={0.18} />
        <Container className="grid gap-16 md:grid-cols-2">
          <div className="space-y-5">
            <SectionHead eyebrow="Our name" title="Why Monolith?" />
            <p className="text-lg leading-relaxed text-muted">
              A monolith is a single, solid structure that does not move. That is
              the standard we hold our software to: dependable foundations,
              clear structure and nothing unnecessary.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              We work with organisations that need technology to simply work,
              from the first line of code to the infrastructure and security
              that keep it running.
            </p>
          </div>
          <dl className="divide-y divide-line self-start rounded-2xl border border-line bg-raised">
            {facts.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:justify-between">
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  {k}
                </dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-24 text-center relative isolate">
        <MeshBackground strength={0.18} />
        <Container className="space-y-6">
          <h2 className="text-gradient text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Work with us.
          </h2>
          <div className="flex justify-center">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
