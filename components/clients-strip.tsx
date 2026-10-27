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
      className="w-auto"
    />
  ) : (
    <span className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{c.name}</span>
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

/** Dark "trusted by" band. Lives inside a dark section. */
export default function ClientsStrip({ label = 'Trusted by' }: { label?: string }) {
  return (
    <div className="border-y border-white/[0.08] bg-[#07070b]/60">
      <Container className="flex flex-col items-center gap-6 py-10 md:flex-row md:justify-between md:gap-12">
        <p className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
          {label}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:justify-end">
          {clients.map((c) => (
            <li key={c.name}>
              <Mark c={c} />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
