/**
 * 画面全体にかける色のエフェクト（隠し要素）。
 * terminal: コマンドパレットの `theme` やロゴの連打で切り替える緑のターミナル風
 * nes: コナミコマンドの演出中だけかける色の強調
 */
const fx = { terminal: false, nes: false }

function apply() {
  const filters: string[] = []
  if (fx.terminal) {
    filters.push(
      'invert(1) hue-rotate(180deg) grayscale(1) sepia(1) hue-rotate(60deg) saturate(4) brightness(0.9)',
    )
  }
  if (fx.nes) filters.push('saturate(2.4) contrast(1.35)')
  document.documentElement.style.filter = filters.join(' ')
}

/** ターミナル風の表示を切り替え、切り替え後に有効かどうかを返す */
export function toggleTerminalFx() {
  fx.terminal = !fx.terminal
  apply()
  return fx.terminal
}

export function setNesFx(on: boolean) {
  fx.nes = on
  apply()
}

export function resetScreenFx() {
  fx.terminal = false
  fx.nes = false
  document.documentElement.style.filter = ''
}
