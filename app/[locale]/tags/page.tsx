import { Metadata } from 'next'
import Tag from '@/components/Tag'
import tagData from 'app/[locale]/tag-data.json'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import ListLayout from '@/layouts/ListLayout'
import BlogPage from './blog-page'

type TagsProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: TagsProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'SEO')
  return genPageMetadata({
    title: 'Tags',
    description: t('tags'),
    params: { locale: locale },
  })
}

export default async function Page({ params: { locale } }: TagsProps) {
  const { t } = await createTranslation(locale, 'home')
  const tagCounts = tagData[locale]
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  // 获取所有文章并按语言筛选
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter((post) => post.language === locale)

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-heading-400 dark:text-heading-400 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((tag) => (
            <div key={tag} className="mb-2 mr-5 mt-2">
              <Tag text={tag} />
              <span className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300">
                {`(${tagCounts[tag]})`}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-heading-400 dark:text-heading-400 sm:text-3xl sm:leading-10">
            {t('all')}
          </h2>
        </div>
        <ListLayout
          posts={filteredPosts}
          initialDisplayPosts={filteredPosts}
          params={{ locale }}
          title=""
        />
      </div> */}
      <BlogPage posts={filteredPosts} locale={locale} />
    </>
  )
}
