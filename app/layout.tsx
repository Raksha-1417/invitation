import type { Metadata, Viewport } from 'next'
import { Cinzel, Cormorant_Garamond, Great_Vibes, Noto_Serif_Devanagari } from 'next/font/google'
import './globals.css'
import FallingFlowers from '@/components/FallingFlowers'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cinzel',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
  display: 'swap',
})

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600'],
  variable: '--font-noto-devanagari',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#7A2F4E', // Updated to Pink palette
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://invitation-zeta-ten.vercel.app'),
  title: 'Naveen & Shreya · 14 May 2026',
  description: "You're invited to our wedding. With the blessings of the Pattar family.",
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Naveen & Shreya · Wedding Invitation',
    description: "You're invited to our wedding. 14 May 2026, Belagavi.",
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${cormorant.variable} ${greatVibes.variable} ${notoDevanagari.variable} bg-cream`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-cream focus:text-ink focus:px-4 focus:py-2 focus:font-serif"
        >
          Skip to main content
        </a>
        {children}
        <FallingFlowers />
      </body>
    </html>
  )
}
