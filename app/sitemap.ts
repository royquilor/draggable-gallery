import { MetadataRoute } from 'next'

/**
 * Sitemap for SEO
 * 
 * Generates sitemap.xml for search engines to discover and index pages.
 * Next.js automatically serves this at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Vercel automatically provides VERCEL_URL in production
  // For local dev, use localhost. For production, use the actual domain.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
