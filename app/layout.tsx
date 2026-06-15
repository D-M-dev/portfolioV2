import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://taco-system.dev'),
  title: {
    default: 'Taco_System — Roblox Luau Programmer & Gameplay Systems Developer',
    template: '%s | Taco_System',
  },
  description:
    'Portfolio of Taco_System, a Roblox Luau programmer specializing in scalable gameplay systems, performant multiplayer experiences and game architecture.',
  keywords: [
    'Roblox',
    'Luau',
    'Gameplay Systems',
    'Game Developer',
    'Multiplayer',
    'Roblox Studio',
    'Rojo',
    'Taco_System',
  ],
  authors: [{ name: 'Taco_System' }],
  creator: 'Taco_System',
  openGraph: {
    type: 'website',
    title: 'Taco_System — Roblox Luau Programmer & Gameplay Systems Developer',
    description:
      'I build scalable Roblox systems, gameplay mechanics and performant multiplayer experiences.',
    siteName: 'Taco_System',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taco_System — Roblox Luau Programmer',
    description:
      'I build scalable Roblox systems, gameplay mechanics and performant multiplayer experiences.',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
