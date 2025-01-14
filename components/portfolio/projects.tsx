"use client";

import React from "react";
import SectionHeading from "./components/section-heading";
import projectsData from '@/data/projectsData'
import Project from "@/components/portfolio/project";
import { useTranslation } from 'app/[locale]/i18n/client';
import { useParams } from 'next/navigation';
import { LocaleTypes } from 'app/[locale]/i18n/settings';

export default function Projects() {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, 'projects');
  const categories: ('website' | 'tools' | 'personal' | 'others')[] = ['website', 'tools', 'personal', 'others'];

  return (
    <section id="projects" className="scroll-mt-28 mb-6">
      <SectionHeading>
        <p>{t('title')}</p>
        <p className="text-xs text-center">
          {t('subtitle')}
        </p>
      </SectionHeading>

      {categories.map((category) => {
        const categoryProjects = projectsData[locale].filter(project => project.category === category);
        if (categoryProjects.length === 0) return null;

        return (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 capitalize">{t(`categories.${category}`)}</h2>
            <div>
              {categoryProjects.map((project, index) => (
                <React.Fragment key={index}>
                  <Project {...project} />
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
