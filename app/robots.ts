import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        crawlDelay: 0.5,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0.5,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 0.5,
      },
      {
        userAgent: 'Yandexbot',
        allow: '/',
        crawlDelay: 0.5,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        crawlDelay: 0.5,
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        crawlDelay: 0.5,
      },
    ],
    sitemap: [
      `${siteMetadata.siteUrl}/sitemap.xml`,
      `${siteMetadata.siteUrl}/sitemap-pages.xml`,
      `${siteMetadata.siteUrl}/sitemap-posts.xml`,
      `${siteMetadata.siteUrl}/sitemap-authors.xml`,
    ],
    host: siteMetadata.siteUrl,
  }
}
