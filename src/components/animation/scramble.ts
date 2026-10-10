import gsap from 'gsap'

export const SCRAMBLE_CHARS = {
  title: '._:+*#01XYZ',
  label: '01<>[]{}',
  code: 'abcdef0123456789',
  soft: '.:-+*',
  braille: '⠂⠆⠒⠲⠶⠿',
} as const

export type ScramblePattern = keyof typeof SCRAMBLE_CHARS

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
