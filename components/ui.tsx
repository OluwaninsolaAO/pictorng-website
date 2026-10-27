import Link from 'next/link';
import MeshBackground from '@/components/mesh';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition',
        variant === 'primary'
          ? 'bg-white text-black hover:bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_30px_-8px_rgba(99,102,241,0.7)]'
          : 'border border-white/15 text-white hover:bg-white/5',
        className
      )}
    >
      {children}
      <ArrowRight
        size={16}
        className="transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto w-full max-w-[1200px] px-5 sm:px-8', className)}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-soft">
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={cn('max-w-2xl space-y-4', center && 'mx-auto text-center')}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
        {title}
      </h2>
      {lead && <p className="text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}

/** Dark page header used by inner pages. */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-24">
      <div className="bg-glow pointer-events-none absolute inset-0" />
      <MeshBackground opacity={0.5} />
      <Container className="relative">
        <div className="max-w-3xl space-y-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="rise text-gradient text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-6xl">
            {title}
          </h1>
          {lead && (
            <p className="rise rise-2 max-w-2xl text-lg leading-relaxed text-muted">
              {lead}
            </p>
          )}
        </div>
      </Container>
    </header>
  );
}
