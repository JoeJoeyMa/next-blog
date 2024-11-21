"use client";

import React from "react";
import SectionHeading from "./components/section-heading";
import projectsData from '@/data/projectsData'
import Project from "@/components/portfolio/project";


export default function Projects() {

  return (
    <section  id="projects" className="scroll-mt-28 mb-6">
      <SectionHeading>
        <p>My projects</p>
        <p className=" text-xs   text-center">
          watch the demo video for the project!
        </p>
      </SectionHeading>

      <div>
        {projectsData.en.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
