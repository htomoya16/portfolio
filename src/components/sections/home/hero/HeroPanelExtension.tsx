'use client'

import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

/**
 * Hero 右パネルの斜めの辺を、すぐ下のセクションまで同じ傾きで延長し、辺より左を白く塗る。
 * 置いたセクションの背景の層（data-section-bg）として、背景（Atmo）より手前・本文より奥に重なる。
 */
export default function HeroPanelExtension() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const section = el?.parentElement
    const hero = document.getElementById('hero')
    const panel = hero?.querySelector<HTMLElement>('[data-hero-panel]')
    if (!el || !section || !hero || !panel) return

    // 辺の位置は、登場演出で動く transform の影響を受けないレイアウト上の大きさで求める
    const measure = () => {
      const slant = Number.parseFloat(getComputedStyle(panel).getPropertyValue('--panel-slant')) / 100
      if (!panel.offsetHeight || Number.isNaN(slant)) return
      // パネルの左辺は上端で幅の slant だけ右にあり、下端でパネルの左端に来る。この傾きのまま下へ伸ばす
      const slope = (slant * panel.offsetWidth) / panel.offsetHeight
      const gap = section.offsetTop - (hero.offsetTop + hero.offsetHeight)
      const top = panel.offsetLeft - slope * gap
      const bottom = top - slope * section.offsetHeight
      el.style.setProperty('--edge-top', `${top.toFixed(1)}px`)
      el.style.setProperty('--edge-bottom', `${bottom.toFixed(1)}px`)
    }

    const observer = new ResizeObserver(measure)
    observer.observe(panel)
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={styles.panelExtension} aria-hidden="true" data-section-bg />
}
