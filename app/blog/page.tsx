import type { Metadata } from 'next';
import { BlogIndex } from '@/components/blog-index';
import { PageHero } from '@/components/ui';
import { getCategories, queryPosts } from '@/lib/horbit';

type Props = { searchParams: Promise<{ q?: string; page?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q, page } = await searchParams;
  const base: Metadata = {
    title: 'Journal',
    description: 'Engineering notes and company news from Monolith Technologies Limited.',
  };
  // Search results and deep pages should not compete with the main listing.
  return q || (page && page !== '1') ? { ...base, robots: { index: false, follow: true } } : base;
}

export default async function BlogPage({ searchParams }: Props) {
  const { q, page } = await searchParams;
  const current = Math.max(1, Number(page) || 1);
  const [{ posts, meta }, categories] = await Promise.all([
    queryPosts({ limit: 13, page: current, search: q }),
    getCategories(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from the engineering desk."
        lead="Writing on software, cloud, security and how we build."
      />
      <BlogIndex posts={posts} meta={meta} categories={categories} q={q} basePath="/blog" showFeatured={!q && current === 1} />
    </>
  );
}
