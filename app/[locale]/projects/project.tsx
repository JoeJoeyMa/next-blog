'use client'

import projectsData from '@/data/projectsData'
import Card from '@/components/projectcard'
import { LocaleTypes } from '../i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'

type ProjectCategory = 'website' | 'tools' | 'personal' | 'others'

const Project = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'projects')
  const projectArray = projectsData[locale]

  const categories: ProjectCategory[] = ['website', 'tools', 'personal', 'others']
  
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('title')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t('description')}</p>
        </div>

        {categories.map((category) => {
          const categoryProjects = projectArray.filter((project) => project.category === category)
          
          if (categoryProjects.length === 0) return null

          return (
            <div key={category} className="container py-12">
              <h3 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
                {t(`categories.${category}`)}
              </h3>
              <div className="-m-4 flex flex-wrap">
                {categoryProjects.map((project) => (
                  <Card
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    imgSrc={project.imgSrc}
                    href={project.href}
                    tags={project.tags}
                    feats={project.feats}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Project
