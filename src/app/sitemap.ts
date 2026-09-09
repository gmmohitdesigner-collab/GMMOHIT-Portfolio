import { MetadataRoute } from 'next'

// Dates are the real last-modified date of each route's source, not build time.
// Using `new Date()` here would restamp every URL on every deploy, which is a
// false freshness signal -- Google discounts lastmod values it finds unreliable.
// Update the relevant date when you actually change a page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.gmmohit.com',
      lastModified: new Date('2026-09-06'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.gmmohit.com/works/teaure',
      lastModified: new Date('2026-09-02'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // /works/creative-ants is intentionally omitted while the case study is work
    // in progress and carries robots.noindex. Add it back alongside removing that
    // noindex, and link it from FeaturedWorksSection at the same time.
    {
      url: 'https://www.gmmohit.com/privacy-policy',
      lastModified: new Date('2026-08-31'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
