import BackNavigation from './BackNavigation'
import ScrollProgress from '../scroll/ScrollProgress'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface PostNavigationProps {
  locale: LocaleTypes
  basePath: string
  backLabel: string
}

export default function PostNavigation({ locale, basePath, backLabel }: PostNavigationProps) {
  return (
    <div className="space-y-4">
      <div>
        <BackNavigation locale={locale} basePath={basePath} backLabel={backLabel} />
        <div className="w-5/6">
          <ScrollProgress />
        </div>
      </div>
    </div>
  )
}