'use client'

import { useEffect, useState, useRef } from 'react'

export function useAutoLoadComments() {
  const [loadComments, setLoadComments] = useState(false)
  const commentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadComments) {
          setLoadComments(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
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