'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { scrollToSection } from '@/lib/scrollToSection'
import { resetScreenFx, setNesFx } from '@/lib/screenFx'
import CommandPalette from './CommandPalette'
import styles from './Negi.module.css'
import { PET_LAYER_ID } from './petLayer'
import { CH, CW, framePos, type PetAnim, ROWS, spriteStyle } from './petSprite'

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'] as const
/** このセクションを見ている間は、ネギが画面左下から覗く。 */
const PEEK_LEFT_SECTIONS = ['about', 'projects', 'contact']
const KONAMI =
  'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a'

type Props = {
  /** スプライトの拡大率（0.5〜1.2）。 */
  petScale?: number
  /** idle 中にふらふら歩き回るか。 */
  wander?: boolean
  /** 歩き回る距離の目安（px）。 */
  wanderRange?: number
}

type State = {
  mounted: boolean
  active: string
  negiAway: boolean
  w: number
}

type Drag = {
  sx: number
  sy: number
  ox: number
  oy: number
  moved: boolean
  lastX: number
  lastY?: number
  out?: boolean
  sg?: number
  ax?: 'x' | 'y'
  flips?: number[]
  shaken?: number
}

/**
 * ピクセルペット「ネギ」。Hero の右パネルを歩き回り、ドラッグや連打に反応する。
 * 画面外へ放り出すと、ほかのセクションの隅から覗き込む。コナミコマンドとコマンドパレットの隠し要素も持つ。
 */
export default class NegiSystem extends React.Component<Props, State> {
  state: State = {
    mounted: false,
    active: 'hero',
    negiAway: false,
    w: 0,
  }

  layerRef = React.createRef<HTMLDivElement>()
  walkerRef = React.createRef<HTMLDivElement>()
  spriteRef = React.createRef<HTMLDivElement>()
  peekRef = React.createRef<HTMLDivElement>()
  konamiRef = React.createRef<HTMLDivElement>()
  konamiSpriteRef = React.createRef<HTMLDivElement>()

  anim: PetAnim = 'idle'
  frame = 0
  x = 0
  y = 0
  target = 0
  loops = 0
  oneShot: number | null = null
  drag: Drag | null = null
  placed = false
  walkOff = false
  reduced = false
  clicks = 0

  private timer?: ReturnType<typeof setInterval>
  private konamiRunning = false
  private keyQueue: string[] = []
  private lastClickAt = 0
  private peekFrame = 0
  private smallScreen?: boolean

  // ---------------------------------------------------------------- geometry

  scale() {
    return this.props.petScale ?? 0.8
  }
  range() {
    return this.props.wanderRange ?? 90
  }
  size(): [number, number] {
    const s = this.scale()
    return [Math.round(CW * s), Math.round(CH * s)]
  }

  bounds(y: number) {
    const L = this.layerRef.current
    if (!L) return null
    const W = L.clientWidth
    const H = L.clientHeight
    const [pw, ph] = this.size()
    const st = window.innerWidth <= 900
    const minY = st ? 0.14 * H + 6 : 84
    const maxY = Math.max(minY, H - 44 - 14 - ph)
    const yy = Math.min(maxY, Math.max(minY, y))
    const minX = st ? 6 : 0.12 * W * (1 - yy / H) + 6
    const maxX = Math.max(minX, W - pw - (window.innerWidth <= 720 ? 12 : 64))
    return { minX, maxX, y: yy }
  }

  clamp() {
    const b = this.bounds(this.y)
    if (!b) return
    this.y = b.y
    this.x = Math.min(b.maxX, Math.max(b.minX, this.x))
  }

  place() {
    if (this.state.negiAway) return
    const L = this.layerRef.current
    const w = this.walkerRef.current
    if (!L || !w || !L.clientWidth) return
    const [pw, ph] = this.size()
    this.x = L.clientWidth * 0.54 - pw / 2
    this.y = L.clientHeight * 0.5 - ph / 2
    this.clamp()
    this.placed = true
    w.style.visibility = 'visible'
    this.draw()
  }

  // ------------------------------------------------------------- easter eggs

