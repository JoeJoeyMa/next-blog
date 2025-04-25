'use client'

import { useEffect, useState } from 'react'

export default function CommentCount() {
  const [totalComments, setTotalComments] = useState<number>(0)
  const [isGiscusLoaded, setIsGiscusLoaded] = useState(false)

  useEffect(() => {
    console.log('CommentCount: Setting up message listener')
    
    const handleMessage = (event: MessageEvent) => {
      console.log('CommentCount: Received message from origin:', event.origin)
      console.log('CommentCount: Message data:', event.data)
      
      if (event.origin !== 'https://giscus.app') {
        console.log('CommentCount: Ignoring message from non-giscus origin', event.origin)
        return
      }
      
      // 检查消息格式
      if (event.data && typeof event.data === 'object') {
        console.log('CommentCount: Message is an object, checking for giscus property')
        if (event.data.giscus) {
          console.log('CommentCount: Found giscus property:', event.data.giscus)
          if (event.data.giscus.totalCommentCount !== undefined) {
            console.log('CommentCount: Setting total comments to', event.data.giscus.totalCommentCount)
            setTotalComments(event.data.giscus.totalCommentCount)
          } else {
            console.log('CommentCount: No totalCommentCount in giscus data')
          }
        } else {
          console.log('CommentCount: No giscus property in message')
        }
      } else {
        console.log('CommentCount: Message is not an object')
      }
    }

    // 检查 Giscus iframe 是否已加载
    const checkGiscusLoaded = () => {
      // 尝试不同的选择器
      const giscusFrame = document.querySelector('iframe[src*="giscus.app"]') as HTMLIFrameElement
      if (giscusFrame) {
        console.log('CommentCount: Giscus iframe found', {
          src: giscusFrame.src,
          width: giscusFrame.width,
          height: giscusFrame.height,
          style: giscusFrame.style.cssText
        })
        setIsGiscusLoaded(true)
        window.addEventListener('message', handleMessage)
        return true
      }
      console.log('CommentCount: No Giscus iframe found')
      return false
    }

    // 如果 iframe 已经存在，直接添加监听器
    if (checkGiscusLoaded()) {
      return () => {
        console.log('CommentCount: Cleaning up message listener')
        window.removeEventListener('message', handleMessage)
      }
    }

    // 否则等待 iframe 加载
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'IFRAME') {
            const iframe = node as HTMLIFrameElement
            console.log('CommentCount: Found new iframe:', {
              src: iframe.src,
              nodeName: node.nodeName
            })
            if (iframe.src.includes('giscus.app')) {
              console.log('CommentCount: Found Giscus iframe in mutation', iframe)
              checkGiscusLoaded()
            }
          }
        })
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    // 添加一个定时器来定期检查 iframe
    const intervalId = setInterval(() => {
      console.log('CommentCount: Checking for Giscus iframe...')
      if (checkGiscusLoaded()) {
        clearInterval(intervalId)
      }
    }, 1000)

    return () => {
      observer.disconnect()
      clearInterval(intervalId)
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  console.log('CommentCount: Rendering with totalComments', totalComments, 'isGiscusLoaded', isGiscusLoaded)

  if (!isGiscusLoaded) {
    console.log('CommentCount: Giscus not loaded yet')
    return null
  }

  return (
    <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
      {totalComments} {totalComments === 1 ? 'comment' : 'comments'}
    </div>
  )
} 