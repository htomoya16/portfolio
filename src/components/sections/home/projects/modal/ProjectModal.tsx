'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import type { Project } from '@/content/site/projects'
import { gsap } from '@/lib/gsap'
import ProjectDetail from './ProjectDetail'
import ProjectMediaCarousel from './ProjectMediaCarousel'
import styles from './ProjectModal.module.css'
import { useBodyScrollLock, useModalScrollGuard } from './useModalScroll'

interface Props {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
}

const META_FIELDS = [
  { key: 'role', label: 'ROLE', icon: 'role.svg' },
  { key: 'period', label: 'PERIOD', icon: 'period.svg' },
  { key: 'projectType', label: 'TYPE', icon: 'type.svg' },
  { key: 'duration', label: 'TIME', icon: 'time.svg' },
] as const

export default function ProjectModal({ project, open, onOpenChange }: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useBodyScrollLock(open)
  useModalScrollGuard(open, contentRef)

  // 開いた直後に本文のまとまりを上から順に表示する。portal の中身が描画されるのを待ってから探す
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => {
      const revealEls = rightRef.current?.querySelectorAll<HTMLElement>('[data-reveal]')
      if (!revealEls?.length) return
      gsap.fromTo(
        revealEls,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, stagger: 0.045, duration: 0.34, ease: 'power2.out' },
      )
    }, 240)
    return () => clearTimeout(timer)
  }, [open, project])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={contentRef}
        showCloseButton={false}
        className={styles.dialog}
        overlayClassName={styles.overlay}
      >
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <DialogDescription className="sr-only">{project.desc}</DialogDescription>

        <button className={styles.closeBtn} onClick={() => onOpenChange(false)} aria-label="Close modal">
          <span className={styles.closeX} aria-hidden="true">×</span>
        </button>

        <div className={styles.body}>
          <div className={styles.left}>
            <ProjectMediaCarousel key={project.num} project={project} />
            <div className={styles.meta}>
              <div className={styles.metaGrid}>
                {META_FIELDS.map(({ key, label, icon }) =>
                  project[key] ? (
                    <div key={key} className={styles.metaRow}>
                      <Image className={styles.metaIcon} src={`/assets/icons/projects/${icon}`} alt="" width={18} height={18} aria-hidden="true" />
                      <span className={styles.metaKey}>{label}</span>
                      <span className={styles.metaVal}>{project[key]}</span>
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          </div>

          <div className={styles.right} ref={rightRef}>
            <ProjectDetail project={project} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
