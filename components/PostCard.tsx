import Link from '@/components/mdxcomponents/Link'
import Image from '@/components/mdxcomponents/Image'
import type { Blog, Authors } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import GrowingUnderline from '@/components/ui/GrowingUnderline'

interface PostCardProps {
  blog: CoreContent<Blog>
  locale: LocaleTypes
}

const PostCard = ({ blog, locale }: PostCardProps) => {
  const { slug, date, title, summary, tags, images } = blog
  return (
    <Link href={`/${locale}/blog/${slug}`}>
      <article className="mx-auto overflow-hidden rounded-xl shadow-md duration-300 hover:scale-105 dark:bg-dark-100">
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
        <div className="p-3">
          <h2 className="text-xl font-extrabold">
            <GrowingUnderline>
              {title || slug}
            </GrowingUnderline>
          </h2>
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
