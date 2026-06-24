import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'
import { workItems } from '@/content/work'
import { notes } from '@/content/writing'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = ['', '/work', '/writing', '/about'].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: path === '' ? 1 : 0.8,
    }),
  )

  const work: MetadataRoute.Sitemap = workItems.map((item) => ({
    url: `${base}/work/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const writing: MetadataRoute.Sitemap = notes
    .filter((note) => !note.draft)
    .map((note) => ({
      url: `${base}/writing/${note.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    }))

  return [...staticRoutes, ...work, ...writing]
}
