import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Noto_Sans_JP, Press_Start_2P } from 'next/font/google'
import './globals.css'

const inter = Inter({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'htomoya16 — Web Engineer Portfolio',
  description: 'コードで、アイデアをカタチにして、ユーザーの体験をアップデートする。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJp.variable} ${jetBrainsMono.variable} ${pressStart2P.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
