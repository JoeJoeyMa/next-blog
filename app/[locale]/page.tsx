import { sortPosts, allCoreContent , coreContent} from 'pliny/utils/contentlayer'
import { Authors, allBlogs, allAuthors } from 'contentlayer/generated'
import FeaturedLayout from '@/layouts/FeaturedLayout'
import HomeLayout from '@/layouts/HomeLayout'
import { LocaleTypes } from './i18n/settings'
import AuthorCard from '@/components/AuthorCard'
import Wave from '@/components/wave'
import Intro from '@/components/portfolio/intro'
import Projects from '@/components/portfolio/projects'
import TabSwitcher from '@/components/TabSwitcher'
import { createTranslation } from './i18n/server'

type HomeProps = {
  params: Promise<{ locale: LocaleTypes }>
}

export default async function Page({ params }: HomeProps) {
  const { locale } = await params
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const filteredPosts = posts.filter((p) => p.language === locale)
  const hasFeaturedPosts = filteredPosts.filter((p) => p.featured === true)
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)
  const { t } = await createTranslation(locale, 'home')

  const FeaturedContent = await FeaturedLayout({ posts: hasFeaturedPosts, params: { locale } })
  const HomeContent = await HomeLayout({ posts: filteredPosts, params: { locale } })

  return (
    <>
      <AuthorCard content={mainContent} locale={locale} />
      <Intro />
      <Projects />
      <TabSwitcher
        featuredContent={FeaturedContent}
        homeContent={HomeContent}
        featuredLabel={t('featured')}
        homeLabel={t('greeting')}
      />
      <Wave />
    </>
  )
}
