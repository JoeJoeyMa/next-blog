'use client'

import TOCInline from 'pliny/ui/TOCInline'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import { Toc, TocItem as OriginalTocItem } from 'pliny/mdx-plugins/remark-toc-headings'

interface TocBodyProps {
  toc: Toc
}

interface TocItem extends OriginalTocItem {
  children?: TocItem[]
}

const RightToc = ({ toc }: TocBodyProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')

  return (
    <div className="fixed right-8 top-0 z-50 hidden h-screen lg:flex">
      <div className="sticky right-0 top-0 z-50 flex h-screen w-64 flex-col overflow-y-auto rounded-lg bg-gray-100/80 backdrop-blur-sm px-4 py-4 dark:bg-gray-800/80 shadow-lg transition-all duration-300 ease-in-out">
        <div className="mb-20 mt-20">
          <div className="text-xl font-bold text-heading-400 mb-4">{t('sidetoc')}</div>
          <div className="my-auto overflow-y-auto">
            <TOCInline
              toc={toc as TocItem[]}
              ulClassName="space-y-3 overflow-y-auto my-auto text-primary-500"
              liClassName="pl-3 hover:text-heading-400 transition-colors duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightToc