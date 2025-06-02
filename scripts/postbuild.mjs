import rss from './rss.mjs'
import { execSync } from 'child_process'

async function postbuild() {
  // 生成 RSS feed
  await rss()
  
  // 生成 sitemap
  console.log('Generating sitemap...')
  execSync('node ./scripts/generate-sitemap.mjs')
  console.log('Sitemap generated successfully!')
}

postbuild()
