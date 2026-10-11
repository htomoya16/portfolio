import { HERO_BG_STORAGE_KEY, heroBackgrounds } from '@/content/site/hero'

let picked: string | null = null

/**
 * Hero 右パネルの背景画像を 1 枚選ぶ（直前の訪問と同じものは避ける）。
 * ページの読み込みごとに 1 回だけ決め、以降は同じ値を返す。
 * ローディング画面がこの画像を先読みし、Hero が同じ画像を表示するため。
 * localStorage を使うのでブラウザでだけ呼ぶこと。
 */
export function pickHeroBackground(): string {
  if (picked) return picked

  let last = -1
  try {
    last = Number.parseInt(localStorage.getItem(HERO_BG_STORAGE_KEY) ?? '-1', 10)
  } catch {
    // localStorage が使えない環境ではランダムのみで決める
  }
  let i = Math.floor(Math.random() * heroBackgrounds.length)
  if (i === last) {
    i = (i + 1 + Math.floor(Math.random() * (heroBackgrounds.length - 1))) % heroBackgrounds.length
  }
  try {
    localStorage.setItem(HERO_BG_STORAGE_KEY, String(i))
  } catch {
    // 保存できなくても表示自体には影響しない
  }

  picked = heroBackgrounds[i]
  return picked
}
