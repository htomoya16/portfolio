'use client'

import { useGSAP } from '@gsap/react'
import { animate, scrambleText } from 'animejs'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { type ReactNode, useEffect, useRef, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import CursorFollower from './CursorFollower'
import { SCRAMBLE_CHARS, type ScramblePattern } from './ScrambleText'

gsap.registerPlugin(ScrollTrigger)

const subscribeToHydration = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

/** Track in-progress scramble animations per element to allow mid-flight cancellation */
const activeAnims = new WeakMap<HTMLElement, ReturnType<typeof animate>>()

/** Cancel an active scramble and immediately restore the original text */
function cancelScramble(el: HTMLElement | null | undefined, text: string) {
  if (!el) return
  const prev = activeAnims.get(el)
  if (prev) {
    prev.pause()
    el.textContent = text
    activeAnims.delete(el)
  }
}

/** Lock element dimensions before scrambling to prevent layout shift */
function lockElSize(el: HTMLElement) {
  if (el.dataset.sizeLocked) return
  const rect = el.getBoundingClientRect()
  if (rect.width > 0 && rect.height > 0) {
    const computed = window.getComputedStyle(el).display
    if (computed === 'inline') {
      el.style.display = 'inline-block'
      el.style.minWidth = `${rect.width}px`
      el.style.minHeight = `${rect.height}px`
    } else if (computed === 'inline-block' || computed === 'inline-flex') {
      el.style.minWidth = `${rect.width}px`
      el.style.minHeight = `${rect.height}px`
    } else {
      // Block elements already occupy their available inline size.
      // Freezing min-width from getBoundingClientRect() inflates grid min-content
      // and can shift sibling columns, especially in the contact card grid.
      el.style.minHeight = `${rect.height}px`
    }
    el.dataset.sizeLocked = '1'
  }
}

/** Scramble one element via animejs (used for hover effects) */
function scrambleEl(
  el: HTMLElement,
  text: string,
  opts?: { chars?: string; pattern?: ScramblePattern; revealRate?: number; settleDuration?: number }
) {
  // Cancel any in-progress animation first
  cancelScramble(el, text)
  // Lock size to prevent layout shift during scramble
  lockElSize(el)
  el.textContent = text
  const anim = animate(el, {
    innerHTML: scrambleText({
      text,
      chars: opts?.chars ?? SCRAMBLE_CHARS[opts?.pattern ?? 'label'],
      revealRate: opts?.revealRate ?? 44,
      settleDuration: opts?.settleDuration ?? 360,
      from: 'left',
      override: '',
      perturbation: 0.45,
    }),
    onComplete: () => {
      el.textContent = text
      activeAnims.delete(el)
    },
  })
  activeAnims.set(el, anim)
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const isHydrated = useSyncExternalStore(subscribeToHydration, getClientSnapshot, getServerSnapshot)

  // ── Lenis smooth scroll ─────────────────────────────────────────────────
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, touchMultiplier: 0.85 })
    const update = (time: number) => { lenis.raf(time * 1000) }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(update)
    }
  }, [])

  // ── GSAP scroll / entrance animations ───────────────────────────────────
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      // Hero entrance
      gsap.set('.hero-content, .hero-visual, .hero-play-center, .hero-ticker', { autoAlpha: 0, y: 28 })
      gsap.set('.px-sprite, .hero-hp, .hero-label-100', { autoAlpha: 0, scale: 0.7, y: 16 })

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to('.hero-content', { autoAlpha: 1, y: 0, duration: 0.8 })
        .to('.hero-visual', { autoAlpha: 1, y: 0, duration: 0.75 }, '-=0.45')
        .to('.hero-hp, .hero-label-100', { autoAlpha: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.08 }, '-=0.2')
        .to('.px-sprite', { autoAlpha: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.08 }, '-=0.2')
        .to('.hero-play-center, .hero-ticker', { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 }, '-=0.15')

      // Section reveals
      gsap.utils.toArray<HTMLElement>('.about, .skills, .projects, .experience, .contact').forEach((section) => {
        const heading = section.querySelector('.section-head')
        const content = Array.from(section.children).filter(
          (c) => !c.classList.contains('atmo') && c !== heading
        )

        gsap.fromTo(
          heading,
          { autoAlpha: 0, y: 48, rotateX: -28, transformPerspective: 800 },
          { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.95, ease: 'power4.out',
            scrollTrigger: { trigger: section, start: 'top 75%', once: true } }
        )
        gsap.fromTo(
          content,
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: section, start: 'top 66%', once: true } }
        )
      })

      // ct-stat bars: scroll-triggered initial fill
      gsap.utils.toArray<HTMLElement>('.ct-stat-row').forEach((row) => {
        const fill = row.querySelector<HTMLElement>('.ct-stat-bar-fill')
        const pct  = Number((row as HTMLElement).dataset.pct ?? 0)
        if (!fill) return
        gsap.fromTo(
          fill,
          { width: '0%' },
          { width: `${pct}%`, duration: 1.4, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%', once: true } }
        )
      })

      // Project card clip-path reveal
      gsap.fromTo(
        '.project-card',
        { autoAlpha: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
        { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.85, ease: 'power3.out',
          stagger: 0.14, scrollTrigger: { trigger: '.projects-grid', start: 'top 75%', once: true } }
      )

      // Experience node + card reveal
      gsap.fromTo(
        '.exp-node',
        { autoAlpha: 0, scale: 0 },
        { autoAlpha: 1, scale: 1, duration: 0.38, ease: 'back.out(2.5)',
          stagger: 0.12, scrollTrigger: { trigger: '.exp-list', start: 'top 78%', once: true } }
      )
      gsap.fromTo(
        '.exp-card',
        { autoAlpha: 0, x: -44, clipPath: 'inset(0 100% 0 0)' },
        { autoAlpha: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.65, ease: 'power3.out',
          stagger: 0.12, scrollTrigger: { trigger: '.exp-list', start: 'top 78%', once: true } }
      )

      // Skill tile reveal
      gsap.fromTo(
        '.sk-tile',
        { autoAlpha: 0, y: 24, clipPath: 'inset(100% 0 0 0)' },
        { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.55, ease: 'power2.out',
          stagger: 0.04, scrollTrigger: { trigger: '.skills', start: 'top 72%', once: true } }
      )

      // Skill level bars
      gsap.fromTo(
        '.sk-level-fill',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: 'power3.out',
          stagger: 0.035, scrollTrigger: { trigger: '.skills-list', start: 'top 76%', once: true } }
      )

      // Hero title 3D drop
      gsap.from('.hero-title .line', {
        autoAlpha: 0, y: -80, rotateX: -75, skewX: 12,
        transformPerspective: 800, transformOrigin: '50% 100%',
        duration: 0.95, ease: 'back.out(1.8)', stagger: 0.1, delay: 0.1,
      })

      // Hero ticker scroll boost
      gsap.to('.hero-ticker-inner', {
        x: '-=200',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      })

      // Hero sprites scroll parallax
      gsap.utils.toArray<HTMLElement>('.px-sprite').forEach((sprite, i) => {
        gsap.to(sprite, {
          y: (i % 2 === 0 ? -1 : 1) * 60,
          rotate: (i % 2 === 0 ? -1 : 1) * 8,
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
        })
      })
      gsap.to('.px-controller', {
        y: -40, rotate: -1,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.4 },
      })

      // Skill counter-up
      gsap.utils.toArray<HTMLElement>('.sk-cat-count').forEach((el) => {
        const match = el.textContent?.match(/\d+/)
        if (!match) return
        const target = parseInt(match[0], 10)
        const suffix = el.textContent?.replace(/^\d+\s*/, '') || ''
        const counter = { val: 0 }
        gsap.to(counter, {
          val: target, duration: 1.6, ease: 'power2.out', snap: { val: 1 },
          onUpdate: () => { el.textContent = `${String(counter.val).padStart(2, '0')} ${suffix}` },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      })

      // Section divider draw
      gsap.utils.toArray<HTMLElement>('.about, .skills, .projects, .experience, .contact').forEach((section) => {
        gsap.fromTo(
          section,
          { '--divider-scale': 0 },
          { '--divider-scale': 1, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 15%', scrub: 1 } }
        )
      })

      // ── Idle atmo + bg-decor animations ──
      // Blob breathing
      gsap.utils.toArray<HTMLElement>('.atmo-blob').forEach((blob, i) => {
        gsap.to(blob, {
          scale: 1.18, opacity: '+=0.08',
          duration: gsap.utils.random(4, 7), repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.4,
        })
      })

      // ── Atmo parallax: scroll-driven subtle movement ──
      gsap.utils.toArray<HTMLElement>('section').forEach((section) => {
        const blobs = section.querySelectorAll<HTMLElement>('.atmo-blob')
        if (blobs.length) {
          gsap.to(blobs, {
            yPercent: -16,
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
          })
        }
      })

      // bg-decor SVG decorations — subtle rotation + y shift per section
      gsap.utils.toArray<HTMLElement>('section').forEach((section, i) => {
        const decors = section.querySelectorAll<HTMLElement>('.bg-decor')
        decors.forEach((d, j) => {
          const dir = (i + j) % 2 === 0 ? 1 : -1
          gsap.to(d, {
            yPercent: dir * 14,
            rotate: dir * 18,
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.8 },
          })
        })
      })

      // atmo-grid background pan
      gsap.utils.toArray<HTMLElement>('.atmo-grid').forEach((grid) => {
        gsap.to(grid, {
          backgroundPosition: '+=80px +=80px',
          ease: 'none',
          scrollTrigger: { trigger: grid.closest('section') ?? grid, start: 'top bottom', end: 'bottom top', scrub: 0.9 },
        })
      })
    },
    { scope: rootRef }
  )

  // ── Magnetic buttons ─────────────────────────────────────────────────────
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const buttons = root.querySelectorAll<HTMLElement>('.btn-primary, .hero-play-center')
    const cleaners: Array<() => void> = []

    buttons.forEach((btn) => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.3, ease: 'power3.out' })
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.3, ease: 'power3.out' })
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35)
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35)
      }
      const onLeave = () => { xTo(0); yTo(0) }
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
      cleaners.push(() => { btn.removeEventListener('mousemove', onMove); btn.removeEventListener('mouseleave', onLeave) })
    })

    return () => cleaners.forEach((fn) => fn())
  }, [])

  // ── 3D tilt (project cards & ct-cards only — stable, no layout jitter) ──
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    // 3D tilt は project-card のみ。
    // ct-card に transformPerspective を適用すると子要素の getBoundingClientRect() が
    // perspective-distorted な値を返し lockElSize が誤った min-width を設定する。
    // また quickTo(el, 'rotateX') は resetTo を内部で呼ぶが composite transform には
    // 対応していない → gsap.to + overwrite:'auto' に統一して警告も解消。
    const cards = root.querySelectorAll<HTMLElement>('.project-card')
    const cleaners: Array<() => void> = []

    cards.forEach((card) => {
      gsap.set(card, { transformPerspective: 900, transformStyle: 'preserve-3d' })

      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        gsap.to(card, {
          rotateX: -((e.clientY - r.top) / r.height - 0.5) * 8,
          rotateY:  ((e.clientX - r.left) / r.width - 0.5) * 10,
          duration: 0.45, ease: 'power3.out', overwrite: 'auto',
        })
      }
      const onLeave = () => {
        gsap.to(card, {
          rotateX: 0, rotateY: 0,
          duration: 0.45, ease: 'power3.out', overwrite: 'auto',
        })
      }
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      cleaners.push(() => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) })
    })

    return () => cleaners.forEach((fn) => fn())
  }, [])

  // ── Hover-triggered scramble effects ────────────────────────────────────
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const cleaners: Array<() => void> = []

    // hero-hp → scramble label + num, animate bar fill
    const hpEl = root.querySelector<HTMLElement>('.hero-hp')
    if (hpEl) {
      const hpLabel = hpEl.querySelector<HTMLElement>('.hp-label')
      const hpNum   = hpEl.querySelector<HTMLElement>('.hp-num')
      const hpFill  = hpEl.querySelector<HTMLElement>('.hp-fill')
      const hpLabelText = 'HP'
      const hpNumText   = '83'
      const onEnter = () => {
        if (hpLabel) scrambleEl(hpLabel, hpLabelText, { pattern: 'braille' })
        if (hpNum)   scrambleEl(hpNum, hpNumText, { pattern: 'label' })
        if (hpFill)  gsap.fromTo(hpFill, { width: '0%' }, { width: '83%', duration: 0.9, ease: 'power3.out' })
      }
      const onLeave = () => {
        cancelScramble(hpLabel, hpLabelText)
        cancelScramble(hpNum,   hpNumText)
      }
      hpEl.addEventListener('pointerenter', onEnter)
      hpEl.addEventListener('pointerleave', onLeave)
      cleaners.push(() => {
        hpEl.removeEventListener('pointerenter', onEnter)
        hpEl.removeEventListener('pointerleave', onLeave)
      })
    }

    // sk-cat-head → scramble sk-cat-title
    root.querySelectorAll<HTMLElement>('.sk-cat-head').forEach((head) => {
      const title = head.querySelector<HTMLElement>('.sk-cat-title')
      if (!title) return
      const text = title.textContent?.trim() || ''
      const onEnter = () => scrambleEl(title, text, { pattern: 'title' })
      const onLeave = () => cancelScramble(title, text)
      head.addEventListener('pointerenter', onEnter)
      head.addEventListener('pointerleave', onLeave)
      cleaners.push(() => {
        head.removeEventListener('pointerenter', onEnter)
        head.removeEventListener('pointerleave', onLeave)
      })
    })

    // sk-tile にカーソルが入ったら sk-tile-name を scramble（親要素でトリガー）
    // ScrambleText は replayOnHover=false なので二重発火しない
    root.querySelectorAll<HTMLElement>('.sk-tile').forEach((tile) => {
      const name = tile.querySelector<HTMLElement>('.sk-tile-name')
      if (!name) return
      const text = name.textContent?.trim() || ''
      const onEnter = () => scrambleEl(name, text, { pattern: 'soft', revealRate: 48, settleDuration: 280 })
      const onLeave = () => cancelScramble(name, text)
      tile.addEventListener('pointerenter', onEnter)
      tile.addEventListener('pointerleave', onLeave)
      cleaners.push(() => {
        tile.removeEventListener('pointerenter', onEnter)
        tile.removeEventListener('pointerleave', onLeave)
      })
    })

    // exp-card → scramble exp-date + exp-badge
    root.querySelectorAll<HTMLElement>('.exp-card').forEach((card) => {
      const date  = card.querySelector<HTMLElement>('.exp-date')
      const badge = card.querySelector<HTMLElement>('.exp-badge')
      // Capture originals BEFORE any animation runs
      const dateText  = date?.textContent?.trim()  || ''
      const badgeText = badge?.textContent?.trim() || ''
      const onEnter = () => {
        if (date)  scrambleEl(date,  dateText,  { pattern: 'code', revealRate: 28 })
        if (badge) scrambleEl(badge, badgeText, { pattern: 'braille', revealRate: 36 })
      }
      const onLeave = () => {
        cancelScramble(date,  dateText)
        cancelScramble(badge, badgeText)
      }
      card.addEventListener('pointerenter', onEnter)
      card.addEventListener('pointerleave', onLeave)
      cleaners.push(() => {
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('pointerleave', onLeave)
      })
    })

    // ct-stat-row → scramble label + num, animate bar
    root.querySelectorAll<HTMLElement>('.ct-stat-row').forEach((row) => {
      const label   = row.querySelector<HTMLElement>('.ct-stat-label')
      const num     = row.querySelector<HTMLElement>('.ct-stat-num')
      const barFill = row.querySelector<HTMLElement>('.ct-stat-bar-fill')
      const pct = Number(row.dataset.pct ?? 0)
      const labelText = label?.textContent?.trim() || ''
      const numText   = num?.textContent?.trim()   || ''
      const onEnter = () => {
        if (label)   scrambleEl(label,   labelText, { pattern: 'braille', revealRate: 40 })
        if (num)     scrambleEl(num,     numText,   { pattern: 'code', revealRate: 28 })
        if (barFill) gsap.fromTo(barFill, { width: '0%' }, { width: `${pct}%`, duration: 0.9, ease: 'power3.out' })
      }
      const onLeave = () => {
        cancelScramble(label, labelText)
        cancelScramble(num,   numText)
      }
      row.addEventListener('pointerenter', onEnter)
      row.addEventListener('pointerleave', onLeave)
      cleaners.push(() => {
        row.removeEventListener('pointerenter', onEnter)
        row.removeEventListener('pointerleave', onLeave)
      })
    })

    // ct-card → scramble ct-card-label
    root.querySelectorAll<HTMLElement>('.ct-card').forEach((card) => {
      const label = card.querySelector<HTMLElement>('.ct-card-label')
      if (!label) return
      const text = label.textContent?.trim() || ''
      const onEnter = () => scrambleEl(label, text, { pattern: 'soft', revealRate: 42, settleDuration: 300 })
      const onLeave = () => cancelScramble(label, text)
      card.addEventListener('pointerenter', onEnter)
      card.addEventListener('pointerleave', onLeave)
      cleaners.push(() => {
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('pointerleave', onLeave)
      })
    })

    // nav links → scramble on hover
    root.querySelectorAll<HTMLElement>('.nav ul a').forEach((link) => {
      const text = link.textContent?.trim() || ''
      const onEnter = () => scrambleEl(link, text, { pattern: 'braille', revealRate: 52, settleDuration: 260 })
      const onLeave = () => cancelScramble(link, text)
      link.addEventListener('pointerenter', onEnter)
      link.addEventListener('pointerleave', onLeave)
      cleaners.push(() => {
        link.removeEventListener('pointerenter', onEnter)
        link.removeEventListener('pointerleave', onLeave)
      })
    })

    // nav logo → hover で青くなる + scramble（enter 時のみ）
    const logoEl = root.querySelector<HTMLElement>('.nav .logo')
    if (logoEl) {
      const logoText = logoEl.textContent?.trim() || ''
      let logoLastEnter = 0
      const LOGO_COOLDOWN = 700 // scramble 中の DOM 変化で pointerenter が再発火するのを防ぐ
      const onEnter = () => {
        const now = Date.now()
        if (now - logoLastEnter < LOGO_COOLDOWN) return
        logoLastEnter = now
        scrambleEl(logoEl, logoText, { pattern: 'title', revealRate: 38, settleDuration: 440 })
        gsap.to(logoEl, {
          color: 'var(--blue)',
          textShadow: '0 0 18px rgba(67,103,255,0.7)',
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
      const onLeave = () => {
        // cancelScramble しない — 自然完走させる
        // cancelScramble すると即停止→クールダウン中に再 enter しても弾かれて動かなくなる
        gsap.to(logoEl, {
          color: 'var(--ink)',
          textShadow: 'none',
          duration: 0.5,
          delay: 0.2,
          ease: 'power2.in',
          overwrite: 'auto',
        })
      }
      // クリック時だけ即キャンセル
      const onDown = () => cancelScramble(logoEl, logoText)
      logoEl.addEventListener('pointerenter', onEnter)
      logoEl.addEventListener('pointerleave', onLeave)
      logoEl.addEventListener('pointerdown', onDown)
      cleaners.push(() => {
        logoEl.removeEventListener('pointerenter', onEnter)
        logoEl.removeEventListener('pointerleave', onLeave)
        logoEl.removeEventListener('pointerdown', onDown)
      })
    }

    // hero-title ホバー → 3ワードを stagger で scramble
    const heroTitleEl = root.querySelector<HTMLElement>('.hero-title')
    if (heroTitleEl) {
      // ScrambleText が描画した span を取得し、初期テキストを保持
      const wordSpans = Array.from(
        heroTitleEl.querySelectorAll<HTMLElement>('.line > span:not(.caret)')
      )
      const wordTexts = wordSpans.map((s) => s.textContent?.trim() || '')
      let heroLastEnter = 0
      const HERO_COOLDOWN = 800

      const timers: ReturnType<typeof setTimeout>[] = []
      const onEnter = () => {
        const now = Date.now()
        if (now - heroLastEnter < HERO_COOLDOWN) return
        heroLastEnter = now
        timers.forEach(clearTimeout)
        timers.length = 0
        wordSpans.forEach((span, i) => {
          timers.push(
            setTimeout(() => scrambleEl(span, wordTexts[i], { pattern: 'title', revealRate: 30, settleDuration: 520 }), i * 90)
          )
        })
      }
      heroTitleEl.addEventListener('pointerenter', onEnter)
      cleaners.push(() => {
        timers.forEach(clearTimeout)
        heroTitleEl.removeEventListener('pointerenter', onEnter)
      })
    }

    return () => cleaners.forEach((fn) => fn())
  }, [])

  // ── AnimeJS micro-bounce on tile/card enter ───────────────────────────
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const targets = root.querySelectorAll<HTMLElement>('.sk-tile')
    const cleaners: Array<() => void> = []

    const handleEnter = (event: Event) => {
      animate(event.currentTarget as HTMLElement, {
        translateY: [-2, -6, -3],
        scale: [1, 1.02, 1.005],
        duration: 380,
        ease: 'out(3)',
      })
    }
    targets.forEach((t) => {
      t.addEventListener('pointerenter', handleEnter)
      cleaners.push(() => t.removeEventListener('pointerenter', handleEnter))
    })

    return () => cleaners.forEach((fn) => fn())
  }, [])

  // ParticleField / CursorFollower を rootRef の外に置く。
  // React Portal で ParticleField / CursorFollower を document.body 直下に描画する。
  // html { background-attachment: fixed } や祖先の CSS transform / will-change による
  // position:fixed の固定解除を完全に回避するための最も確実な手段。
  return (
    <>
      {isHydrated && createPortal(<CursorFollower />, document.body)}
      <div ref={rootRef}>
        {children}
      </div>
    </>
  )
}
