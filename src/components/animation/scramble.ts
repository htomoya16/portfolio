import gsap from 'gsap'

export const SCRAMBLE_CHARS = {
  title: '._:+*#01XYZ',
  label: '01<>[]{}',
  code: 'abcdef0123456789',
  soft: '.:-+*',
  braille: '⠂⠆⠒⠲⠶⠿',
} as const

export type ScramblePattern = keyof typeof SCRAMBLE_CHARS

/**
 * transform の影響を受けない要素の大きさ（padding・border を含む）を返す。
 * getBoundingClientRect は登場演出の回転・拡大などで変形した後の大きさを返すため、
 * そのまま使うと膨らんだ幅で固定してしまう。offsetWidth / offsetHeight は変形の影響を
 * 受けないが整数に丸められるので、差が 1px 未満（＝変形していない）なら小数の値を使う。
 */
function measureLayoutSize(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const pick = (measured: number, layout: number) => (Math.abs(measured - layout) < 1 ? measured : layout)
  return { width: pick(rect.width, el.offsetWidth), height: pick(rect.height, el.offsetHeight) }
}

/**
 * かき混ぜ中に文字幅が変わっても周りがずれないよう、要素の今の大きさで固定する。
 * getBoundingClientRect は padding・border を含む大きさを返すので、content-box の要素では
 * その分を引いて設定する（このサイトは Tailwind の preflight でほぼ border-box）。
 */
export function lockElSize(el: HTMLElement) {
  if (el.dataset.sizeLocked) return
  const rect = measureLayoutSize(el)
  if (rect.width <= 0 || rect.height <= 0) return

  const style = window.getComputedStyle(el)
  const px = (value: string) => Number.parseFloat(value) || 0
  const extraX = px(style.paddingLeft) + px(style.paddingRight) + px(style.borderLeftWidth) + px(style.borderRightWidth)
  const extraY = px(style.paddingTop) + px(style.paddingBottom) + px(style.borderTopWidth) + px(style.borderBottomWidth)
  const isBorderBox = style.boxSizing === 'border-box'
  const width = `${isBorderBox ? rect.width : rect.width - extraX}px`
  const height = `${isBorderBox ? rect.height : rect.height - extraY}px`

  if (style.display === 'inline') {
    // inline のままでは幅を固定できないため inline-block にする。
    // inline-block は中身を line-height（＋padding）の高さで並べるため、そのままだと要素が
    // 高くなって文字が下にずれ、ナビなどの行も広がる。高さを今の値で固定し、line-height を
    // inline のときの中身の高さ（padding・border を除いた高さ）にそろえる
    el.style.display = 'inline-block'
    el.style.minWidth = width
    el.style.height = height
    el.style.lineHeight = `${rect.height - extraY}px`
  } else if (style.display === 'inline-block' || style.display === 'inline-flex') {
    el.style.minWidth = width
    el.style.minHeight = height
  } else {
    // flex の子は block でも幅が中身で決まる。固定しないと空の文字から始まるときに幅が 0 まで縮み、
    // カーソルを置いたままでも pointerleave / pointerenter が起きて演出が再発火する（ナビのロゴ）
    const parentDisplay = el.parentElement ? window.getComputedStyle(el.parentElement).display : ''
    if (parentDisplay === 'flex' || parentDisplay === 'inline-flex') el.style.minWidth = width
    // それ以外のブロック要素は幅が親で決まる。min-width を固定すると grid の列幅が広がることがあるため高さだけ固定する
    el.style.minHeight = height
  }
  el.dataset.sizeLocked = '1'
}

/** 1秒あたりに記号を入れ替える回数（文字ごとに独立して入れ替える） */
const REFRESH_PER_SECOND = 32
/** 文字ごとの確定タイミングのばらつき（settleDuration に対する割合） */
const PERTURBATION = 0.45

type ScrambleOptions = {
  chars: string
  /** 開始までの待ち時間（ms）。この間は空にしておく */
  delay?: number
  /** 1秒あたりに現れる文字数。左から順に記号が増えていく */
  revealRate?: number
  /** 各文字が現れてから正しい文字に確定するまでの時間（ms） */
  settleDuration?: number
  onComplete?: () => void
}

/**
 * 空の状態から記号を左へ増やしていき、各文字を少しずつずらして正しい文字へ確定させる。
 * GSAP の ScrambleTextPlugin は「文字数分を一度にかき混ぜて左から確定する」動きしか作れず、
 * 記号が増えていく動きや文字ごとのばらつきを出せないため、GSAP のタイムライン上で
 * 文字列を毎フレーム組み立てる。
 */
export function scrambleText(
  el: HTMLElement,
  text: string,
  { chars, delay = 0, revealRate = 52, settleDuration = 420, onComplete }: ScrambleOptions,
) {
  const pool = Array.from(chars)
  const pick = () => pool[Math.floor(Math.random() * pool.length)]
  const target = Array.from(text)
  const settle = settleDuration / 1000
  const appearAt = target.map((_, i) => i / revealRate)
  const settleAt = appearAt.map((t) => t + settle * (1 + (Math.random() * 2 - 1) * PERTURBATION))
  const current = target.map(pick)
  const changedAt = target.map(() => 0)
  const total = Math.max(0, ...settleAt)
  const progress = { t: 0 }

  el.textContent = ''

  return gsap.to(progress, {
    t: total,
    duration: total,
    delay: delay / 1000,
    ease: 'none',
    onUpdate: () => {
      const t = progress.t
      let out = ''
      for (let i = 0; i < target.length; i++) {
        if (t < appearAt[i]) break
        const ch = target[i]
        // 空白はかき混ぜずにそのまま出す（単語の区切りが崩れないように）
        if (t >= settleAt[i] || ch.trim() === '') {
          out += ch
          continue
        }
        if (t - changedAt[i] >= 1 / REFRESH_PER_SECOND) {
          current[i] = pick()
          changedAt[i] = t
        }
        out += current[i]
      }
      if (el.textContent !== out) el.textContent = out
    },
    onComplete: () => {
      el.textContent = text
      onComplete?.()
    },
  })
}
