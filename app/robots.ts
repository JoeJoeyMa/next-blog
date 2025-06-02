import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/draft/',
          '/_next/',
          '/static/',
          '/*.json$',
          '/*.xml$',
          '/404',
          '/500',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 1,
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
