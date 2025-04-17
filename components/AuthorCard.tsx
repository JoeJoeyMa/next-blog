import Image from './Image'
import ImageWith3DEffect from './ImageWith3DEffect'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'
import { RoughNotation } from 'react-rough-notation'
import ColorfulTag from './ColorfulTag'
import tagData from 'app/[locale]/tag-data.json'

interface AuthorCardProps {
  content?: any
  locale: string
}

const AuthorCard = ({ content, locale = 'en' }: AuthorCardProps) => {
  const { author, avatar, occupation, qualifications, email, x, linkedin, github, location } =
    siteMetadata

  // 确保使用有效的 locale，如果无效则默认使用 en
  const currentLocale = locale in tagData ? locale : 'en'
  const currentTagData = tagData[currentLocale]
  const tagKeys = Object.keys(currentTagData || {})
  const sortedTags = tagKeys.sort((a, b) => currentTagData[b] - currentTagData[a])

  return (
    <div>
      <div className="flex flex-row items-center justify-center space-x-2 pb-8">
        {avatar && (
          <div className="pr-2 xl:pr-4">
            <ImageWith3DEffect
              src={avatar}
              alt="avatar"
              width={224}
              height={224}
              className="h-48 w-48 min-w-48 rounded-full dark:border-2 dark:border-primary-400 md:h-52 md:w-52"
            />
          </div>
        )}
        <div>
          <h3 className="pb-2 pt-4  text-2xl font-bold leading-8 tracking-tight sm:text-3xl md:text-4xl">
            <RoughNotation
              type="underline"
              show={true}
              color="#FFb900"
              animationDelay={1400}
              animationDuration={1200}
            >
              {author}
            </RoughNotation>
          </h3>
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">{occupation}</div>
          <div className="md:text-md text-base text-primary-500 dark:text-primary-400">
            {qualifications}
          </div>
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">{location}</div>
          <div className="flex space-x-3 pt-6">
            <SocialIcon kind="mail" href={`mailto:${email}`} />
            <SocialIcon kind="github" href={github} />
            <SocialIcon kind="linkedin" href={linkedin} />
            <SocialIcon kind="x" href={x} />
          </div>
        </div>
      </div>
      <div className="flex max-w-full flex-col">
        <div className="prose max-w-full pb-8 pt-10 dark:prose-invert xl:text-xl">
          <p>
            I'm a dedicated{' '}
            <RoughNotation
              type="circle"
              show={true}
              color="#f43f5e"
              animationDelay={1700}
              animationDuration={1200}
            >
              FullStack Engineer{' '}
            </RoughNotation>
            focused on Software engineer, interested and working, aiming to be an independent
            developer.
          </p>
          <div className="py-4">
            <div className="flex flex-wrap gap-3">
              {sortedTags.map((tag) => (
                <ColorfulTag 
                  key={tag} 
                  text={tag} 
                  count={currentTagData[tag]} 
                  locale={currentLocale} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorCard
