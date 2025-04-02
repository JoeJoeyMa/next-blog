'use client'

import { useCallback, useState, useRef, useEffect } from 'react'
import { useResizeObserver } from '@wojtekmaj/react-hooks'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'css/pdf.css'

import type { PDFDocumentProxy } from 'pdfjs-dist'

pdfjs.GlobalWorkerOptions.workerSrc = '/static/js/pdf.worker.min.js'

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
}

const resizeObserverOptions = {}

export default function Sample({ filename }) {
  const [numPages, setNumPages] = useState<number>()
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>(400)
  const [documentHeight, setDocumentHeight] = useState<number>(400)
  const [scalePercentage, setScalePercentage] = useState<number>(100)
  const maxWidth = useRef<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  
  useEffect(() => {
    // Detect if the device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    // Check on initial load
    checkIsMobile()
    
    // Set default scale percentage based on device type
    setScalePercentage(window.innerWidth <= 768 ? 100 : 70)
    
    // Add resize listener to detect changes
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  const debounce = (fn, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn(...args), delay)
    }
  }

  const handleSetContainerWidth = useCallback((width) => {
    maxWidth.current = width
    const scaledWidth = width * (scalePercentage / 100)
    setContainerWidth(scaledWidth)
    setDocumentHeight(Math.floor(scaledWidth * (11 / 8.5)))
  }, [scalePercentage])

  const debounceSetContainerWidth = useRef(debounce(handleSetContainerWidth, 100))

  useEffect(() => {
    debounceSetContainerWidth.current = debounce(handleSetContainerWidth, 100)
  }, [handleSetContainerWidth])

  useEffect(() => {
    if (maxWidth.current > 0) {
      const scaledWidth = maxWidth.current * (scalePercentage / 100)
      setContainerWidth(scaledWidth)
      setDocumentHeight(Math.floor(scaledWidth * (11 / 8.5)))
    }
  }, [scalePercentage])

  const onResize = useCallback((entries) => {
    const [entry] = entries
    if (entry) {
      debounceSetContainerWidth.current(entry.contentRect.width)
    }
  }, [])

  useResizeObserver(containerRef, resizeObserverOptions, onResize)

  const onDocumentLoadSuccess = useCallback(({ numPages: nextNumPages }: PDFDocumentProxy) => {
    setNumPages(nextNumPages)
  }, [])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScalePercentage(parseInt(e.target.value))
  }

  const resetDefaultZoom = () => {
    setScalePercentage(isMobile ? 100 : 70)
  }

  return (
    <div className="PDF__container">
      <div className="flex w-full justify-center mb-4">
        <div className="w-full max-w-md flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-300 min-w-[50px]">Zoom: {scalePercentage}%</span>
          <input 
            type="range" 
            min="50" 
            max="100" 
            value={scalePercentage} 
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <button 
            onClick={resetDefaultZoom}
            className="text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-2 py-1 rounded text-gray-600 dark:text-gray-300"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="PDF__container__document xs:m-0" ref={setContainerRef}>
        <div style={{ width: `${scalePercentage}%`, margin: '0 auto' }}>
          <Document file={filename} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                canvasBackground={'#ffffff'}
                className={`min-w-fit border border-primary-500 bg-primary-500`}
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                height={documentHeight}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  )
}
