import type Lenis from 'lenis'

let instance: Lenis | null = null

/** SmoothScroll が作った Lenis を登録する。破棄したら null を渡す */
export function setSmoothScroll(lenis: Lenis | null) {
  instance = lenis
}

/**
 * ページの固定を解いて元の位置へ戻したあと、Lenis にページの高さとスクロール位置を測り直させる。
 * 固定中はページの高さが画面 1 枚分になり、Lenis はスクロールできる量を 0 と覚える。
 * Lenis が高さを測り直すのは 250ms 遅れるため、その間にホイールが届くと 0 に切り詰められ、
 * ページの先頭へ戻ってしまう（閉じた直後のトラックパッドの慣性で起きやすい）。
 */
export function syncSmoothScroll() {
  instance?.resize()
}
