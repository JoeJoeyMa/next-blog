'use client'

import React, { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// 设置 worker 文件路径
pdfjs.GlobalWorkerOptions.workerSrc = '/static/js/pdf.worker.min.js'

export default function BasicPDFViewer({ filename }: { filename: string }) {
  const [numPages, setNumPages] = useState<number>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [pdfWidth, setPdfWidth] = useState<number>(0)

  // 获取容器宽度
  useEffect(() => {
    const updateWidth = () => {
      const container = document.querySelector('.pdf-container')
      if (container) {
        setContainerWidth(container.clientWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
    setLoading(false)
    setError(null)
    
    // 在文档加载成功后获取第一页的宽度
    setTimeout(() => {
      const pageElement = document.querySelector('.react-pdf__Page')
      if (pageElement) {
        const pageWidth = pageElement.clientWidth
        setPdfWidth(pageWidth)
      }
    }, 100)
  }

  function onDocumentLoadError(error: Error): void {
    console.error('Error loading PDF:', error)
    setError('Failed to load PDF document')
    setLoading(false)
  }

  return (
    <div className="pdf-container w-full">
      {error && <div className="text-red-500 p-4">Error: {error}</div>}
      {loading && <div className="text-gray-500 p-4">Loading PDF...</div>}
      
      <Document
        file={filename}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
      >
        {numPages && Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={containerWidth}
            className="mb-4 w-full h-auto"
          />
        ))}
      </Document>
    </div>
  )
}