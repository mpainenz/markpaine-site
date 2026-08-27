import type { MetadataRoute } from 'next';
import { site } from '@/data/site.mjs';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/resume/', '/contact/', '/privacy/'].map((path) => ({
    url: new URL(path, site.baseUrl).toString(),
    changeFrequency: path === '/' ? 'monthly' : 'yearly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
