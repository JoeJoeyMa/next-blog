import Link from '@/components/mdxcomponents/Link'
import Share from '@/components/share'
import Comments from '@/components/comments/Comments'
import WalineComments from '@/components/comments/walinecomponents/walineComments'
import siteMetadata from '@/data/siteMetadata'
import WideContainer from '@/components/WideContainer'

interface PostFooterProps {
  title: string
  slug: string
  filePath: string
  path: string
  t: (key: string) => string
}

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

export default function PostFooter({ title, slug, filePath, path, t }: PostFooterProps) {
  return (
    <div className="w-full border-t border-gray-200 dark:border-gray-700">
      <WideContainer>
        <div className="mx-1 max-w-auto py-1">
          <div className="pb-1 pt-1 text-sm text-gray-700 dark:text-gray-300">
            <Link href={discussUrl(path)} rel="nofollow">
              {t('twitter')}
            </Link>
            {` • `}
            <Link href={editUrl(filePath)}>{t('github')}</Link>
          </div>
          <Share title={title} slug={slug} />
          <div
            className="mt-1 pb-1 pt-1 text-center text-gray-700 dark:text-gray-300"
            id="comment"
          >
            {siteMetadata.iswaline === true && <WalineComments />}
            {siteMetadata.comments && siteMetadata.iscomments === true && (
              <Comments slug={slug} />
            )}
          </div>
        </div>
      </WideContainer>
    </div>
  )
} 