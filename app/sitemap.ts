import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/services', '/about', '/contact', '/projects', ...projects.map((p) => `/projects/${p.slug}`), '/blog', '/terms', '/privacy', '/refunds'].map(
    (p) => ({ url: `${site.url}${p}`, changeFrequency: 'monthly', priority: p === '' ? 1 : 0.7 })
  );
}
