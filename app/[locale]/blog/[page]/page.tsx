import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { LocaleTypes } from '../../i18n/settings';


const POSTS_PER_PAGE = 10

export async function generateStaticParams() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))
}

export default async function Page({ params }: { params: Promise<{ page: string, locale: LocaleTypes }> }) {
  const { page, locale } = await params
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter((post) => post.language === locale)
  const pageNumber = parseInt(page as string)
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    params: { locale: locale }
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
      params={{ locale: locale }}
    />
  )
}
