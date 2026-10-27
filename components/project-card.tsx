import Link from 'next/link';
import { ArrowUpRight, Box, Gauge, Terminal, Users, type LucideIcon } from 'lucide-react';
import { statusLabel, type Project } from '@/lib/projects';
import { cn } from '@/lib/utils';

const icons: Record<Project['icon'], LucideIcon> = {
  users: Users,
  terminal: Terminal,
  gauge: Gauge,
  box: Box,
};

export function StatusPill({ status }: { status: Project['status'] }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
      <span
        className={cn(
          'size-1.5 rounded-full',
          status === 'live' && 'bg-emerald-400',
          status === 'beta' && 'bg-amber-400',
          status === 'soon' && 'bg-muted'
        )}
      />
      {statusLabel[status]}
    </span>
  );
}

export default function ProjectCard({ project: p }: { project: Project }) {
  const Icon = icons[p.icon] ?? Box;
  return (
    <Link href={`/projects/${p.slug}`} className="card group flex h-full flex-col gap-5 p-7">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-xl bg-accent/10 text-accent">
          <Icon size={22} strokeWidth={1.75} />
        </span>
        <StatusPill status={p.status} />
      </div>
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">
          {p.kind}
        </p>
        <h3 className="flex items-center gap-2 text-2xl font-semibold tracking-[-0.03em]">
          {p.name}
          <ArrowUpRight
            size={18}
            className="text-muted opacity-0 transition group-hover:opacity-100"
          />
        </h3>
        <p className="leading-relaxed text-muted">{p.tagline}</p>
      </div>
      <ul className="mt-auto flex flex-wrap gap-2 pt-1">
        {p.tags.map((t) => (
          <li key={t} className="rounded-md bg-fg/[0.06] px-2 py-1 text-xs text-muted">
            {t}
          </li>
        ))}
      </ul>
    </Link>
  );
}
