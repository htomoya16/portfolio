import Image from 'next/image'
import clsx from 'clsx'
import Atmo from '@/components/decor/Atmo'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { skillLevelDefinitions, skillsCopy } from '@/content/site/skills'
import styles from './Skills.module.css'
import SkillsList from './SkillsList'

const GUIDE_LEVEL_CLASS = ['', styles.guideLv1, styles.guideLv2, styles.guideLv3, styles.guideLv4, styles.guideLv5]

export default function SkillsSection() {
  return (
    <Section id="skills" className={styles.skills}>
      <Atmo variant="b" />

      <div className={styles.wrap}>
        <SectionHeading number={skillsCopy.sectionNumber} title={skillsCopy.sectionTitle} blink />

        <div className={styles.introGrid}>
          <div className={styles.overview}>
            {skillsCopy.leadParagraphs.map((text) => (
              <p className={styles.lead} key={text}>
                {text}
              </p>
            ))}
          </div>

          <div className={styles.levelColumn}>
            <div className={styles.levelGuide} aria-label={skillsCopy.levelGuideLabel}>
              {skillLevelDefinitions.map((item) => (
                <div key={item.level} className={clsx(styles.guideItem, GUIDE_LEVEL_CLASS[item.level])}>
                  <span className={styles.guideLevel}>Lv.{item.level}</span>
                  <span className={styles.guideLabel}>{item.label}</span>
                  <span className={styles.guideLine} aria-hidden="true" />
                </div>
              ))}
            </div>
            <p className={styles.note}>
              <Image className={styles.noteIcon} src="/assets/icons/misc/info-circle.svg" alt="" width={16} height={16} aria-hidden="true" />
              <span>{skillsCopy.note}</span>
            </p>
          </div>
        </div>

        <SkillsList />
      </div>
    </Section>
  )
}
