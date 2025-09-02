import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import ListLayout from '@/layouts/ListLayout'
import { genPageMetadata } from 'app/[locale]/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import tagData from 'app/[locale]/tag-data.json'

interface TagProps {
  params: Promise<{
    tag: string
    locale: LocaleTypes
  }>
}

export async function generateMetadata({ params }: TagProps): Promise<Metadata> {
  const { tag, locale } = await params
  return genPageMetadata({
    title: tag,
    params: { locale },
  })
}

export const generateStaticParams = async () => {
  const paths: { tag: string; locale: LocaleTypes }[] = []
  
  Object.entries(tagData).forEach(([locale, tags]) => {
    Object.keys(tags).forEach((tag) => {
      paths.push({
        tag: encodeURI(slug(tag)),
        locale: locale as LocaleTypes,
      })
    })
  })
  
  return paths
}

export default async function TagPage({ params }: TagProps) {
  const { tag, locale } = await params
  const decodedTag = decodeURI(tag)
  // Capitalize first letter and convert space to dash
  const title = decodedTag[0].toUpperCase() + decodedTag.split(' ').join('-').slice(1)
  
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) =>
          post.language === locale &&
          post.tags &&
          post.tags.map((t) => slug(t)).includes(decodedTag)
      )
    )
  )

  if (filteredPosts.length === 0) {
    return notFound()
  }

  return (
    <ListLayout
      posts={filteredPosts}
      title={title}
      params={{ locale }}
    />
  )
}

