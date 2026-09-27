export const heroCopy = {
  eyebrow: 'NEW GAME+',
  titleLines: [
    { text: 'LEVEL UP', accent: true },
    { text: 'BACKEND', accent: false },
    { text: 'SKILLS', accent: false },
  ],
  subtitleLines: [
    'バックエンドを軸に、学び・実装・改善を積み重ねる。',
    'Webを支える仕組みを、粘り強く磨き続ける。',
    'Backend-focused Web Engineer',
  ],
  primaryCta: 'VIEW PROJECTS',
  playCta: 'PRESS START',
  scrollToAboutLabel: 'Scroll to about section',
  hpAriaLabel: 'HP bar',
  hpLabel: 'HP',
  hpValue: '83',
  visualPercent: '100%',
} as const

/**
 * Hero 右パネルの背景画像。訪問ごとにランダムで 1 枚選ぶ（直前と同じものは避ける）。
 */
export const heroBackgrounds = [
  '/assets/hero/hero-right.png',
  '/assets/hero/hero-right2.png',
  '/assets/hero/hero-right3.png',
] as const

/** 直前に表示した背景を覚えておく localStorage キー。 */
export const HERO_BG_STORAGE_KEY = 'htomoya-hero-bg'

/**
 * ティッカー本体。この並びの末尾にイースターエッグのヒントを挟んだものを
 * 1 単位として 2 回繰り返す（CSS 側が translateX(-50%) でループするため）。
 */
export const heroTickerItems = [
  { label: 'WEB ENGINEER', accent: false },
  { label: '// SERVER SIDE', accent: true },
  { label: 'KEEP GROWING', accent: false },
  { label: '// IMPROVING', accent: true },
  { label: 'BACKEND', accent: false },
  { label: '// REST API', accent: true },
  { label: 'CI / CD', accent: false },
  { label: '// DEPLOY & OPERATE', accent: true },
  { label: 'DATABASE', accent: false },
  { label: '// LEVEL UP', accent: true },
]

/** コナミコマンドと `/` キーのヒント。ティッカーに紛れ込ませる。 */
export const heroTickerHints = [
  { label: '↑↑↓↓←→←→BA', accent: true },
  { label: 'PRESS "/"', accent: true },
] as const

/** 実際に描画する並び。half を 2 回繰り返して -50% のループに合わせる。 */
export const heroTickerSequence = (() => {
  const half = [
    ...heroTickerItems,
    heroTickerHints[0],
    ...heroTickerItems,
    heroTickerHints[1],
  ]
  return [...half, ...half]
})()
