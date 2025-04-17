import React from 'react'
import Link from '@/components/mdxcomponents/Link'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import GrowingUnderline from '@/components/ui/GrowingUnderline'
import Image from '@/components/mdxcomponents/Image'

interface Post {
  slug: string
  date: string
  title: string
  summary?: string | undefined
  tags: string[]
  language: string
  draft?: boolean
  images?: string[]
}

interface PostListProps {
  posts: Post[]
  locale: LocaleTypes
  t: (key: string) => string
  maxDisplay: number
}

const PostList: React.FC<PostListProps> = ({ posts, locale, t, maxDisplay }) => {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {!posts.length && <li>{t('noposts')}</li>}
      {posts.slice(0, maxDisplay).map((post) => {
        const { slug, date, title, summary, tags, images } = post
        return (
          <li key={slug} className="py-12">
            <article>
              <div className="flex flex-col md:flex-row gap-6">
                {/* 左侧图片 */}
                <Link
                  href={`/${locale}/blog/${slug}`}
                  className="md:w-1/3 overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:scale-105"
                >
                  {images && images.length > 0 ? (
                    <Image
                      src={images[0]}
                      alt={`${title} - 封面图片`}
                      width={800}
                      height={450}
                      className="aspect-video w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">No image</span>
                    </div>
                  )}
                </Link>
                
                {/* 右侧内容 */}
                <div className="md:w-2/3 space-y-2">
                  <dl>
                    <dt className="sr-only">{t('pub')}</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, locale)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-5">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            href={`/${locale}/blog/${slug}`}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            <GrowingUnderline>
                              {title}
                            </GrowingUnderline>
                          </Link>
                        </h2>
                        <ul className="flex flex-wrap mt-2">
                          {tags.map((tag: string) => (
                            <li key={tag} className="mr-2">
                              <Tag text={tag} />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary!.length > 149 ? `${summary!.substring(0, 149)}...` : summary}
                      </div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <Link
                        href={`/${locale}/blog/${slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`${t('more')}"${title}"`}
                      >
                        <GrowingUnderline>
                          {t('more')} &rarr;
                        </GrowingUnderline>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}

export default PostList
