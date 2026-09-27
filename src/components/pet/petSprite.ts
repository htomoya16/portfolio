/**
 * ピクセルペット「ネギ」のスプライトシート定義。
 * シートは 8 列 × 9 行（1536 × 1872px）で、1 コマ 192 × 208px。
 */
export const SHEET_SRC = '/assets/pet/spritesheet.webp'
export const SHEET_W = 1536
export const SHEET_H = 1872
export const CW = 192
export const CH = 208

/** アニメーション名 → [行インデックス, コマ数] */
export const ROWS = {
  idle: [0, 6],
  right: [1, 8],
  left: [2, 8],
  wave: [3, 4],
  jump: [4, 5],
  failed: [5, 8],
  wait: [6, 6],
  run: [7, 6],
  review: [8, 6],
} as const satisfies Record<string, readonly [number, number]>

export type PetAnim = keyof typeof ROWS

/** background-position を組み立てる（コマ送り用）。 */
export function framePos(frame: number, row: number) {
  return `${-frame * CW}px ${-row * CH}px`
}

/** スプライト 1 枚分の共通スタイル。 */
export const spriteStyle = {
  width: CW,
  height: CH,
  backgroundImage: `url(${SHEET_SRC})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: `${SHEET_W}px ${SHEET_H}px`,
  transformOrigin: '0 0',
} as const
