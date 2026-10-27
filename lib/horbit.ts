// Server-side Horbit blog client. Docs: https://docs.horbit.ng/blog/quickstart
const API = 'https://api.horbit.ng/v1/public/blog';

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  readingTimeMinutes?: number | null;
  featuredImage?: { url: string; alt?: string; caption?: string } | null;
  author?: { name: string; avatarUrl?: string | null } | null;
  categories?: { name?: string; slug?: string; color?: string }[];
  content?: { html: string };
};

async function call<T>(path: string): Promise<T | null> {
  const key = process.env.HORBIT_SECRET_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`${API}${path}`, {
      headers: { 'x-api-key': key },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return ((await res.json()) as { data: T }).data;
  } catch {
    return null;
  }
}

export const getPosts = async (limit = 12) =>
  (await call<Post[]>(`/posts?limit=${limit}`)) ?? [];

export const getPost = (slug: string) =>
  call<Post>(`/posts/${encodeURIComponent(slug)}`);

export const formatDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';
