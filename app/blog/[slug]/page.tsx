import MeshBackground from '@/components/mesh';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import { formatDate, getPost } from '@/lib/horbit';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: post.featuredImage?.url
      ? { images: [post.featuredImage.url] }
      : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="theme-light min-h-screen bg-bg pt-32 pb-24 text-fg relative isolate">
      <MeshBackground strength={0.18} />
      <Container className="max-w-[760px]">
        <Link href="/blog" className="text-sm text-muted hover:text-accent">
          &larr; Journal
        </Link>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-balance sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 font-mono text-xs text-muted">
          {[
            post.author?.name,
            formatDate(post.publishedAt),
            post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : '',
          ]
            .filter(Boolean)
            .join(' · ')}
        </p>
        {post.featuredImage?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt ?? ''}
            className="mt-10 w-full rounded-2xl"
          />
        )}
        {/* Horbit returns sanitised HTML wrapped in .hb-content */}
        <div
          className="mt-10"
          dangerouslySetInnerHTML={{ __html: post.content?.html ?? '' }}
        />
      </Container>
    </article>
  );
}
