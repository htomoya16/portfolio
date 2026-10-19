'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image, { getImageProps } from 'next/image'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { ChevronLeftIcon, ChevronRightIcon, Maximize2Icon } from 'lucide-react'
import type { CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Project, ProjectMedia } from '@/content/site/projects'
import { getPrefersReducedMotion, usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
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
        // 表示中の動画は自動で再生する。音はユーザーが出すまで鳴らさない（一度出せば切り替えても保たれる）
        muted
        playsInline
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

/**
 * モーダルのスクロールガードが届けるホイール（CAROUSEL_WHEEL_EVENT）で、1 つずつ前後へ移る。
 * トラックパッドは1回のスワイプで大量の wheel イベントを送るため、
 * 一定量たまったら1回だけ進め、操作が止まるまで（または一定時間）次を受け付けない
 */
function listenWheelSteps(node: HTMLElement, onStep: (direction: 1 | -1) => void) {
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

    onStep(accumulated > 0 ? 1 : -1)
    accumulated = 0
    lockedAt = now
  }

  node.addEventListener(CAROUSEL_WHEEL_EVENT, handleWheel)
  return () => {
    clearTimeout(idleTimer)
    node.removeEventListener(CAROUSEL_WHEEL_EVENT, handleWheel)
  }
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
  const lightboxRef = useRef<HTMLDivElement | null>(null)
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null)
  // 拡大表示を開いている間は true。後ろのカルーセルの動画を再生しないようにする
  const lightboxOpenRef = useRef(false)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  // 拡大表示で前後の画像・動画へ移る。端まで行ったら反対側へ回る。
  // 閉じたときに同じものが見えているよう、後ろのカルーセルも合わせて動かしておく
  const stepExpanded = useCallback((direction: 1 | -1) => {
    if (expandedIndex === null || media.length < 2) return
    const next = (expandedIndex + direction + media.length) % media.length
    setExpandedIndex(next)
    api?.scrollTo(next, true)
  }, [api, expandedIndex, media.length])

  // 表示中の動画だけを再生し、ほかは止める。動きを減らす設定のときは自動では再生しない
  const syncVideos = useCallback((activeIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (lightboxOpenRef.current || index !== activeIndex) {
        video.pause()
      } else if (!getPrefersReducedMotion()) {
        // 再生できなかったとき（読み込み失敗など）はコントロールから手動で再生してもらう
        video.play().catch(() => {})
      }
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
      syncVideos(current)
    }

    handleSelect()
    api.on('select', handleSelect)
    api.on('reInit', handleSelect)

    return () => {
      api.off('select', handleSelect)
      api.off('reInit', handleSelect)
    }
  }, [api, syncVideos])

  // 拡大表示の動画は、カルーセルで見ていた位置と音の設定（ミュート・音量）を引き継いで再生する。
  // 閉じたり前後へ移ったりしたら、見たところまでの位置と音の設定をカルーセルの動画へ戻す
  useEffect(() => {
    if (expandedIndex === null || media[expandedIndex]?.type !== 'video') return
    const video = lightboxVideoRef.current
    const source = videoRefs.current[expandedIndex]
    if (!video) return
    if (source) {
      video.muted = source.muted
      video.volume = source.volume
      video.currentTime = source.currentTime
    }
    if (!getPrefersReducedMotion()) video.play().catch(() => {})
    return () => {
      video.pause()
      if (!source) return
      source.currentTime = video.currentTime
      source.muted = video.muted
      source.volume = video.volume
    }
  }, [expandedIndex, media])

  // 拡大表示を開いたら後ろの動画を止め、閉じたらカルーセルで表示中の動画の再生に戻す
  useEffect(() => {
    lightboxOpenRef.current = expandedIndex !== null
    if (expandedIndex !== null) {
      videoRefs.current.forEach((video) => video?.pause())
    } else if (api) {
      syncVideos(api.selectedScrollSnap())
    }
  }, [api, expandedIndex, syncVideos])

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

    // Esc で拡大表示だけを閉じ、← → で前後の画像へ移る。
    // 後ろのモーダルやカルーセルが同じキーで動かないよう、先に受け取って止める
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedIndex(null)
      // 動画を操作しているときは、← → を動画の早送り・巻き戻しに使う
      else if (event.target instanceof HTMLVideoElement) return
      else if (event.key === 'ArrowLeft') stepExpanded(-1)
      else if (event.key === 'ArrowRight') stepExpanded(1)
      else return
      event.preventDefault()
      event.stopPropagation()
    }

    window.addEventListener('keydown', handleKey, { capture: true })
    return () => {
      window.removeEventListener('keydown', handleKey, { capture: true })
    }
  }, [expandedIndex, stepExpanded])

  useEffect(() => {
    const node = rootRef.current
    if (!node || !api) return
    return listenWheelSteps(node, (direction) => {
      if (direction > 0) api.scrollNext()
      else api.scrollPrev()
    })
  }, [api])

  // 拡大表示でも、ホイールで前後の画像・動画へ移る。
  // stepExpanded は移るたびに作り直されるので、最新のものを ref から呼び、ホイールの受け付けは開いている間ずっと続ける
  const stepExpandedRef = useRef(stepExpanded)
  useEffect(() => {
    stepExpandedRef.current = stepExpanded
  }, [stepExpanded])
  const lightboxOpen = expandedIndex !== null
  useEffect(() => {
    const node = lightboxRef.current
    if (!lightboxOpen || !node) return
    return listenWheelSteps(node, (direction) => stepExpandedRef.current(direction))
  }, [lightboxOpen])

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
                      <>
                        <MediaFrame
                          item={item}
                          videoRef={(node) => { videoRefs.current[index] = node }}
                          priority={index === 0}
                          active={index === selectedIndex}
                        />
                        {/* 動画はクリックが再生・一時停止になるので、拡大は右上のボタンで開く */}
                        <button
                          type="button"
                          className={styles.expand}
                          onClick={() => setExpandedIndex(index)}
                          aria-label={`Open large preview: ${item.alt}`}
                        >
                          <Maximize2Icon aria-hidden="true" />
                        </button>
                      </>
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

      {expanded && createPortal(
        <div
          ref={lightboxRef}
          className={styles.lightbox}
          // モーダルのスクロールガードが、ここでのホイールを前後の移動に回す（useModalScroll）
          data-carousel-wheel
          role="dialog"
          aria-modal="true"
          aria-label={expanded.alt}
          onClick={() => setExpandedIndex(null)}
        >
          <div
            className={styles.lightboxPanel}
            onClick={(event) => event.stopPropagation()}
            // スマホでは左右のスワイプで前後の画像へ移る
            onTouchStart={(event) => {
              // 動画の上のスワイプは、再生位置の操作に使えるよう前後の移動にしない
              if (event.target instanceof HTMLVideoElement) {
                touchStartRef.current = null
                return
              }
              const touch = event.touches[0]
              touchStartRef.current = { x: touch.clientX, y: touch.clientY }
            }}
            onTouchEnd={(event) => {
              const start = touchStartRef.current
              touchStartRef.current = null
              if (!start) return
              const touch = event.changedTouches[0]
              const dx = touch.clientX - start.x
              const dy = touch.clientY - start.y
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) stepExpanded(dx < 0 ? 1 : -1)
            }}
          >
            <div className={styles.lightboxHeader}>
              {media.length > 1 && (
                <span className={styles.lightboxCount} aria-live="polite">
                  {String((expandedIndex ?? 0) + 1).padStart(2, '0')} / {String(media.length).padStart(2, '0')}
                </span>
              )}
              <button
                type="button"
                className={styles.lightboxClose}
                onClick={() => setExpandedIndex(null)}
                aria-label="Close large preview"
              >
                <span className={styles.lightboxCloseX} aria-hidden="true">×</span>
              </button>
            </div>
            <div className={styles.lightboxStage}>
              {expanded.type === 'video' ? (
                <video
                  key={expanded.src}
                  ref={lightboxVideoRef}
                  className={styles.lightboxImg}
                  src={expanded.src}
                  poster={getOptimizedPoster(expanded)}
                  controls
                  muted
                  playsInline
                  preload="auto"
                  aria-label={expanded.alt}
                />
              ) : (
                <Image
                  key={expanded.src}
                  className={styles.lightboxImg}
                  src={expanded.src}
                  alt={expanded.alt}
                  width={expanded.orientation === 'portrait' ? 720 : 1280}
                  height={expanded.orientation === 'portrait' ? 1280 : 720}
                  draggable={false}
                />
              )}
              {media.length > 1 && (
                <>
                  <button
                    type="button"
                    className={clsx(styles.lightboxNav, styles.lightboxPrev)}
                    onClick={() => stepExpanded(-1)}
                    aria-label="Previous preview"
                  >
                    <ChevronLeftIcon aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={clsx(styles.lightboxNav, styles.lightboxNext)}
                    onClick={() => stepExpanded(1)}
                    aria-label="Next preview"
                  >
                    <ChevronRightIcon aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
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
