'use client';

import { useState } from 'react';
import ProjectCard from '@/components/project-card';
import type { Project } from '@/lib/projects';
import { cn } from '@/lib/utils';

/** Filterable grid. Chips appear only when there is more than one kind of project. */
export default function ProjectGrid({
  projects,
  kinds,
}: {
  projects: Project[];
  kinds: string[];
}) {
  const [kind, setKind] = useState<string>('All');
  const shown = kind === 'All' ? projects : projects.filter((p) => p.kind === kind);

  return (
    <div className="space-y-10">
      {kinds.length > 1 && (
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {['All', ...kinds].map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={kind === k}
              onClick={() => setKind(k)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition',
                kind === k
                  ? 'border-accent bg-accent text-white'
                  : 'border-line text-muted hover:text-fg'
              )}
            >
              {k}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
        {kind === 'All' && (
          <div className="flex min-h-[220px] flex-col items-start justify-end gap-2 rounded-[20px] border border-dashed border-line p-7">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              In the works
            </p>
            <p className="text-lg font-medium tracking-[-0.02em]">
              More projects are on the way.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
