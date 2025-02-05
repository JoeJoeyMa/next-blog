'use client'

import { useRouter } from 'next/navigation'
import Link from '@/components/mdxcomponents/Link'

interface BackNavigationProps {
  locale: string
  basePath: string
  backLabel: string
}

export default function BackNavigation({ locale, basePath, backLabel }: BackNavigationProps) {
  const router = useRouter()

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.back()
  }

  return (
    <div className="pt-4 xl:pt-8 mb-8">
      <Link
        href={`/${locale}/${basePath}`}
        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        aria-label="Back to the blog"
        onClick={handleBackClick}
      >
        &larr;{backLabel}
      </Link>
    </div>
  )
}