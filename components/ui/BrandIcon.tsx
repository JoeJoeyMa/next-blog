import NextJS from 'public/static/icons/nextjs.svg'
import TypeScript from 'public/static/icons/typescript.svg'
import TailwindCSS from 'public/static/icons/tailwind.svg'
import Redis from 'public/static/icons/redis.svg'
import PostgreSQL from 'public/static/icons/postgresql.svg'

export const BrandIconsMap = {
  NextJS,
  TypeScript,
  TailwindCSS,
  Redis,
  PostgreSQL,
} as const

export type BrandIconType = keyof typeof BrandIconsMap

const BrandIcon = ({ type, className = 'h-5 w-5' }: { type: BrandIconType; className?: string }) => {
  const Icon = BrandIconsMap[type]

  if (!Icon) {
    return <div>Missing icon for {type}</div>
  }

  return <Icon className={className} fill="currentColor" />
}

export default BrandIcon