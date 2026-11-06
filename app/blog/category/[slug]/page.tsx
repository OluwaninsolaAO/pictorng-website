import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogIndex } from '@/components/blog-index';
import { categoryPath } from '@/components/blog-blocks';
import { PageHero } from '@/components/ui';
import { getCategories, getCategory, queryPosts } from '@/lib/horbit';

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = await getCategory((await params).slug);
  if (!cat) return { title: 'Category not found', robots: { index: false } };
  return {
    title: cat.seo?.title || `${cat.title} | Journal`,
    description: cat.seo?.description || cat.description || `Articles about ${cat.title} from Monolith.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const current = Math.max(1, Number((await searchParams).page) || 1);
  const [cat, categories] = await Promise.all([getCategory(slug), getCategories()]);
  if (!cat) notFound();
  const { posts, meta } = await queryPosts({ category: slug, limit: 12, page: current });

  return (
    <>
      <PageHero eyebrow="Journal" title={cat.title} lead={cat.description || undefined} />
      <BlogIndex posts={posts} meta={meta} categories={categories} active={cat.slug} basePath={categoryPath(cat.slug)} />
    </>
  );
}
