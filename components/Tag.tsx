import Link from '@/components/mdxcomponents/Link'
import { slug } from 'github-slugger'
import GrowingUnderline from '@/components/ui/GrowingUnderline'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      <GrowingUnderline>
        {text.split(' ').join('-')}
      </GrowingUnderline>
    </Link>
  )
}

export default Tag
