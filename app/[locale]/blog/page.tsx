import { Metadata } from 'next'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import { POSTS_PER_PAGE } from '@/data/postsPerPage'

type BlogPageProps = {
  params: Promise<{ locale: LocaleTypes }>
  searchParams?: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params
  return genPageMetadata({
    title: 'Blog',
    params: { locale: locale },
  })
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params
  const resolvedSearchParams = await searchParams
  const { t } = await createTranslation(locale, 'home')
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter((post) => post.language === locale)
  
  const pageNumber = parseInt(resolvedSearchParams?.page || '1')
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    params: { locale }
  }

  return (
    <ListLayout
      params={{ locale }}
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={t('all')}
    />
  )
}
