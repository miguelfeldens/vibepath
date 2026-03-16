import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { QuizProvider } from '@/context/QuizContext'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vibepath.us'),
  title: 'VibePath — Discover Your Future',
  description:
    'Stop overthinking your major. Take a 7-question visual gut-check at vibepath.us and get your Identity Lookbook.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'VibePath — Discover Your Future',
    description:
      'Stop overthinking your major. Take a 7-question visual gut-check at vibepath.us and get your Identity Lookbook.',
    url: 'https://vibepath.us',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibePath — Discover Your Future',
    description:
      'Stop overthinking your major. Take a 7-question visual gut-check at vibepath.us and get your Identity Lookbook.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <QuizProvider>{children}</QuizProvider>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  )
}
