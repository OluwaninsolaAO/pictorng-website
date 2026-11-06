// Server-side Horbit blog client. Docs: https://docs.horbit.ng/blog/quickstart
const API = 'https://api.horbit.ng/v1/public/blog';

export type Category = {
  id?: string;
  slug: string;
  title: string;
  name?: string;
  color?: string | null;
  description?: string | null;
  postCount?: number;
  seo?: { title?: string; description?: string };
};

export type ListMeta = { totalItems: number; totalPages: number; currentPage: number; itemsPerPage: number };
const EMPTY_META: ListMeta = { totalItems: 0, totalPages: 1, currentPage: 1, itemsPerPage: 12 };

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  readingTimeMinutes?: number | null;
  featuredImage?: { url: string; alt?: string; caption?: string } | null;
  author?: { name: string; avatarUrl?: string | null } | null;
  categories?: Category[];
  wordCount?: number;
  isFeatured?: boolean;
  seo?: { title?: string; description?: string; canonicalUrl?: string | null; ogImageUrl?: string | null };
  tags?: { id: string; name: string; slug: string }[];
  stats?: {
    views: number;
    comments: number;
    reactions: number;
    reactionCounts: Record<string, number>;
  };
  commentsOpen?: boolean;
  reactionsOpen?: boolean;
  content?: { html: string; toc?: { id: string; text: string; level: number }[] };
  previous?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
};

async function callFull<T>(path: string): Promise<{ data: T; meta?: ListMeta } | null> {
  const key =
    process.env.HORBIT_SECRET_KEY || process.env.NEXT_PUBLIC_HORBIT_PUBLISHABLE_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`${API}${path}`, {
      headers: { 'x-api-key': key },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as { data: T; meta?: ListMeta };
  } catch {
    return null;
  }
}

async function call<T>(path: string): Promise<T | null> {
  return (await callFull<T>(path))?.data ?? null;
}

/** Paged listing with filters (category, search). */
export async function queryPosts(
  params: { category?: string; search?: string; limit?: number; page?: number } = {},
) {
  const sp = new URLSearchParams({ limit: String(params.limit ?? 12) });
  if (params.page) sp.set('page', String(params.page));
  if (params.category) sp.set('category', params.category);
  if (params.search) sp.set('search', params.search);
  const r = await callFull<Post[]>(`/posts?${sp}`);
  return { posts: r?.data ?? [], meta: r?.meta ?? EMPTY_META };
}

export const getCategories = async () => (await call<Category[]>('/categories')) ?? [];
export const getCategory = (slug: string) => call<Category>(`/categories/${encodeURIComponent(slug)}`);

export const getPosts = async (limit = 12) =>
  (await call<Post[]>(`/posts?limit=${limit}`)) ?? [];

export const getPost = (slug: string) =>
  call<Post>(`/posts/${encodeURIComponent(slug)}`);

export const getRelated = async (slug: string, limit = 3) =>
  (await call<Post[]>(`/posts/${encodeURIComponent(slug)}/related?limit=${limit}`)) ?? [];

export const formatDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';
