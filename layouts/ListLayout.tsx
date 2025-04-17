'use client'

import { useRouter } from 'next/navigation'
import { slug } from 'github-slugger'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/mdxcomponents/Link'
import Tag from '@/components/Tag'
import { useTagStore } from '@/components/util/useTagStore'
import { motion } from 'framer-motion'
import Pagination from './Pagination'
import tagData from 'app/[locale]/tag-data.json'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import GrowingUnderline from '@/components/ui/GrowingUnderline'
import Image from '@/components/mdxcomponents/Image'

interface ListLayoutProps {
  params: { locale: LocaleTypes }
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: {
    currentPage
    totalPages: number
    params: { locale: LocaleTypes }
  }
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -25, y: 0 },
  show: { 
    opacity: 1, 
    x: 0, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0.3
    }
  },
}

export default function ListLayoutWithTags({
  params: { locale },
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const { t } = useTranslation(locale, 'home')
  const router = useRouter()
  const pathname = usePathname()
  const tagCountMap = tagData[locale]

  useEffect(() => {
    // 保存当前页码到sessionStorage
    if (pagination?.currentPage) {
      sessionStorage.setItem('lastPageNumber', String(pagination.currentPage))
    }
  }, [pagination?.currentPage])

  const handleTagClick = (tag: string) => {
    const sluggedTag = slug(tag)
    router.push(`/${locale}/tags/${sluggedTag}`)
  }

  // 更新标签渲染逻辑
  const filteredTags = Object.keys(tagCountMap).map((tag) => (
    <li key={tag} className="my-3">
      <button
        onClick={() => handleTagClick(tag)}
        className="text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium uppercase"
        aria-label={`View posts tagged ${tag}`}
      >
        {tag} ({tagCountMap[tag]})
      </button>
    </li>
  ))

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full min-w-[280px] max-w-[280px] flex-wrap rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex sticky top-8">
            <div className="px-6 py-4">
              <Link
                href={`/${locale}/blog`}
                className="text-gray-500 dark:text-gray-400 font-bold uppercase hover:text-primary-500"
              >
                {t('all')}
              </Link>
              <ul>{filteredTags}</ul>
            </div>
          </div>
          <div>
            <motion.ul variants={container} initial="hidden" animate="show">
              {(initialDisplayPosts.length > 0 ? initialDisplayPosts : posts).map((post) => {
                const { slug, date, title, summary, tags, language } = post
                if (language === locale) {
                  return (
                    <motion.li key={slug} variants={item} className="py-5">
                      <article>
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* 左侧图片 */}
                          <Link
                            href={`/${locale}/blog/${slug}`}
                            className="md:w-1/3 h-full overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:scale-105"
                            onClick={() => {
                              if (pagination?.currentPage) {
                                sessionStorage.setItem('lastPageNumber', String(pagination.currentPage))
                              } else {
                                sessionStorage.removeItem('lastPageNumber')
                              }
                            }}
                          >
                            {post.images && post.images.length > 0 ? (
                              <Image
                                src={post.images[0]}
                                alt={`${title} - 封面图片`}
                                width={800}
                                height={450}
                                className="w-full h-full object-cover"
                                priority
                              />
                            ) : (
                              <div className="w-full h-full min-h-[200px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-500 dark:text-gray-400">No image</span>
                              </div>
                            )}
                          </Link>

                          {/* 右侧内容 */}
                          <div className="md:w-2/3 space-y-2">
                            <dl>
                              <dt className="sr-only">{t('pub')}</dt>
                              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                <time dateTime={date}>{formatDate(date, language)}</time>
                              </dd>
                            </dl>
                            <div className="space-y-3">
                              <div>
                                <div className="text-2xl font-bold leading-8 tracking-tight">
                                  <Link
                                    href={`/${locale}/blog/${slug}`}
                                    className="text-gray-900 dark:text-gray-100"
                                    aria-labelledby={title}
                                    onClick={() => {
                                      if (pagination?.currentPage) {
                                        sessionStorage.setItem('lastPageNumber', String(pagination.currentPage))
                                      } else {
                                        sessionStorage.removeItem('lastPageNumber')
                                      }
                                    }}
                                  >
                                    <h2>
                                      <GrowingUnderline>
                                        {title}
                                      </GrowingUnderline>
                                    </h2>
                                  </Link>
                                </div>
                                <ul className="flex flex-wrap">
                                  {tags.map((t) => (
                                    <li key={t} className="my-3">
                                      <button
                                        onClick={() => handleTagClick(t)}
                                        className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 mr-3 text-sm font-medium uppercase"
                                        aria-label={`View posts tagged ${t}`}
                                      >
                                        {t}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                {summary!.length > 149 ? `${summary!.substring(0, 149)}...` : summary}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </motion.li>
                  )
                }
              })}
            </motion.ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                totalPages={pagination.totalPages}
                currentPage={pagination.currentPage}
                params={{ locale }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
