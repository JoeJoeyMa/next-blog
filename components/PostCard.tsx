import Link from '@/components/mdxcomponents/Link'
import Image from 'next/image'
import type { Blog, Authors } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface PostCardProps {
  blog: CoreContent<Blog>
  locale: LocaleTypes
}

const PostCard = ({ blog, locale }: PostCardProps) => {
  const { slug, date, title, summary, tags, images } = blog
  return (
    <Link href={`/${locale}/blog/${slug}`}>
      <article className="mx-auto overflow-hidden rounded-xl shadow-md duration-300 hover:scale-105 dark:bg-dark-100">
        <Image
          src={images}
          className="aspect-video w-full object-cover"
          width={1600}
          height={900}
          alt={title || ''}
        />
        <div className="p-3">
          <h2 className="text-xl font-extrabold">{title || slug}</h2>
          <section className="text-gray-500">
            <p>{summary}</p>
          </section>
          <span className="ml-1 text-sm font-bold text-gray-600">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString(locale, siteMetadata.postDateTemplate)}
            </time>
          </span>
          <div className="mt-1 flex flex-row space-x-3">
            {tags &&
              tags.map((tag) => (
                <div
                  key={tag}
                  className="rounded-md border-2 bg-gradient-to-r from-lime-500 to-yellow-400 bg-clip-text px-2 text-sm font-bold text-transparent"
                >
                  {tag}
                </div>
              ))}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PostCard
