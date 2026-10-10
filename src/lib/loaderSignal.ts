/** ローディング画面が閉じ始めたことを知らせるイベント名。 */
const LOADER_DONE_EVENT = 'negi:loader-done'

let done = false

/** ローディング画面が閉じ始めたときに呼ぶ。Hero の登場アニメーションの合図になる。 */
export function markLoaderDone() {
  if (done) return
  done = true
  window.dispatchEvent(new Event(LOADER_DONE_EVENT))
}

/**
 * ローディング画面が閉じたら callback を呼ぶ。すでに閉じていればすぐ呼ぶ。
 * 戻り値は登録を解除する関数。
 */
export function onLoaderDone(callback: () => void): () => void {
  if (done) {
    callback()
    return () => {}
  }
  window.addEventListener(LOADER_DONE_EVENT, callback, { once: true })
  return () => window.removeEventListener(LOADER_DONE_EVENT, callback)
}
