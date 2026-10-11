'use client'

import { useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import ScrambleText from '@/components/animation/ScrambleText'
import { useTilt } from '@/components/animation/useTilt'
import { isComingSoon, type Project, projectsCopy } from '@/content/site/projects'
import { TECH_ICONS } from '@/content/site/techIcons'
import styles from './Projects.module.css'

type Props = {
  project: Project
  onOpen: (project: Project) => void
  onPrefetch: () => void
}

export default function ProjectCard({ project, onOpen, onPrefetch }: Props) {
  const ref = useRef<HTMLElement>(null)
  const comingSoon = isComingSoon(project)
  useTilt(ref)

  // 準備中のカードは中身がないので、クリックやキーボードで詳細を開けないようにする
  const interactiveProps: React.HTMLAttributes<HTMLElement> = comingSoon
    ? {}
    : {
        onClick: () => onOpen(project),
        onPointerEnter: onPrefetch,
        onFocus: onPrefetch,
        role: 'button',
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpen(project)
          }
        },
        'aria-label': `${projectsCopy.viewDetailsAriaPrefix} ${project.title}`,
      }

  return (
    <article
      ref={ref}
      className={clsx(styles.card, !project.previewImage && styles.noPreview, comingSoon && styles.comingSoon)}
      data-cursor-grow
      data-project-card
      {...interactiveProps}
    >
      <span className={styles.sheen} aria-hidden="true" />
      {project.previewImage && (
        <div className={styles.preview}>
          <span className={styles.numBadge}>{project.num}</span>
          <div className={styles.previewImageWrap}>
            <Image
              src={project.previewImage.src}
              alt={project.previewImage.alt}
              fill
              sizes="(max-width: 900px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className={clsx(styles.previewImage, project.previewImage.fit === 'contain' && styles.contain)}
            />
          </div>
          <div className={styles.viewHint} aria-hidden="true">{projectsCopy.viewHint}</div>
        </div>
      )}
      <div className={styles.meta}>
        <p className={styles.numSmall}>{`${projectsCopy.itemLabelPrefix} ${project.num}`}</p>
        <ScrambleText
          as="h3"
          className={styles.title}
          text={project.title}
          revealRate={34}
          settleDuration={520}
          replayOnHover={true}
        />
        <p className={styles.desc}>{project.desc}</p>
        {project.tags.length > 0 && (
          <div className={styles.tags}>
            {project.tags.map((tag) => {
              const iconSrc = TECH_ICONS[tag]
              return (
                <span key={tag} className={styles.tag} aria-label={tag} title={tag}>
                  {iconSrc ? (
                    <Image src={iconSrc} alt="" width={20} height={20} aria-hidden="true" className={styles.tagIcon} />
                  ) : (
                    <span className={styles.tagFallback}>{tag}</span>
                  )}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </article>
  )
}
