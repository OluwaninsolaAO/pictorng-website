import Link from 'next/link';
import {
  ArrowUpRight,
  Blocks,
  Cloud,
  Compass,
  Network,
  Server,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import HeroMesh from '@/components/hero-mesh';
import { ButtonLink, Container, SectionHead } from '@/components/ui';
import { formatDate, getPosts } from '@/lib/horbit';
import { products, services } from '@/lib/site';

const icons: Record<string, LucideIcon> = {
  'software-development': Blocks,
  'systems-integration': Network,
  'digital-transformation': Compass,
  'it-infrastructure': Server,
  'cloud-computing': Cloud,
  cybersecurity: ShieldCheck,
};

const steps = [
  ['01', 'Discover', 'We map your goals, users and constraints before writing a line of code.'],
  ['02', 'Design', 'Architecture and interface designed together, reviewed with you early.'],
  ['03', 'Build', 'Small, tested releases shipped continuously so you see progress weekly.'],
  ['04', 'Operate', 'We deploy, monitor and support what we build, with security in every step.'],
];

const principles = [
  ['Engineering-led', 'Senior engineers on every project. No hand-offs to a sales layer.'],
  ['Secure by default', 'Access control, secrets handling and data protection are designed in, not bolted on.'],
  ['Built to run', 'We care about uptime, observability and cost long after launch day.'],
  ['Plain communication', 'Fixed scope, clear milestones, honest timelines.'],
];

export default async function Home() {
  const posts = (await getPosts(3)).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
        <div className="bg-glow pointer-events-none absolute inset-0" />
        <HeroMesh />
        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="rise mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-white/70">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.6)]" />
              Monolith Technologies Limited &middot; IT services
            </p>
            <h1 className="rise rise-2 text-gradient text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-balance sm:text-7xl lg:text-[88px]">
              Software built to stand the test of time.
            </h1>
            <p className="rise rise-3 mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
              We design, build and run software, cloud infrastructure and
              security for businesses and individuals. From first prototype to
              production at scale.
            </p>
            <div className="rise rise-4 mt-10 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact">Start a project</ButtonLink>
              <ButtonLink href="/services" variant="ghost">
                What we do
              </ButtonLink>
            </div>
          </div>

          {/* Pipeline visual */}
          <div className="rise rise-4 drift relative mx-auto mt-20 max-w-3xl">
            <div className="absolute -inset-x-6 -inset-y-4 rounded-[28px] bg-gradient-to-b from-indigo-500/25 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b12]/90 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-3">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="ml-3 font-mono text-xs text-white/35">
                  release / production
                </span>
              </div>
              <div className="space-y-2.5 p-5 font-mono text-[13px] leading-6 text-white/55 sm:p-7 sm:text-sm">
                <Line c="text-white/80">$ monolith ship --env production</Line>
                <Line ok>Build compiled and type-checked</Line>
                <Line ok>Automated test suite passed</Line>
                <Line ok>Dependency and secrets scan clean</Line>
                <Line ok>Infrastructure provisioned in cloud region</Line>
                <Line ok>Zero-downtime rollout complete</Line>
                <Line c="text-indigo-300">Live &middot; monitored &middot; backed up</Line>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <section className="theme-light bg-bg py-24 text-fg sm:py-32">
        <Container className="space-y-14">
          <SectionHead
            eyebrow="Services"
            title="Everything between an idea and a system that runs."
            lead="Monolith Technologies Limited provides comprehensive information technology services, from software development to the infrastructure and security it runs on."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = icons[s.slug];
              return (
                <Link
                  key={s.slug}
                  href={`/services#${s.slug}`}
                  className="card group space-y-4 p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-muted opacity-0 transition group-hover:opacity-100"
                    />
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">
                    {s.title}
                  </h3>
                  <p className="leading-relaxed text-muted">{s.summary}</p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="relative scroll-mt-16 overflow-hidden py-24 sm:py-32">
        <div className="bg-glow pointer-events-none absolute inset-0 opacity-40" />
        <Container className="relative space-y-14">
          <SectionHead
            eyebrow="Products"
            title="Software we build, ship and run ourselves."
            lead="Our engineering practice is proven in production by products we operate under the Monolith Technologies Limited umbrella."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {products.map((p) => {
              const inner = (
                <>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
                    {p.tag}
                  </span>
                  <h3 className="mt-3 flex items-center gap-2 text-3xl font-semibold tracking-[-0.035em]">
                    {p.name}
                    {p.href && <ArrowUpRight size={22} className="text-white/40" />}
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

      {/* APPROACH */}
      <section className="theme-light bg-bg py-24 text-fg sm:py-32">
        <Container className="space-y-20">
          <SectionHead
            eyebrow="How we work"
            title="A simple process. Rigorous at every step."
          />
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([n, t, d]) => (
              <div key={n} className="space-y-3 bg-raised p-8">
                <span className="font-mono text-sm text-accent">{n}</span>
                <h3 className="text-xl font-semibold tracking-[-0.025em]">{t}</h3>
                <p className="text-sm leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {principles.map(([t, d]) => (
              <div key={t} className="flex gap-4">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-accent" />
                <div>
                  <h3 className="font-semibold tracking-[-0.02em]">{t}</h3>
                  <p className="mt-1 text-muted">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* BLOG (renders only when Horbit returns posts) */}
      {posts.length > 0 && (
        <section className="py-24 sm:py-32">
          <Container className="space-y-12">
            <div className="flex items-end justify-between gap-6">
              <SectionHead eyebrow="Journal" title="Notes from the engineering desk." />
              <Link href="/blog" className="hidden text-sm text-accent-soft sm:block">
                All posts &rarr;
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="card space-y-3 p-7">
                  <p className="font-mono text-xs text-muted">
                    {formatDate(p.publishedAt)}
                  </p>
                  <h3 className="text-xl font-semibold tracking-[-0.025em] text-balance">
                    {p.title}
                  </h3>
                  {p.excerpt && (
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted">
                      {p.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden py-28 sm:py-36">
        <div className="bg-glow pointer-events-none absolute inset-0" />
        <Container className="relative text-center">
          <h2 className="text-gradient mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-6xl">
            Have something to build? Let&rsquo;s talk.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
            Tell us about your project. We reply within one business day.
          </p>
          <div className="mt-9 flex justify-center">
            <ButtonLink href="/contact">Contact Monolith Technologies</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

function Line({
  children,
  ok,
  c,
}: {
  children: React.ReactNode;
  ok?: boolean;
  c?: string;
}) {
  return (
    <p className={`flex gap-3 ${c ?? ''}`}>
      {ok && <span className="text-emerald-400">&#10003;</span>}
      <span>{children}</span>
    </p>
  );
}
