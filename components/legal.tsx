import MeshBackground from '@/components/mesh';
import { Container, PageHero } from '@/components/ui';

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { h: string; body: string[] }[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead={`Last updated ${updated}`} />
      <section className="theme-light bg-bg py-16 text-fg sm:py-24 relative isolate">
        <MeshBackground strength={0.18} />
        <Container className="max-w-[760px] space-y-10">
          {sections.map((s) => (
            <div key={s.h} className="space-y-3">
              <h2 className="text-xl font-semibold tracking-[-0.025em]">{s.h}</h2>
              {s.body.map((p) => (
                <p key={p} className="leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
