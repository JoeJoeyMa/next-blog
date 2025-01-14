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
      {categories.map((category) => {
        const categoryProjects = projectArray.filter((project) => project.category === category)
        
        if (categoryProjects.length === 0) return null

        return (
          <div key={category} className="w-full mb-8">
            <h2 className="text-2xl font-bold mb-4 text-heading-400 dark:text-heading-400">
              {t(`categories.${category}`)}
            </h2>
            <div className="flex flex-wrap -m-4">
              {categoryProjects.map((project) => (
                <Card
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  imgSrc={project.imgSrc}
                  href={project.href}
                />
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Project
