import { MetadataRoute } from 'next'

/**
 * Robots.txt for SEO
 * 
 * Controls how search engine crawlers access and index your site.
 * Next.js automatically serves this at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  // Vercel automatically provides VERCEL_URL in production
  // For local dev, use localhost. For production, use the actual domain.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
