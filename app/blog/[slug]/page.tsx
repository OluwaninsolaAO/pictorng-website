import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostCard, categoryPath, chip, postPath } from '@/components/blog-blocks';
import { Comments, Reactions, ViewTracker } from '@/components/engagement';
import MeshBackground from '@/components/mesh';
import { Share } from '@/components/share';
import { Container } from '@/components/ui';
import { formatDate, getPost, getRelated } from '@/lib/horbit';
import { site } from '@/lib/site';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: 'Post not found', robots: { index: false } };
  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt || undefined;
  const image = post.seo?.ogImageUrl || post.featuredImage?.url;
  return {
    title,
    description,
    keywords: post.tags?.map((t) => t.name),
    alternates: { canonical: post.seo?.canonicalUrl || postPath(post.slug) },
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
      images: image ? [{ url: image, alt: post.featuredImage?.alt || post.title }] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const related = await getRelated(slug, 3);

  const url = `${site.url}${postPath(post.slug)}`;
  const cat = post.categories?.[0];
  const toc = (post.content?.toc ?? []).filter((t) => t.level <= 3);
  const views = post.stats?.views ?? 0;

  const hero = 'text-[#f4f4f8]';
  return (
    <>
      <ViewTracker slug={post.slug} />

      <article>
        <header className="relative isolate overflow-hidden bg-[#07070b] pt-36 pb-14 text-[#f4f4f8]">
          <div className="bg-glow pointer-events-none absolute inset-0" />
          <MeshBackground opacity={0.5} />
          <Container className="relative max-w-[820px]">
            <nav className="mb-6 flex flex-wrap gap-2 text-sm text-muted" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" className="hover:text-white">Journal</Link>
              {cat && (
                <>
                  <span aria-hidden="true">/</span>
                  <Link href={categoryPath(cat.slug)} className="hover:text-white">{cat.title}</Link>
                </>
              )}
            </nav>
            {cat && (
              <Link href={categoryPath(cat.slug)} className="font-mono text-xs uppercase tracking-[0.18em] text-accent-soft">
                {cat.title}
              </Link>
            )}
            <h1 className={`${hero} mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-balance sm:text-6xl`}>
              {post.title}
            </h1>
            {post.excerpt && <p className="mt-5 text-lg leading-relaxed text-muted">{post.excerpt}</p>}
            <div className="mt-7 flex items-center gap-3.5">
              {post.author?.avatarUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.author.avatarUrl} alt="" width={44} height={44} className="size-11 rounded-full" />
              )}
              <div>
                <strong className="block text-sm">{post.author?.name}</strong>
                <p className="font-mono text-xs text-muted">
                  {[
                    formatDate(post.publishedAt),
                    post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : '',
                    views > 0 ? `${views.toLocaleString()} views` : '',
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
            </div>
          </Container>
        </header>

        <div className="theme-light relative isolate bg-bg pt-12 pb-20 text-fg">
          <MeshBackground opacity={0.4} />
          <Container>
            {post.featuredImage?.url && (
              <figure className="mb-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  className="aspect-video w-full rounded-3xl object-cover"
                />
                {post.featuredImage.caption && (
                  <figcaption className="mt-3 text-sm text-muted">{post.featuredImage.caption}</figcaption>
                )}
              </figure>
            )}

            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
              <div className="min-w-0 max-w-[760px]">
                <div className="hb-content" dangerouslySetInnerHTML={{ __html: post.content?.html ?? '' }} />

                {(post.previous || post.next) && (
                  <nav className="my-10 grid gap-4 sm:grid-cols-2" aria-label="More articles">
                    {post.previous ? (
                      <Link href={postPath(post.previous.slug)} rel="prev" className="card block p-5">
                        <small className="mb-1.5 block text-muted">← Previous</small>
                        <strong className="line-clamp-2">{post.previous.title}</strong>
                      </Link>
                    ) : (
                      <span />
                    )}
                    {post.next && (
                      <Link href={postPath(post.next.slug)} rel="next" className="card block p-5 sm:text-right">
                        <small className="mb-1.5 block text-muted">Next →</small>
                        <strong className="line-clamp-2">{post.next.title}</strong>
                      </Link>
                    )}
                  </nav>
                )}

                <Comments slug={post.slug} open={post.commentsOpen !== false} initialCount={post.stats?.comments ?? 0} />
              </div>

              <aside className="grid gap-8 text-sm lg:sticky lg:top-28">
                {toc.length > 1 && (
                  <div>
                    <strong className="mb-3 block">On this page</strong>
                    <ol className="hidden gap-2 border-l-2 border-line lg:grid">
                      {toc.map((t) => (
                        <li key={t.id} style={{ paddingLeft: t.level === 3 ? 12 : 0 }}>
                          <a
                            href={`#${t.id}`}
                            className="-ml-0.5 block border-l-2 border-transparent pl-3.5 text-muted transition hover:border-accent hover:text-accent"
                          >
                            {t.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {post.reactionsOpen !== false && (
                  <div>
                    <strong className="mb-3 block">Was this helpful?</strong>
                    <Reactions slug={post.slug} initial={post.stats?.reactionCounts ?? {}} />
                  </div>
                )}

                <div>
                  <strong className="mb-3 block">Share</strong>
                  <Share url={url} title={post.title} />
                </div>

                {cat && (
                  <div>
                    <strong className="mb-3 block">Category</strong>
                    <Link href={categoryPath(cat.slug)} className="card block p-4 hover:translate-y-0">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{cat.title}</span>
                      {cat.description && (
                        <span className="mt-2 block text-sm leading-relaxed text-muted">{cat.description}</span>
                      )}
                    </Link>
                  </div>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div>
                    <strong className="mb-3 block">Tags</strong>
                    <div className="flex flex-wrap gap-2" aria-label="Tags">
                      {post.tags.map((t) => (
                        <span key={t.id} className={chip}>#{t.name}</span>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>

            {related.length > 0 && (
              <section className="mt-20">
                <h2 className="mb-7 text-3xl font-semibold tracking-[-0.035em]">Related articles</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((p) => (
                    <PostCard key={p.id} post={p} />
                  ))}
                </div>
              </section>
            )}
          </Container>
        </div>
      </article>
    </>
  );
}
