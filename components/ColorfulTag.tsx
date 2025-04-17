import Link from 'next/link'
import { slug } from 'github-slugger'
import { useCallback } from 'react'

interface Props {
  text: string
  count: number
  locale: string
}

const ColorfulTag = ({ text, count, locale }: Props) => {
  const getRandomColor = useCallback(() => {
    const colors = [
      'bg-green-100 text-green-800',
      'bg-blue-100 text-blue-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-gray-100 text-gray-800',
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }, [])

  return (
    <Link href={`/${locale}/tags/${slug(text)}`}>
      <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${getRandomColor()} transition-transform duration-300 hover:scale-110`}>
        {text}
        <span className="ml-2 text-xs opacity-75">({count})</span>
      </span>
    </Link>
  )
}

export default ColorfulTag 