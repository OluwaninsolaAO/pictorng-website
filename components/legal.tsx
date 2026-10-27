import Link from 'next/link';
import MeshBackground from '@/components/mesh';
import { Container, PageHero } from '@/components/ui';
import { site } from '@/lib/site';

export type Block =
  | string
  | { list: string[] }
  | { table: { head: string[]; rows: string[][] } };

export type LegalSection = { h: string; body: Block[] };

const anchor = (n: number) => `s${n}`;

const otherPages = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/refunds', label: 'Refund & Cancellation Policy' },
];

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (typeof b === 'string')
          return (
            <p key={i} className="leading-relaxed text-muted">
              {b}
            </p>
          );
        if ('list' in b)
          return (
            <ul
              key={i}
              className="list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-accent"
            >
              {b.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          );
        return (
          <div key={i} className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-fg/[0.04]">
                  {b.table.head.map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {b.table.rows.map((r) => (
                  <tr key={r[0]} className="align-top">
                    {r.map((c, j) => (
                      <td
                        key={j}
                        className={j === 0 ? 'px-4 py-3 font-medium' : 'px-4 py-3 text-muted'}
                      >
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}

export function LegalPage({
  title,
  updated,
  intro,
  summary,
  sections,
  current,
}: {
  title: string;
  updated: string;
  intro: string;
  summary: string[];
  sections: LegalSection[];
  current: string;
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead={`Last updated ${updated}`} />
      <section className="theme-light bg-bg py-14 text-fg sm:py-20 relative isolate">
        <MeshBackground opacity={0.4} />
        <Container className="grid gap-10 lg:grid-cols-[250px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="On this page" className="rounded-2xl border border-line bg-raised p-5">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                On this page
              </p>
              <ol className="space-y-1.5 text-sm">
                {sections.map((s, i) => (
                  <li key={s.h}>
                    <a
                      href={`#${anchor(i + 1)}`}
                      className="flex gap-2 rounded-md px-1 py-0.5 text-muted transition hover:text-accent"
                    >
                      <span className="w-5 shrink-0 font-mono text-xs leading-5 opacity-60">
                        {i + 1}.
                      </span>
                      <span>{s.h}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="mt-4 hidden space-y-1 px-1 text-sm lg:block">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                Other policies
              </p>
              {otherPages
                .filter((p) => p.href !== current)
                .map((p) => (
                  <Link key={p.href} href={p.href} className="block text-muted hover:text-accent">
                    {p.label}
                  </Link>
                ))}
            </div>
          </aside>

          <article className="min-w-0 space-y-12">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted">{intro}</p>
              <div className="rounded-2xl border border-accent/30 bg-accent/[0.06] p-6">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">
                  The short version
                </p>
                <ul className="list-disc space-y-2 pl-5 marker:text-accent">
                  {summary.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            {sections.map((s, i) => (
              <section key={s.h} id={anchor(i + 1)} className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                  <span className="mr-2 font-mono text-base text-accent">{i + 1}.</span>
                  {s.h}
                </h2>
                <Blocks blocks={s.body} />
              </section>
            ))}

            <p className="border-t border-line pt-6 text-sm text-muted">
              &copy; {new Date().getFullYear()} {site.legalName} ({site.rcNumber}). Questions about
              this page:{' '}
              <a className="text-accent underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}
