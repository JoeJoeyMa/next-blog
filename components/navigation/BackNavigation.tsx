'use client'

import Link from '@/components/mdxcomponents/Link'

interface BackNavigationProps {
  locale: string
  basePath: string
  backLabel: string
}

export default function BackNavigation({ locale, basePath, backLabel }: BackNavigationProps) {

  // 从sessionStorage中获取上次访问的页码，确保转换为数字类型
  const lastPageNumber = typeof window !== 'undefined' ? Number(sessionStorage.getItem('lastPageNumber')) || 1 : 1
  const currentPage = lastPageNumber > 1 ? `/${lastPageNumber}` : ''

  return (
    <div className="pt-4 xl:pt-8 mb-8">
      <Link
        href={`/${locale}/${basePath}${currentPage}`}
        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        aria-label="Back to the blog"
      >
        &larr;{backLabel}
      </Link>
    </div>
  )
}