import { writeFileSync } from 'fs'
import { globby } from 'globby'
import { readFileSync } from 'fs'
import path from 'path'

async function generateSitemap() {
  const pages = await globby([
    'app/**/*.tsx',
    '!app/**/_*.tsx',
    '!app/**/[*.tsx',
    '!app/**/layout.tsx',
    '!app/**/page.tsx',
    '!app/**/error.tsx',
    '!app/**/loading.tsx',
    '!app/**/not-found.tsx',
  ])

  // Read contentlayer generated data
  const contentlayerDir = path.join(process.cwd(), '.contentlayer/generated')
  const allBlogs = JSON.parse(readFileSync(path.join(contentlayerDir, 'Blog', '_index.json'), 'utf-8'))
  const allAuthors = JSON.parse(readFileSync(path.join(contentlayerDir, 'Authors', '_index.json'), 'utf-8'))

  // Generate main sitemap
  const mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    const path = page
      .replace('app', '')
      .replace('.tsx', '')
      .replace('/page', '')
    const route = path === '/index' ? '' : path
    return `  <url>
    <loc>https://joey.gq${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
  })
  .join('\n')}
</urlset>`

  // Generate blog posts sitemap
  const postsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allBlogs
  .filter((post) => !post.draft)
  .map((post) => {
    return `  <url>
    <loc>https://joey.gq/blog/${post.slug}</loc>
    <lastmod>${post.lastmod || post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  })
  .join('\n')}
</urlset>`

  // Generate authors sitemap
  const authorsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allAuthors
  .map((author) => {
    return `  <url>
    <loc>https://joey.gq/about/${author.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  })
  .join('\n')}
</urlset>`

  // Write all sitemaps
  writeFileSync('public/sitemap.xml', mainSitemap)
  writeFileSync('public/sitemap-posts.xml', postsSitemap)
  writeFileSync('public/sitemap-authors.xml', authorsSitemap)
}

generateSitemap() 