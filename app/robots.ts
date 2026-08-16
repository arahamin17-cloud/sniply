import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://eslotmain.xyz'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/signin', '/signup', '/forgot-password'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
