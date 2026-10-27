import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import MeshBackground from '@/components/mesh';
import { ButtonLink, Container, PageHero, SectionHead } from '@/components/ui';
import { products, services, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Monolith Technologies Limited (RC 9200427) is a Nigerian IT services company building software, cloud and security systems.',
};

const facts = [
  ['Legal name', site.legalName],
  ['Registration no.', `${site.rcNumber}, Corporate Affairs Commission, Nigeria`],
  ['Principal activity', 'Information technology services'],
  ['Website', site.domain],
  ['Email', site.email],
  ...(site.phone ? [['Phone', site.phone]] : []),
  ...(site.address ? [['Registered office', site.address]] : []),
];

const values = [
  [
    'Durable by design',
    'We choose boring, proven foundations and keep structure clear, so systems stay maintainable years after launch.',
  ],
  [
    'Secure by default',
    'Access control, secrets handling and data protection are part of the first design, not a final checklist.',
  ],
  [
    'Operate what we build',
    'Deployment, monitoring, backups and support are part of delivery. A system is finished when it runs reliably.',
  ],
  [
    'Plain communication',
    'Fixed scope, clear milestones and honest timelines. You always know where a project stands.',
  ],
];

const audiences = [
  [
    'Businesses and organisations',
    'Companies, estates, communities and institutions that need dependable software, integrations and infrastructure.',
  ],
  [
    'Founders and teams',
    'Startups that need an engineering partner to take a product from prototype to production.',
  ],
  [
    'Individual clients',
    'Professionals and individuals who need a website, application or secure setup built properly.',
  ],
];

const strip = [
  ['6', 'Core service lines'],
  ['2', 'Products we operate'],
  ['Nigeria', 'Registered and based'],
  [site.rcNumber, 'CAC registration'],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A software company that builds things to last."
        lead="Monolith Technologies Limited is an information technology services company. We provide software development, systems integration and digital transformation consultancy, and we design, deploy and manage IT infrastructure, cloud computing and cybersecurity frameworks for corporate and individual clients."
      />

      {/* Facts strip */}
      <section className="border-y border-white/[0.08]">
        <Container className="grid grid-cols-2 divide-white/[0.08] md:grid-cols-4 md:divide-x">
          {strip.map(([v, l]) => (
            <div key={l} className="px-2 py-8 md:px-8">
              <p className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{v}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {l}
              </p>
            </div>
          ))}
        </Container>
      </section>

      {/* Story */}
      <section className="theme-light bg-bg py-20 text-fg sm:py-28 relative isolate">
        <MeshBackground opacity={0.4} />
        <Container className="grid gap-16 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div className="space-y-6">
            <SectionHead eyebrow="Who we are" title="Engineering with a long view." />
            <p className="text-lg leading-relaxed text-muted">
              A monolith is a single, solid structure that does not move. That is
              the standard we hold our software to: dependable foundations, clear
              structure and nothing unnecessary.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              {site.legalName} is registered in Nigeria ({site.rcNumber}). We
              carry on business as a provider of comprehensive information
              technology services, from software development and systems
              integration to the design, deployment and management of IT
              infrastructure, cloud computing solutions and cybersecurity
              frameworks.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              We also build and operate our own products. Running real software
              for real users keeps our consulting honest: we only recommend what
              we are willing to run ourselves.
            </p>
          </div>

          <dl className="divide-y divide-line self-start rounded-2xl border border-line bg-raised">
            {facts.map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:justify-between sm:gap-8"
              >
                <dt className="shrink-0 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  {k}
                </dt>
                <dd className="font-medium sm:text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* What we do */}
      <section className="relative isolate py-20 sm:py-28">
        <MeshBackground opacity={0.4} />
        <Container className="space-y-12">
          <SectionHead
            eyebrow="What we do"
            title="Six service lines, one engineering team."
            lead="Most projects touch several of these at once. Having one accountable team avoids hand-offs between vendors."
          />
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services#${s.slug}`}
                className="group space-y-2 bg-raised p-7 transition-colors hover:bg-white/[0.03]"
              >
                <h3 className="flex items-center justify-between text-lg font-semibold tracking-[-0.02em]">
                  {s.title}
                  <ArrowUpRight
                    size={16}
                    className="text-muted opacity-0 transition group-hover:opacity-100"
                  />
                </h3>
                <p className="text-sm leading-relaxed text-muted">{s.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="theme-light bg-bg py-20 text-fg sm:py-28 relative isolate">
        <MeshBackground opacity={0.4} />
        <Container className="space-y-14">
          <SectionHead eyebrow="Principles" title="How we make decisions." />
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map(([t, d], i) => (
              <div key={t} className="card space-y-3 p-8">
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-semibold tracking-[-0.025em]">{t}</h3>
                <p className="leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="relative isolate py-20 sm:py-28">
        <MeshBackground opacity={0.4} />
        <Container className="space-y-12">
          <SectionHead
            eyebrow="Products"
            title="Software we build and operate ourselves."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {products.map((p) => {
              const inner = (
                <>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
                    {p.tag}
                  </span>
                  <h3 className="mt-3 flex items-center gap-2 text-2xl font-semibold tracking-[-0.03em]">
                    {p.name}
                    {p.href && <ArrowUpRight size={20} className="text-white/40" />}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{p.blurb}</p>
                </>
              );
              return p.href ? (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener"
                  className="card block p-8"
                >
                  {inner}
                </a>
              ) : (
                <div key={p.name} className="card p-8">
                  {inner}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Who we work with + leadership */}
      <section className="theme-light bg-bg py-20 text-fg sm:py-28 relative isolate">
        <MeshBackground opacity={0.4} />
        <Container className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <SectionHead eyebrow="Clients" title="Who we work with." />
            <ul className="space-y-6">
              {audiences.map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-accent" />
                  <div>
                    <h3 className="font-semibold tracking-[-0.02em]">{t}</h3>
                    <p className="mt-1 text-muted">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <SectionHead eyebrow="Leadership" title="Led by an engineer." />
            <div className="card flex items-center gap-5 p-7">
              <span
                aria-hidden
                className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#C4C6FF] to-[#4F46E5] text-xl font-semibold text-white"
              >
                AO
              </span>
              <div>
                <p className="text-lg font-semibold tracking-[-0.02em]">
                  Abraham Olagunju
                </p>
                <p className="text-muted">Founder and CEO</p>
              </div>
            </div>
            <p className="leading-relaxed text-muted">
              Monolith is founder-led. Every engagement has direct access to
              senior engineering leadership, from scoping to delivery.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative isolate py-24 text-center sm:py-32">
        <MeshBackground opacity={0.4} />
        <Container className="space-y-6">
          <h2 className="text-gradient mx-auto max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
            Let&rsquo;s build something that lasts.
          </h2>
          <p className="mx-auto max-w-xl text-white/55">
            Tell us about your project and we will reply within one business day.
          </p>
          <div className="flex justify-center gap-3">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              Our services
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
