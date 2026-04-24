import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Press_Start_2P, Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-jp',
})

export const metadata: Metadata = {
  title: 'Y /// Portfolio — Web Engineer',
  description: 'Web Engineer Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${pressStart2P.variable} ${notoSansJP.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
