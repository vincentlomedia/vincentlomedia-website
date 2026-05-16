import type { Metadata } from 'next'
import { Anton, Barlow, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  // SEO_TITLE: 'Powerlifting Meet Photography & Video Packages | Vincent Lo Media'
  // SEO_DESC:  'Competition-day photos, static lift videos, and highlight reels. Shot by a competitive powerlifter. Packages from $15 CAD.'
  title: {
    default: 'Vincent Lo Media | Powerlifting Photography & Video',
    template: '%s | Vincent Lo Media',
  },
  description:
    'Powerlifting meet photography and video packages. Competition-day photos, static lift videos, and highlight reels shot by a competitive powerlifter. Packages from $15 CAD.',
  metadataBase: new URL('https://www.vincentlomedia.com'),
  icons: {
    icon: '/logo/watermark.png',
    apple: '/logo/watermark.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${barlow.variable} ${mono.variable}`}
    >
      <body className="font-sans bg-vlm-black text-white antialiased">{children}</body>
    </html>
  )
}
