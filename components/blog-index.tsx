import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { Category, ListMeta, Post } from "@/lib/horbit";
import { FeaturedPost, PostCard, categoryPath, chip } from "./blog-blocks";
import MeshBackground from "./mesh";
import { Container } from "./ui";

export function BlogIndex({
  posts,
  meta,
  categories,
  active,
  q,
  basePath,
  showFeatured,
}: {
  posts: Post[];
  meta: ListMeta;
  categories: Category[];
  active?: string;
  q?: string;
  basePath: string;
  showFeatured?: boolean;
}) {
  const [first, ...rest] = posts;
  const list = showFeatured && first ? rest : posts;
  const pageHref = (p: number) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (p > 1) sp.set("page", String(p));
    const s = sp.toString();
    return s ? `${basePath}?${s}` : basePath;
  };

  return (
    <section className="theme-light relative isolate bg-bg py-16 text-fg sm:py-24">
      <MeshBackground opacity={0.4} />
      <Container>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap gap-2" aria-label="Categories">
            <Link href="/blog" className={chip} aria-current={!active ? "page" : undefined}>
              All
            </Link>
            {categories
              .filter((c) => (c.postCount ?? 1) > 0)
              .map((c) => (
                <Link key={c.slug} href={categoryPath(c.slug)} className={chip} aria-current={active === c.slug ? "page" : undefined}>
                  {c.title}
                </Link>
              ))}
          </nav>
          <form className="flex h-11 w-full items-center gap-2 rounded-full border border-line bg-raised pl-4 pr-1 text-muted sm:w-[340px]" action="/blog" role="search">
            <Search size={18} />
            <label className="sr-only" htmlFor="q">Search articles</label>
            <input id="q" name="q" type="search" placeholder="Search articles…" defaultValue={q} className="min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-muted" />
            <button className="h-9 rounded-full bg-accent px-4 text-sm font-medium text-white transition hover:opacity-90">Search</button>
          </form>
        </div>

        {q && (
          <p className="mb-8 text-muted">
            {meta.totalItems} result{meta.totalItems === 1 ? "" : "s"} for <strong className="text-fg">“{q}”</strong> ·{" "}
            <Link href="/blog" className="text-accent">Clear</Link>
          </p>
        )}

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line p-16 text-center text-muted">
            <h3 className="mb-1 text-lg font-semibold text-fg">No articles yet</h3>
            <p>{q ? "Try a different search." : "New insights are on the way. Check back soon."}</p>
          </div>
        ) : (
          <>
            {showFeatured && first && <FeaturedPost post={first} />}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </>
        )}

        {meta.totalPages > 1 && (
          <nav className="mt-14 flex justify-center gap-2" aria-label="Pagination">
            {meta.currentPage > 1 && (
              <Link href={pageHref(meta.currentPage - 1)} className={chip} rel="prev" aria-label="Previous page">
                <ChevronLeft size={16} />
              </Link>
            )}
            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={pageHref(p)} className={chip} aria-current={p === meta.currentPage ? "page" : undefined}>
                {p}
              </Link>
            ))}
            {meta.currentPage < meta.totalPages && (
              <Link href={pageHref(meta.currentPage + 1)} className={chip} rel="next" aria-label="Next page">
                <ChevronRight size={16} />
              </Link>
            )}
          </nav>
        )}
      </Container>
    </section>
  );
}