  konami() {
    const el = this.konamiRef.current
    const sp = this.konamiSpriteRef.current
    if (!el || !sp || this.konamiRunning) return
    this.konamiRunning = true
    setNesFx(true)
    el.style.display = 'block'
    const W = window.innerWidth
    const H = window.innerHeight
    const t0 = performance.now()
    const D = 3600
    let lf = 0
    let f = 0

    const step = (t: number) => {
      const p = (t - t0) / D
      if (p >= 1) {
        el.style.display = 'none'
        setNesFx(false)
        this.konamiRunning = false
        return
      }
      const fwd = p < 0.5
      const q = fwd ? p * 2 : (p - 0.5) * 2
      const x = fwd ? -150 + q * (W + 300) : W + 150 - q * (W + 300)
      const y = (fwd ? H * 0.62 : H * 0.3) - Math.abs(Math.sin(q * Math.PI * 5)) * 60
      el.style.transform = `translate(${x}px,${y}px)`
      if (t - lf > 80) {
        lf = t
        f = (f + 1) % (fwd ? 6 : 8)
      }
      sp.style.backgroundPosition = framePos(f, fwd ? 7 : 2)
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  // ------------------------------------------------------------- pet control

  set(anim: PetAnim, oneShot?: number) {
    this.anim = anim
    this.frame = 0
    this.loops = 0
    this.oneShot = oneShot ?? null
  }

  tick = () => {
    const pk = this.peekRef.current
    if (pk) {
      this.peekFrame = (this.peekFrame + 1) % 8
      pk.style.backgroundPosition = framePos(Math.floor(this.peekFrame / 2), 3)
    }
    if (!this.placed) this.place()
    if (this.reduced && !this.drag) return

    const n = ROWS[this.anim][1]
    this.frame++
    if (this.frame >= n) {
      this.frame = 0
      this.loops++
      this.onLoopEnd()
    }

    if (this.walkOff && !this.drag) {
      this.x += 7
      this.draw()
      const L = this.layerRef.current
      if (L && this.x > L.clientWidth + 20) {
        this.walkOff = false
        if (this.walkerRef.current) this.walkerRef.current.style.visibility = 'hidden'
        this.setState({ negiAway: true })
      }
      return
    }
    if (this.state.negiAway) return

    if (!this.drag && (this.anim === 'right' || this.anim === 'left')) {
      const step = 4
      const d = this.target - this.x
      if (Math.abs(d) <= step) {
        this.x = this.target
        this.set('idle')
      } else this.x += Math.sign(d) * step
      this.clamp()
    }
    this.draw()
  }

  onLoopEnd() {
    if (this.drag || this.walkOff || this.state.negiAway) return
    if (this.oneShot) {
      if (this.loops >= this.oneShot) this.set('idle')
      return
    }
    if (this.anim === 'idle' && this.loops >= 4) {
      const r = Math.random()
      const wander = this.props.wander ?? true
      if (wander && r < 0.4) {
        const b = this.bounds(this.y)
        if (!b) return
        const R = this.range()
        let t = this.x + (Math.random() < 0.5 ? -1 : 1) * (R * 0.5 + Math.random() * R * 0.5)
        t = Math.min(b.maxX, Math.max(b.minX, t))
        if (Math.abs(t - this.x) < 20) {
          this.loops = 0
          return
        }
        this.target = t
        this.set(t > this.x ? 'right' : 'left')
      } else if (r < 0.55) this.set('wait', 2)
      else if (r < 0.7) this.set('review', 2)
      else if (r < 0.82) this.set('run', 3)
      else if (r < 0.88) this.set('failed', 1)
      else this.loops = 0
    }
  }

  draw() {
    const s = this.spriteRef.current
    const w = this.walkerRef.current
    if (!s || !w) return
    s.style.backgroundPosition = framePos(this.frame, ROWS[this.anim][0])
    w.style.transform = `translate(${Math.round(this.x)}px, ${Math.round(this.y)}px)`
  }

  negiReturn = () => {
    this.setState({ negiAway: false })
    scrollToSection('hero')
    setTimeout(() => {
      const w = this.walkerRef.current
      const b = this.bounds(this.y)
      if (!w || !b) return
      this.x = b.maxX
      w.style.visibility = 'visible'
      this.target = (b.minX + b.maxX) / 2
      this.set('left')
      this.draw()
    }, 500)
  }

  // -------------------------------------------------------------- pointer io

  onPetDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    const w = this.walkerRef.current
    if (!w) return
    w.setPointerCapture(e.pointerId)
    w.style.cursor = 'grabbing'
    this.walkOff = false
    this.drag = { sx: e.clientX, sy: e.clientY, ox: this.x, oy: this.y, moved: false, lastX: e.clientX }
  }

  onPetMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = this.drag
    if (!d) return
    const dx = e.clientX - d.sx
    const dy = e.clientY - d.sy
    if (!d.moved && Math.hypot(dx, dy) < 4) return
    if (!d.moved) {
      d.moved = true
      this.set('jump')
    }
    this.x = d.ox + dx
    this.y = d.oy + dy
    this.clamp()
    const bb = this.bounds(this.y)
    d.out = !!bb && d.ox + dx > bb.maxX + 60

    const vx = e.clientX - d.lastX
    const vy = e.clientY - (d.lastY ?? e.clientY)
    const now = performance.now()
    const ax: 'x' | 'y' = Math.abs(vx) >= Math.abs(vy) ? 'x' : 'y'
    const v = ax === 'x' ? vx : vy
    if (Math.abs(v) > 6) {
      const sg = Math.sign(v)
      if (d.sg && d.ax === ax && sg !== d.sg) {
        d.flips = (d.flips || []).filter((t) => now - t < 900).concat(now)
      }
      d.sg = sg
      d.ax = ax
      if ((d.flips || []).length >= 4) d.shaken = now
    }
    if (d.shaken && now - d.shaken < 700) {
      if (this.anim !== 'failed') this.set('failed')
    } else if (Math.abs(vx) > 2) {
      const a: PetAnim = vx > 0 ? 'right' : 'left'
      if (this.anim !== a) this.set(a)
    }
    d.lastX = e.clientX
    d.lastY = e.clientY
    this.draw()
  }

