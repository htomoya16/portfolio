import { getImageProps } from 'next/image'
import type { Project, ProjectMedia } from '@/content/site/projects'

/*
 * モーダルのカルーセルで使う画像の表示幅（next/image の sizes）。
 * カルーセル（後から読み込む）と、カードにカーソルを乗せたときの先読み（一覧と一緒に読み込む）の
 * 両方で同じ URL を使うよう、ここにまとめる
 */
export const MEDIA_SIZES = '(max-width: 760px) 100vw, 48vw'
export const MEDIA_BACKDROP_SIZES = '64px'
export const THUMB_SIZES = '120px'

/**
 * <video poster> は Next.js の画像最適化を通らず、元のファイル（900KB を超える PNG もある）を
 * そのまま読むため、最適化した画像の URL を作って渡す。
 * 表示枠の 2 倍程度の幅（横長 1200px / 縦長 750px）になるように指定している。
 */
export function getOptimizedPoster(item: ProjectMedia) {
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

/** next/image と同じ URL（srcset・sizes 込み）で画像を読み込み、デコードまで済ませておく */
function warmImage(src: string, sizes: string) {
  const { props } = getImageProps({ src, alt: '', fill: true, sizes })
  const img = new Image()
  if (props.sizes) img.sizes = props.sizes
  if (props.srcSet) img.srcset = props.srcSet
  img.src = props.src
  img.decode().catch(() => {})
}

const warmed = new Set<string>()

/**
 * モーダルを開いたときに最初に見える画像（1 枚目とその背景のぼかし、サムネイル）を先に読み込んでおく。
 * 初めて開くときは画像の読み込みとデコードで表示が遅れるため、カードにカーソルを乗せた時点で始める
 */
export function warmProjectMedia(project: Project) {
  if (warmed.has(project.num)) return
  warmed.add(project.num)
  const media = project.media ?? []
  const first = media[0]
  if (first?.type === 'image') {
    warmImage(first.src, MEDIA_SIZES)
    warmImage(first.src, MEDIA_BACKDROP_SIZES)
  } else if (first?.type === 'video') {
    const poster = getOptimizedPoster(first)
    if (poster) {
      const img = new Image()
      img.src = poster
      img.decode().catch(() => {})
    }
  }
  for (const item of media) {
    const thumb = item.type === 'video' ? item.poster : item.src
    if (thumb) warmImage(thumb, THUMB_SIZES)
  }
}
