'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import siteMetadata from '@/data/siteMetadata'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useEffect, useState, useRef } from 'react'

type CommentsProps = {
  slug: string
}

export default function Comments({ slug }: CommentsProps) {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')
  const giscusRef = useRef<HTMLIFrameElement>(null)

  if (!siteMetadata.comments) {
    console.error('Comments: siteMetadata.comments is undefined')
    return null
  }

  const giscusConfig = siteMetadata.comments.giscusConfig
  if (!giscusConfig) {
    console.error('Comments: giscusConfig is undefined')
    return null
  }

  return (
    <div>
      <div 
        data-giscus-loading="eager"
        data-giscus-emit-metadata="1"
        data-giscus-repo={giscusConfig.repo}
        data-giscus-repo-id={giscusConfig.repositoryId}
        data-giscus-category={giscusConfig.category}
        data-giscus-category-id={giscusConfig.categoryId}
        data-giscus-mapping={giscusConfig.mapping}
        data-giscus-reactions-enabled={giscusConfig.reactions}
        data-giscus-theme={giscusConfig.theme}
        data-giscus-lang={giscusConfig.lang}
        data-giscus-metadata="1"
        data-giscus-lazy-loading="false"
        data-giscus-input-position="top"
        data-giscus-load="eager"
        id="giscus-comments"
      >
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      </div>
    </div>
  )
}
