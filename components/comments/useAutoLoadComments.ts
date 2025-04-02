'use client'

import { useEffect, useState, useRef } from 'react'

export function useAutoLoadComments() {
  const [loadComments, setLoadComments] = useState(false)
  const commentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadComments) {
          setTimeout(() => {
            setLoadComments(true)
            observer.disconnect()
          }, 800)
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 200px 0px'
      }
    )

    if (commentRef.current) {
      observer.observe(commentRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [loadComments])

  return { loadComments, commentRef }
}