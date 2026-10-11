import Atmo from '@/components/decor/Atmo'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { isComingSoon, projects, projectsCopy } from '@/content/site/projects'
import styles from './Projects.module.css'
import ProjectsGrid from './ProjectsGrid'

// 準備中（COMING SOON）のカードは作品数に含めない
const publishedCount = projects.filter((project) => !isComingSoon(project)).length

export default function ProjectsSection() {
  return (
    <Section id="projects" className={styles.projects}>
      <Atmo variant="c" />

      <div className={styles.wrap}>
        <div className={styles.head}>
          <SectionHeading number={projectsCopy.sectionNumber} title={projectsCopy.sectionTitle} compact blink />
          <span className={styles.count}>
            {publishedCount} {projectsCopy.countSuffix}
          </span>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </Section>
  )
}
