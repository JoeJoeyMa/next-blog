'use client'

import { slug } from 'github-slugger'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  const locale = useParams()?.locale as LocaleTypes
  const sluggedTag = slug(text)

  return (
    <Link href={`/${locale}/tags/${sluggedTag}`}>
      <span className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {text.split(' ').join('-')}
      </span>
    </Link>
  )
}

export default Tag
