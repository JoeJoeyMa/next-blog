'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import siteMetadata from '@/data/siteMetadata'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useAutoLoadComments } from './useAutoLoadComments'

type CommentsProps = {
  slug: string
}

export default function Comments({ slug }: CommentsProps) {
  const { loadComments, commentRef } = useAutoLoadComments()
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')
  return (
    <div ref={commentRef}>
      {!loadComments && <div className="text-center">{t('comment')}</div>}
      {siteMetadata.comments && loadComments && (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      )}
    </div>
  )
}
