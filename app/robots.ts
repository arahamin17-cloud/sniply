import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eslotmain.xyz'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/signin', '/signup', '/forgot-password'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
