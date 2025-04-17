'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import Image from '@/components/mdxcomponents/Image'

interface ImageWith3DEffectProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export default function ImageWith3DEffect({
  src,
  alt,
  width = 800,
  height = 450,
  className = '',
}: ImageWith3DEffectProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 处理鼠标移动事件
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // 计算鼠标位置相对于图片中心的偏移
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    // 计算旋转角度，最大旋转角度为10度
    const rotateY = (mouseX / (rect.width / 2)) * 10
    const rotateX = -(mouseY / (rect.height / 2)) * 10
    
    setRotation({ x: rotateX, y: rotateY })
  }, [])

  // 处理鼠标离开事件
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }, [])

  // 处理鼠标进入事件
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  // 添加过渡效果
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (isHovered) {
      container.style.transition = 'none'
    } else {
      container.style.transition = 'transform 0.5s ease-out'
    }
  }, [isHovered])

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg shadow-xl transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.05)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transformStyle: 'preserve-3d',
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-cover transition-transform duration-300"
      />
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
    </div>
  )
} 