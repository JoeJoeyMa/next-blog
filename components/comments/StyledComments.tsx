'use client'

import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { Comments as CommentsComponent } from 'pliny/comments'
import siteMetadata from '@/data/siteMetadata'
import { useAutoLoadComments } from './useAutoLoadComments'
import { useEffect, useRef, useState } from 'react'

type StyledCommentsProps = {
  slug: string
}

export default function StyledComments({ slug }: StyledCommentsProps) {
  const { loadComments, commentRef } = useAutoLoadComments()
  const [showComments, setShowComments] = useState(false)
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')
  
  return (
    <div className="mt-8 w-full">
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -left-5 -top-5 h-20 w-20 rounded-full bg-primary-100 opacity-70 dark:bg-primary-900"></div>
        <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-primary-100 opacity-50 dark:bg-primary-900"></div>
        <div className="absolute bottom-16 left-20 h-12 w-12 rounded-full bg-secondary-100 opacity-60 dark:bg-secondary-900"></div>
        <div className="absolute top-24 right-12 h-10 w-10 rounded-full bg-blue-100 opacity-60 dark:bg-blue-900"></div>
        <div className="absolute -bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-yellow-100 opacity-60 dark:bg-yellow-900"></div>
        
        {/* Light beam effect in dark mode */}
        <div className="absolute left-1/2 top-0 -z-10 hidden h-[120%] w-32 -translate-x-1/2 transform bg-gradient-to-b from-primary-900/20 via-primary-900/5 to-transparent blur-3xl dark:block"></div>
        
        <div 
          className="relative rounded-xl border border-gray-200 bg-white px-6 py-10 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 sm:px-8"
          ref={commentRef}
        >
          {/* Top decorative line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-300 via-secondary-300 to-blue-300 dark:from-primary-900 dark:via-secondary-900 dark:to-blue-900"></div>
          
          <div className="mb-8 flex items-center space-x-3">
            <div className="h-0.5 flex-grow bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700"></div>
            <h3 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
              {t('guestbook') || 'Guestbook'}
            </h3>
            <div className="h-0.5 flex-grow bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700"></div>
          </div>
          
          <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
            {t('guestbook_description') || 'Sign my guestbook and leave a message!'}
          </p>

          {loadComments && !showComments && (
            <div className="flex justify-center py-6">
              <button
                onClick={() => setShowComments(true)}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-primary-500 to-secondary-500 p-0.5 text-sm font-medium text-white hover:from-primary-600 hover:to-secondary-600"
              >
                <span className="relative rounded-md bg-white px-5 py-2.5 text-gray-900 transition-all duration-75 ease-in group-hover:bg-opacity-0 group-hover:text-white dark:bg-gray-900 dark:text-white">
                  {t('comment') || 'Load Comments'}
                </span>
              </button>
            </div>
          )}
          
          {!loadComments && (
            <div className="flex justify-center py-6">
              <div className="animate-pulse text-gray-400 dark:text-gray-500">
                <svg className="h-8 w-8 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          )}
          
          <div className={`transition-all duration-700 ${!showComments ? 'max-h-0 opacity-0 scale-95 overflow-hidden' : 'max-h-[5000px] opacity-100 scale-100'}`}>
            {siteMetadata.comments && loadComments && (
              <div className="rounded-md border border-gray-100 bg-white p-5 shadow-inner dark:border-gray-700 dark:bg-gray-800">
                <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}