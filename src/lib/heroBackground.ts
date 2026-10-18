import { HERO_BG_STORAGE_KEY, heroBackgrounds } from '@/content/site/hero'

/** <head> のスクリプトが選んだ画像を書いておく <html> の data 属性（data-hero-bg） */
const PICKED_ATTR = 'heroBg'

/**
 * Hero 右パネルの背景画像を選ぶスクリプト。layout の <head> に直接書き、HTML の読み込み中に実行する。
 * 直前の訪問と同じ画像を避けてランダムに 1 枚選び、すぐに先読みを始める。
 * 選んだ画像は <html> の --hero-bg-image に入れるので、React の準備を待たずにパネルに表示できる
 * （画像を JS で選んでから読み込むと、表示が遅れて LCP が悪くなるため）。
 */
export const heroBackgroundScript = `(function () {
  var list = ${JSON.stringify(heroBackgrounds)};
  var key = ${JSON.stringify(HERO_BG_STORAGE_KEY)};
  var last = -1;
  try { last = parseInt(localStorage.getItem(key) || '-1', 10); } catch (e) {}
  var i = Math.floor(Math.random() * list.length);
  if (i === last) i = (i + 1 + Math.floor(Math.random() * (list.length - 1))) % list.length;
  try { localStorage.setItem(key, String(i)); } catch (e) {}
  var src = list[i];
  var root = document.documentElement;
  root.dataset.${PICKED_ATTR} = src;
  root.style.setProperty('--hero-bg-image', 'url(' + src + ')');
  var link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);
})();`

/**
 * <head> のスクリプトが選んだ Hero の背景画像を返す。ローディング画面が同じ画像の読み込みを待つのに使う。
 * スクリプトが動かなかったときは 1 枚目を返す。ブラウザでだけ呼ぶこと。
 */
export function getHeroBackground(): string {
  return document.documentElement.dataset[PICKED_ATTR] ?? heroBackgrounds[0]
}
