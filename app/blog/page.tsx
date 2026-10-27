import MeshBackground from '@/components/mesh';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, PageHero } from '@/components/ui';
import { formatDate, getPosts } from '@/lib/horbit';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Engineering notes and company news from Monolith Technologies Limited.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts(24);

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from the engineering desk."
        lead="Writing on software, cloud, security and how we build."
      />
      <section className="theme-light bg-bg py-16 text-fg sm:py-24 relative isolate">
        <MeshBackground strength={0.18} />
        <Container>
          {posts.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-line p-12 text-center text-muted">
              New articles are on the way.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="card flex flex-col overflow-hidden"
                >
                  {p.featuredImage?.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.featuredImage.url}
                      alt={p.featuredImage.alt ?? ''}
                      className="aspect-[16/9] w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="space-y-3 p-6">
                    <p className="font-mono text-xs text-muted">
                      {formatDate(p.publishedAt)}
                      {p.readingTimeMinutes ? ` · ${p.readingTimeMinutes} min read` : ''}
                    </p>
                    <h2 className="text-xl font-semibold tracking-[-0.025em] text-balance">
                      {p.title}
                    </h2>
                    {p.excerpt && (
                      <p className="line-clamp-3 text-sm leading-relaxed text-muted">
                        {p.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
