import type { Metadata } from 'next';
import MeshBackground from '@/components/mesh';
import ProjectGrid from '@/components/project-grid';
import { ButtonLink, Container, PageHero } from '@/components/ui';
import { projectKinds, projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Platforms, developer tools and IoT software built and operated by Monolith Technologies Limited.',
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Software we build, ship and run ourselves."
        lead="Platforms, developer tools and connected-device software, built by Monolith and operated in production."
      />
      <section className="theme-light bg-bg py-16 text-fg sm:py-24 relative isolate">
        <MeshBackground opacity={0.4} />
        <Container>
          <ProjectGrid projects={projects} kinds={projectKinds} />
        </Container>
      </section>
      <section className="relative isolate py-24 text-center">
        <MeshBackground opacity={0.4} />
        <Container className="space-y-6">
          <h2 className="text-gradient text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Want something built?
          </h2>
          <div className="flex justify-center">
            <ButtonLink href="/contact">Start a project</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
