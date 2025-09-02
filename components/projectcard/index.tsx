import Image from '../mdxcomponents/Image'
import Link from '../mdxcomponents/Link'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { motion } from 'framer-motion'
import { useTranslation } from 'app/[locale]/i18n/client'
import BrandIcon, { BrandIconsMap } from '../ui/BrandIcon'

const variants = {
  hidden: { opacity: 0, x: 0, y: -25 },
  enter: { opacity: 1, x: 0, y: 0 },
}

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
  tags?: string[]
  feats?: string[]
}

const Card: React.FC<CardProps> = ({ title, description, imgSrc, href, tags, feats }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'projects')
  
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: 'tween' }}
      className="md max-w-[544px] p-4 md:w-1/2"
    >
      <div className={`${imgSrc && 'h-full'} flex h-full flex-col overflow-hidden rounded-lg border border-transparent shadow-nextjs dark:shadow-nextjs-dark`}>
        {imgSrc &&
          (href ? (
            <Link
              href={href.startsWith('http') ? href : `/${locale}${href}`}
              aria-label={`${t('linkto')}${title}`}
            >
              <Image
                alt={title}
                title={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-60"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              title={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-60"
              width={544}
              height={306}
            />
          ))}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link
                href={href.startsWith('http') ? href : `/${locale}${href}`}
                aria-label={`${t('linkto')}${title}`}
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          
          {tags && tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('builtWith')}: </span>
              {tags.map((tag, index) => {
                const iconType = tag.replace(/\s+/g, '') as keyof typeof BrandIconsMap
                return (
                  <span
                    key={tag}
                    className="rounded-md border-2 bg-gradient-to-r from-lime-500 to-yellow-400 bg-clip-text px-2 text-sm font-bold text-transparent"
                  >
                    {BrandIconsMap[iconType] && <BrandIcon type={iconType} className="h-4 w-4 inline-block mr-1" />}
                    {tag}
                    {index !== tags.length - 1 && ' '}
                  </span>
                )
              })}
            </div>
          )}

          {/* 添加 feats 展示 */}
          {feats && feats.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('features')}:</span>
              {feats.map((feat) => (
                <span
                  key={feat}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  {feat}
                </span>
              ))}
            </div>
          )}

          {href && (
            <Link
              href={href.startsWith('http') ? href : `/${locale}${href}`}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`${t('linkto')}${title}`}
            >
              {href.startsWith('http') ? `${t('visit')}` : `${t('read')}`} &rarr;
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Card
