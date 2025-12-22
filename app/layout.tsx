import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'کافه لوکس - تجربه‌ای فراموش‌نشدنی',
  description: 'کافه و رستوران لوکس با بهترین منوی کافه و فست فود، طراحی شیک و مدرن',
  keywords: 'کافه،رستوران،لوکس،منو،فست فود،قهوه،غذا',
  authors: [{ name: 'کافه لوکس' }],
  openGraph: {
    title: 'کافه لوکس',
    description: 'تجربه‌ای فراموش‌نشدنی در کافه و رستوران لوکس',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  )
}


