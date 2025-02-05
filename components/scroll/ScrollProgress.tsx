'use client'

import { useEffect, useState } from 'react'

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const windowHeight = scrollHeight - clientHeight
      const currentProgress = (scrollTop / windowHeight) * 100
      setProgress(currentProgress)
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="hidden xl:block xl:sticky xl:bottom-8 xl:mt-4 xl:w-full">
      <div className="h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-200 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        {Math.round(progress)}% read
      </div>
    </div>
  )
}

export default ScrollProgress