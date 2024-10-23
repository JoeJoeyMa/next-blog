import Link from '@/components/mdxcomponents/Link'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface PaginationProps {
  totalPages: number
  currentPage: number
  params: { locale: LocaleTypes }
}

export default function Pagination({
  totalPages,
  currentPage,
  params: { locale },
}: PaginationProps) {
  const { t } = useTranslation(locale, 'home')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {t('prevp')}
          </button>
        )}
        {prevPage && (
          <Link href={`/${locale}/blog/${currentPage - 1}`}>
            {t('prevp')}
          </Link>
        )}
        <span>
          {currentPage} {t('of')} {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {t('nextp')}
          </button>
        )}
        {nextPage && (
          <Link href={`/${locale}/blog/${currentPage + 1}`}>
            {t('nextp')}
          </Link>
        )}
      </nav>
    </div>
  )
}
