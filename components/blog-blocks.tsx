import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/horbit';
import { formatDate } from '@/lib/horbit';

export const postPath = (slug: string) => `/blog/${slug}`;
export const categoryPath = (slug: string) => `/blog/category/${slug}`;

export const kicker = 'font-mono text-xs uppercase tracking-[0.18em] text-accent';
export const chip =
  'inline-flex h-9 items-center rounded-full border border-line bg-raised px-4 text-sm font-medium transition hover:border-fg hover:bg-fg hover:text-bg aria-[current=page]:border-fg aria-[current=page]:bg-fg aria-[current=page]:text-bg';

function Media({ post, className }: { post: Post; className: string }) {
  return (
    <Link
      href={postPath(post.slug)}
      tabIndex={-1}
      aria-hidden="true"
      className={`relative block overflow-hidden bg-gradient-to-br from-[#0e0e15] to-accent ${className}`}
    >
      {post.featuredImage?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.featuredImage.url}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
    </Link>
  );
}

function Meta({ post, author }: { post: Post; author?: boolean }) {
  const items = [
    author ? post.author?.name : '',
    formatDate(post.publishedAt),
    post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : '',
    post.stats?.views ? `${post.stats.views.toLocaleString()} views` : '',
  ].filter(Boolean);
  return <p className="font-mono text-xs text-muted">{items.join(' · ')}</p>;
}

export function PostCard({ post }: { post: Post }) {
  const cat = post.categories?.[0];
  return (
    <article className="card group flex flex-col overflow-hidden">
      <Media post={post} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        {cat && (
          <Link href={categoryPath(cat.slug)} className={kicker}>
            {cat.title}
          </Link>
        )}
        <h3 className="text-xl font-semibold tracking-[-0.025em] text-balance">
          <Link href={postPath(post.slug)} className="line-clamp-2">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-auto pt-2">
          <Meta post={post} />
        </div>
      </div>
    </article>
  );
}

export function FeaturedPost({ post }: { post: Post }) {
  const cat = post.categories?.[0];
  return (
    <article className="group mb-10 grid overflow-hidden rounded-3xl bg-[#07070b] text-[#f4f4f8] lg:grid-cols-[1.2fr_1fr]">
      <Media post={post} className="min-h-64 lg:min-h-[380px]" />
      <div className="flex flex-col justify-center gap-4 p-7 sm:p-11">
        {cat && <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent-soft">{cat.title} · Featured</span>}
        <h3 className="text-3xl font-semibold leading-[1.1] tracking-[-0.035em] text-balance sm:text-4xl">
          <Link href={postPath(post.slug)}>{post.title}</Link>
        </h3>
        <p className="line-clamp-3 leading-relaxed text-[#9a9aae]">{post.excerpt}</p>
        <p className="font-mono text-xs text-[#9a9aae]">
          {[post.author?.name, formatDate(post.publishedAt), post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : '']
            .filter(Boolean)
            .join(' · ')}
        </p>
        <div className="pt-2">
          <Link
            href={postPath(post.slug)}
            className="group/btn inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black shadow-[0_8px_30px_-8px_rgba(99,102,241,0.7)] transition hover:bg-white/90"
          >
            Read article
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
