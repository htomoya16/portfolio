'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image, { getImageProps } from 'next/image'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import type { CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Project, ProjectMedia } from '@/content/site/projects'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import styles from './ProjectMediaCarousel.module.css'
import { CAROUSEL_WHEEL_EVENT } from './useModalScroll'

interface ProjectMediaCarouselProps {
  project: Project
}

/** 縦長・正方形の枠に切り替えるクラス（横長は既定の 16:9 のまま） */
function orientationClass(item: ProjectMedia) {
  return item.orientation ? styles[item.orientation] : undefined
}

/**
 * <video poster> は Next.js の画像最適化を通らず、元のファイル（900KB を超える PNG もある）を
 * そのまま読むため、最適化した画像の URL を作って渡す。
 * 表示枠の 2 倍程度の幅（横長 1200px / 縦長 750px）になるように指定している。
 */
function getOptimizedPoster(item: ProjectMedia) {
  if (!item.poster) return undefined
  const portrait = item.orientation === 'portrait'
  const { props } = getImageProps({
    src: item.poster,
    alt: '',
    width: portrait ? 375 : 600,
    height: portrait ? 667 : 338,
  })
  return props.src
}

function MediaFrame({ item, videoRef, priority = false, active = false }: {
  item: ProjectMedia
  videoRef?: (node: HTMLVideoElement | null) => void
  priority?: boolean
  /** カルーセルで表示中か。表示中の動画だけ再生に必要な情報を先読みする */
  active?: boolean
}) {
  if (item.type === 'video') {
    return (
      <video
        ref={videoRef}
        className={styles.media}
        src={item.src}
        poster={getOptimizedPoster(item)}
        controls
        preload={active ? 'metadata' : 'none'}
        aria-label={item.alt}
      />
    )
  }

  return (
    <>
      {/* 縦横比が合わない画像の余白を、同じ画像のぼかしで埋めて画像ごとに自然な背景色にする */}
      <Image
        className={styles.backdrop}
        src={item.src}
        alt=""
        fill
        sizes="64px"
        aria-hidden="true"
        draggable={false}
      />
      <Image
        className={styles.media}
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 760px) 100vw, 48vw"
        priority={priority}
        draggable={false}
      />
    </>
  )
}

function ThumbFrame({ item }: { item: ProjectMedia }) {
  if (item.type === 'video' && item.poster) {
    return (
      <>
        <Image
          className={clsx(styles.thumbMedia, orientationClass(item))}
          src={item.poster}
          alt=""
          fill
          sizes="120px"
          draggable={false}
          aria-hidden="true"
        />
        <span className={styles.thumbPlay} aria-hidden="true" />
      </>
    )
  }

  if (item.type === 'video') {
    return (
      <>
        <video
          className={clsx(styles.thumbMedia, orientationClass(item))}
          src={item.src}
          preload="metadata"
          muted
          aria-hidden="true"
        />
        <span className={styles.thumbPlay} aria-hidden="true" />
      </>
    )
  }

  return (
    <Image
      className={clsx(styles.thumbMedia, orientationClass(item))}
      src={item.src}
      alt=""
      fill
      sizes="120px"
      draggable={false}
      aria-hidden="true"
    />
  )
}