  onPetUp = () => {
    const d = this.drag
    if (!d) return
    this.drag = null
    if (this.walkerRef.current) this.walkerRef.current.style.cursor = 'grab'
    if (d.shaken && performance.now() - d.shaken < 1200) {
      this.set('failed', 2)
      return
    }
    if (d.out) {
      this.walkOff = true
      this.set('right')
      return
    }
    if (!d.moved) {
      const now = Date.now()
      this.clicks = (now - this.lastClickAt < 1500 ? this.clicks : 0) + 1
      this.lastClickAt = now
      if (this.clicks >= 10) {
        this.clicks = 0
        this.set('failed', 1)
        return
      }
    }
    this.set('jump', 1)
  }

  onPetEnter = () => {
    if (!this.drag && (this.anim === 'idle' || this.anim === 'wait')) this.set('wave', 2)
  }

  callNegi = () => {
    if (!this.state.negiAway && !this.drag) this.set('wave', 2)
  }

  // ------------------------------------------------------------ global input

  onKey = (e: KeyboardEvent) => {
    // Escape と / はコマンドパレットが使う
    if (e.key === 'Escape' || e.key === '/') return
    const tag = (e.target as HTMLElement | null)?.tagName || ''
    if (tag === 'INPUT' || tag === 'TEXTAREA') return
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
    this.keyQueue = this.keyQueue.concat(k).slice(-10)
    if (this.keyQueue.join() === KONAMI) {
      this.keyQueue = []
      this.konami()
    }
  }

  onScroll = () => {
    let cur = 'hero'
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) cur = id
    }
    if (cur !== this.state.active) this.setState({ active: cur })
  }

  onResize = () => this.setState({ w: window.innerWidth })

  // ------------------------------------------------------------- lifecycle

  componentDidMount() {
    this.setState({ mounted: true, w: window.innerWidth })
    window.addEventListener('keydown', this.onKey)
    window.addEventListener('scroll', this.onScroll, { passive: true })
    window.addEventListener('resize', this.onResize)
    // eslint-disable-next-line no-console
    console.log('%cネギ「 / キーを押してみて」', 'color:#4367FF;font-family:monospace;font-size:14px')
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.timer = setInterval(this.tick, 130)
    this.place()
  }

  componentDidUpdate() {
    if (this.walkOff || this.state.negiAway) return
    const st = window.innerWidth <= 900
    if (this.smallScreen !== st) {
      this.smallScreen = st
      this.placed = false
    }
    if (!this.placed) this.place()
    else {
      this.clamp()
      this.draw()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKey)
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
    if (this.timer) clearInterval(this.timer)
    resetScreenFx()
  }

  // ---------------------------------------------------------------- render

  renderWalker() {
    const [pw, ph] = this.size()
    return (
      <div className={styles.layer} ref={this.layerRef}>
        <div
          ref={this.walkerRef}
          className={styles.walker}
          onPointerDown={this.onPetDown}
          onPointerMove={this.onPetMove}
          onPointerUp={this.onPetUp}
          onPointerCancel={this.onPetUp}
          onMouseEnter={this.onPetEnter}
          title="ネギ（ドラッグで移動）"
          style={{ width: pw, height: ph }}
        >
          <div className={styles.shadow} aria-hidden="true" />
          <div
            ref={this.spriteRef}
            className={styles.sprite}
            style={{ ...spriteStyle, backgroundPosition: '0 0', transform: `scale(${this.scale()})` }}
          />
        </div>
      </div>
    )
  }

  render() {
    const showPeek = this.state.negiAway && this.state.active !== 'hero'
    // 覗き込む側は表示中のセクションで決まる（本文と重ならない方に出す）。
    const peekLeftSide = PEEK_LEFT_SECTIONS.includes(this.state.active)
    const layerHost = this.state.mounted ? document.getElementById(PET_LAYER_ID) : null

    return (
      <>
        {layerHost ? createPortal(this.renderWalker(), layerHost) : null}

        {showPeek && (
          <button
            type="button"
            onClick={this.negiReturn}
            title="ネギ？（クリックで帰ってくる）"
            className={styles.peek}
            style={peekLeftSide ? { left: 32, right: 'auto' } : { left: 'auto', right: 72 }}
          >
            <div
              ref={this.peekRef}
              style={{ ...spriteStyle, backgroundPosition: framePos(0, 3), transform: 'scale(0.5)' }}
            />
          </button>
        )}

        <div ref={this.konamiRef} className={styles.konami} aria-hidden="true">
          <div
            ref={this.konamiSpriteRef}
            style={{ ...spriteStyle, backgroundPosition: '0 0', transform: 'scale(0.75)' }}
          />
        </div>

        <CommandPalette onCallNegi={this.callNegi} />
      </>
    )
  }
}
