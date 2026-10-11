import type { ReactNode } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import ScrambleText from '@/components/animation/ScrambleText'
import { type Project, type ProjectDevFeature, projectModalCopy } from '@/content/site/projects'
import { TECH_ICONS } from '@/content/site/techIcons'
import styles from './ProjectDetail.module.css'

const ICON_BASE = '/assets/icons/projects'
const icon = (file: string) => `${ICON_BASE}/${file}`

function ProjectIcon({ src, className = styles.sectionIcon, size = 18 }: { src: string; className?: string; size?: number }) {
  return <Image className={className} src={src} alt="" width={size} height={size} aria-hidden="true" />
}

/** 改行ごとに段落を分けて表示する */
function ParagraphText({ text, className }: { text: string; className: string }) {
  const paragraphs = text.split(/\n+/).map((paragraph) => paragraph.trim()).filter(Boolean)
  return (
    <div className={clsx(className, styles.textBlock)}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

/** 開いたときに順に表示する、見出し付きのまとまり（data-reveal は ProjectModal の演出の目印） */
function DetailSection({ iconSrc, title, children }: { iconSrc: string; title: string; children: ReactNode }) {
  return (
    <div className={styles.section} data-reveal>
      <h3 className={styles.sectionTitle}>
        <ProjectIcon src={iconSrc} />
        {title}
      </h3>
      {children}
    </div>
  )
}

function ExternalLink({ href, ariaLabel, leadingIcon, className, children }: {
  href: string
  ariaLabel: string
  leadingIcon?: { src: string; className: string }
  className?: string
  children: ReactNode
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={clsx(styles.link, className)} aria-label={ariaLabel}>
      {leadingIcon && <ProjectIcon src={leadingIcon.src} className={leadingIcon.className} />}
      {children}
      <ProjectIcon src={icon('link-external.svg')} className={styles.externalIcon} size={14} />
    </a>
  )
}

function DevFeatureTable({ features }: { features: ProjectDevFeature[] }) {
  const labels = projectModalCopy.devFeatureLabels
  const summaries = features.filter((feature) => feature.owner === 'self' && feature.summary)

  return (
    <div className={styles.devFeatures}>
      <table className={styles.featureTable}>
        <thead>
          <tr>
            <th scope="col">{labels.feature}</th>
            <th scope="col">{labels.owner}</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.name} className={styles[feature.owner]}>
              <th scope="row">{feature.name}</th>
              <td>
                <span className={clsx(styles.ownerBadge, styles[feature.owner])}>{labels[feature.owner]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {summaries.length > 0 && (
        <div className={styles.featureSummaries}>
          <h4 className={styles.subTitle}>{labels.summaryTitle}</h4>
          <dl className={styles.featureSummaryList}>
            {summaries.map((feature) => (
              <div key={feature.name} className={styles.pairItem}>
                <dt>{feature.name}</dt>
                <dd className={styles.pairText}>{feature.summary}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  )
}

/** モーダル右側の本文（タイトル、リンク、開発背景〜学び） */
export default function ProjectDetail({ project }: { project: Project }) {
  const { sections } = projectModalCopy
  const hasDevContent = Boolean(project.devContent || project.devFeatures?.length)

  return (
    <>
      <div data-reveal>
        <p className={styles.label}>{`// ${project.num}`}</p>
        <div className={styles.titleRow}>
          <ScrambleText
            as="h2"
            className={styles.title}
            text={project.title}
            revealRate={24}
            settleDuration={640}
            delay={220}
            replayOnHover={false}
          />
          <div className={styles.actions}>
            {project.repoUrl && (
              <ExternalLink
                href={project.repoUrl}
                ariaLabel={`${projectModalCopy.githubAriaPrefix} ${project.title} ${projectModalCopy.githubAriaSuffix}`}
                leadingIcon={{ src: '/assets/icons/skills/github-dark.svg', className: styles.githubIcon }}
              >
                {projectModalCopy.githubLabel}
              </ExternalLink>
            )}
            {project.liveUrl && (
              <ExternalLink href={project.liveUrl} ariaLabel={`Open related page for ${project.title}`}>
                {project.liveLabel ?? 'Link'}
              </ExternalLink>
            )}
            {project.demoUrl && (
              <ExternalLink
                href={project.demoUrl}
                ariaLabel={`Open demo video for ${project.title}`}
                leadingIcon={{ src: icon('youtube.svg'), className: styles.youtubeIcon }}
                className={styles.demoLink}
              >
                {project.demoLabel ?? 'YouTube'}
              </ExternalLink>
            )}
          </div>
        </div>
        <p className={styles.summary}>{project.desc}</p>
      </div>

      <div className={styles.divider} data-reveal />

      {project.background && (
        <DetailSection iconSrc={icon('background.svg')} title={sections.background}>
          <ParagraphText className={styles.sectionBody} text={project.background} />
        </DetailSection>
      )}

      {hasDevContent && (
        <DetailSection iconSrc={icon('details.svg')} title={sections.devContent}>
          {project.devContent && <ParagraphText className={styles.sectionBody} text={project.devContent} />}
          {project.devFeatures && project.devFeatures.length > 0 && <DevFeatureTable features={project.devFeatures} />}
        </DetailSection>
      )}

      <DetailSection iconSrc={icon('tech.svg')} title={sections.techStack}>
        <div className={styles.tags}>
          {project.tags.map((tag) => {
            const iconSrc = TECH_ICONS[tag]
            return (
              <span key={tag} className={styles.tag}>
                {iconSrc ? (
                  <ProjectIcon src={iconSrc} className={styles.tagIcon} />
                ) : (
                  <span className={styles.tagFallback} aria-hidden="true">{tag.slice(0, 2)}</span>
                )}
                {tag}
              </span>
            )
          })}
        </div>
        {project.techReasons && project.techReasons.length > 0 && (
          <div className={styles.techReasons}>
            <h4 className={styles.subTitle}>{sections.techReasons}</h4>
            <ul className={styles.techReasonList}>
              {project.techReasons.map((item) => (
                <li key={item.name} className={styles.pairItem}>
                  <span className={styles.techReasonName}>{item.name}</span>
                  <span className={styles.pairText}>{item.reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </DetailSection>

      {project.highlights && project.highlights.length > 0 && (
        <DetailSection iconSrc={icon('point.svg')} title={sections.highlights}>
          <ul className={styles.bulletList}>
            {project.highlights.map((highlight, i) => (
              <li key={i} className={styles.bulletItem}>
                <ProjectIcon src={icon('check.svg')} className={styles.bulletIcon} />
                <ParagraphText className={styles.bulletText} text={highlight} />
              </li>
            ))}
          </ul>
        </DetailSection>
      )}

      {project.challenges && project.challenges.length > 0 && (
        <DetailSection iconSrc={icon('flag.svg')} title={sections.challenges}>
          <div className={clsx(styles.challenges, project.challengesLayout === 'stack' && styles.stack)}>
            {project.challenges.map((challenge, i) => (
              <div key={i} className={styles.challenge}>
                <div className={styles.problem}>
                  <span className={styles.challengeLabel}>
                    <ProjectIcon src={icon('Issue.svg')} className={styles.challengeIcon} />
                    {projectModalCopy.challengeLabels.problem}
                  </span>
                  <ParagraphText className={styles.challengeCopy} text={challenge.problem} />
                </div>
                <div className={styles.solution}>
                  <span className={styles.challengeLabel}>
                    <ProjectIcon src={icon('solution.svg')} className={styles.challengeIcon} />
                    {projectModalCopy.challengeLabels.solution}
                  </span>
                  <ParagraphText className={styles.challengeCopy} text={challenge.solution} />
                </div>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {project.learnings && project.learnings.length > 0 && (
        <DetailSection iconSrc={icon('learning.svg')} title={sections.learnings}>
          <ul className={styles.bulletList}>
            {project.learnings.map((learning, i) => (
              <li key={i} className={styles.bulletItem}>
                <ProjectIcon src={icon('check.svg')} className={styles.bulletIcon} />
                {learning}
              </li>
            ))}
          </ul>
        </DetailSection>
      )}
    </>
  )
}
