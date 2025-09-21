'use client'

import dynamic from 'next/dynamic'

// 动态导入基本版 PDFViewer 组件以避免 SSR 问题
const BasicPDFViewer = dynamic(() => import('@/components/BasicPDFViewer'), {
  ssr: false,
  loading: () => <div className="text-gray-500 p-4">Loading PDF...</div>
})

export default function Resume({ filename }: { filename: string }) {
  return (
    <div className="PDF__container w-full">
      <BasicPDFViewer filename={filename} />
    </div>
  )
}
