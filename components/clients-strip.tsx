import Image from 'next/image';
import { clients, type Client } from '@/lib/clients';
import { Container } from '@/components/ui';

function Mark({ c }: { c: Client }) {
  const inner = c.logo ? (
    <Image
      src={c.logo.src}
      alt={c.name}
      width={c.logo.width}
      height={c.logo.height}
      style={{ height: c.logo.display }}
      className="w-auto max-w-none"
    />
  ) : (
    <span className="whitespace-nowrap text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
      {c.name}
    </span>
  );
  const cls =
    'flex h-[68px] items-center text-white/70 opacity-80 transition hover:text-white hover:opacity-100';
  return c.href ? (
    <a href={c.href} target="_blank" rel="noopener" className={cls} aria-label={c.name}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/**
 * Dark "trusted by" band. Desktop: a static row. Mobile: a slow marquee, so any
 * number of clients stays on one tidy line.
 */
export default function ClientsStrip({ label = 'Trusted by' }: { label?: string }) {
  return (
    <div className="border-y border-white/[0.08] bg-[#07070b]/60">
      <Container className="flex flex-col items-center gap-5 py-8 md:flex-row md:justify-between md:gap-12 md:py-10">
        <p className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
          {label}
        </p>

        <ul className="hidden items-center justify-end gap-x-12 md:flex md:flex-wrap">
          {clients.map((c) => (
            <li key={c.name}>
              <Mark c={c} />
            </li>
          ))}
        </ul>
      </Container>

      <div className="marquee-wrap marquee-mask -mt-2 overflow-hidden pb-8 md:hidden">
        <ul className="marquee flex w-max items-center">
          {[...clients, ...clients].map((c, i) => (
            <li
              key={`${c.name}-${i}`}
              aria-hidden={i >= clients.length || undefined}
              className={`pr-14 ${i >= clients.length ? 'marquee-dup' : ''}`}
            >
              <Mark c={c} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