export default function ProjectMediaCarousel({ project }: ProjectMediaCarouselProps) {
  const media = project.media ?? []
  const prefersReducedMotion = usePrefersReducedMotion()
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const thumbStripRef = useRef<HTMLDivElement | null>(null)
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([])
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const expanded = expandedIndex === null ? null : media[expandedIndex]

  const pauseInactiveVideos = useCallback((activeIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (!video || index === activeIndex) return
      video.pause()
    })
  }, [])

  useEffect(() => {
    const strip = thumbStripRef.current
    const selectedThumb = thumbRefs.current[selectedIndex]
    if (!strip || !selectedThumb) return

    const targetLeft = selectedThumb.offsetLeft - (strip.clientWidth - selectedThumb.clientWidth) / 2
    strip.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }, [prefersReducedMotion, selectedIndex])

  useEffect(() => {
    if (!api) return

    const handleSelect = () => {
      const current = api.selectedScrollSnap()
      setSelectedIndex(current)
      pauseInactiveVideos(current)
    }

    handleSelect()
    api.on('select', handleSelect)
    api.on('reInit', handleSelect)

    return () => {
      api.off('select', handleSelect)
      api.off('reInit', handleSelect)
    }
  }, [api, pauseInactiveVideos])

  // スマホでは表示領域の高さを、表示中の画像（キャプション込み）に合わせる。
  // 縦長と横長の画像が混ざると一番高い画像に合わせて領域が確保され、
  // 横長の画像の上下に大きな空白ができるため。PC はレイアウトが固定なので変えない
  useEffect(() => {
    if (!api) return
    const viewport = api.rootNode()
    const mobile = window.matchMedia('(max-width: 760px)')

    const fitHeight = () => {
      if (!mobile.matches) {
        viewport.style.height = ''
        return
      }
      const card = api.slideNodes()[api.selectedScrollSnap()]?.firstElementChild
      if (card instanceof HTMLElement) viewport.style.height = `${card.offsetHeight}px`
    }

    fitHeight()
    api.on('select', fitHeight)
    api.on('reInit', fitHeight)
    api.on('resize', fitHeight)
    mobile.addEventListener('change', fitHeight)
    return () => {
      api.off('select', fitHeight)
      api.off('reInit', fitHeight)
      api.off('resize', fitHeight)
      mobile.removeEventListener('change', fitHeight)
      viewport.style.height = ''
    }
  }, [api])

  useEffect(() => {
    if (expandedIndex === null) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedIndex(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [expandedIndex])

  useEffect(() => {
    const node = rootRef.current
    if (!node || !api) return

    // トラックパッドは1回のスワイプで大量の wheel イベントを送るため、
    // 一定量たまったら1枚だけ進め、操作が止まるまで（または一定時間）次を受け付けない
    const STEP_THRESHOLD = 40
    const IDLE_MS = 160
    const MAX_LOCK_MS = 700
    let accumulated = 0
    let lockedAt: number | null = null
    let idleTimer: ReturnType<typeof setTimeout> | undefined

    const handleWheel = (event: Event) => {
      const detail = (event as CustomEvent<{ deltaY: number; deltaX: number }>).detail
      const delta = Math.abs(detail.deltaX) > Math.abs(detail.deltaY) ? detail.deltaX : detail.deltaY

      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        accumulated = 0
        lockedAt = null
      }, IDLE_MS)

      const now = performance.now()
      if (lockedAt !== null && now - lockedAt < MAX_LOCK_MS) return

      accumulated += delta
      if (Math.abs(accumulated) < STEP_THRESHOLD) return

      if (accumulated > 0) {
        api.scrollNext()
      } else {
        api.scrollPrev()
      }
      accumulated = 0
      lockedAt = now
    }

    node.addEventListener(CAROUSEL_WHEEL_EVENT, handleWheel)
    return () => {
      clearTimeout(idleTimer)
      node.removeEventListener(CAROUSEL_WHEEL_EVENT, handleWheel)
    }
  }, [api])

  if (media.length === 0) {
    return null
  }

  return (
    <div
      ref={rootRef}
      className={styles.carousel}
      aria-label={`Media previews for ${project.title}`}
    >
      <p className={styles.kicker}>PROJECT {project.num}</p>
      <Carousel
        setApi={setApi}
        opts={{ loop: media.length > 1, align: 'start' }}
        className={styles.shell}
        data-carousel-wheel
      >
        <CarouselContent className={styles.track}>
          {media.map((item, index) => (
            <CarouselItem key={`${item.src}-${index}`} className={styles.item}>
              <figure className={styles.card}>
                <div className={clsx(styles.stage, orientationClass(item))}>
                  <div className={styles.screen}>
                    {item.type === 'image' ? (
                      <button
                        type="button"
                        className={styles.open}
                        onClick={() => setExpandedIndex(index)}
                        aria-label={`Open large preview: ${item.alt}`}
                      >
                        <MediaFrame item={item} priority={index === 0} />
                      </button>
                    ) : (
                      <MediaFrame
                        item={item}
                        videoRef={(node) => { videoRefs.current[index] = node }}
                        priority={index === 0}
                        active={index === selectedIndex}
                      />
                    )}
                  </div>
                </div>
                {item.caption && (
                  <figcaption className={styles.caption}>
                    <span className={styles.count}>{String(index + 1).padStart(2, '0')}</span>
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        {media.length > 1 && (
          <div className={styles.thumbNav}>
            <CarouselPrevious className={styles.navBtn} aria-label="Previous media" />
            <div className={styles.thumbStrip} aria-label="Media thumbnails" ref={thumbStripRef}>
              {media.map((item, index) => (
                <button
                  type="button"
                  key={`${item.src}-thumb-${index}`}
                  className={styles.thumb}
                  aria-current={selectedIndex === index ? 'true' : undefined}
                  aria-label={`Show media ${index + 1}: ${item.alt}`}
                  ref={(node) => { thumbRefs.current[index] = node }}
                  onClick={() => api?.scrollTo(index)}
                >
                  <span className={clsx(styles.thumbFrame, orientationClass(item))}>
                    <ThumbFrame item={item} />
                  </span>
                  <span className={styles.thumbNum}>{String(index + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
            <CarouselNext className={styles.navBtn} aria-label="Next media" />
            <span className={styles.index} aria-live="polite">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(media.length).padStart(2, '0')}
            </span>
          </div>
        )}
      </Carousel>

      {expanded && expanded.type === 'image' && createPortal(
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={expanded.alt}
          onClick={() => setExpandedIndex(null)}
        >
          <div className={styles.lightboxPanel} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setExpandedIndex(null)}
              aria-label="Close large preview"
            >
              CLOSE
            </button>
            <Image
              className={styles.lightboxImg}
              src={expanded.src}
              alt={expanded.alt}
              width={expanded.orientation === 'portrait' ? 720 : 1280}
              height={expanded.orientation === 'portrait' ? 1280 : 720}
              draggable={false}
            />
            {expanded.caption ? (
              <p className={styles.lightboxCaption}>{expanded.caption}</p>
            ) : (
              <p className={styles.lightboxCaption}>{expanded.alt}</p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
