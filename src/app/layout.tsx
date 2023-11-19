import './globals.css'
import '../libs/dayjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Dev Xperience',
    default: 'Dev Xperience',
  },
  description:
    'Dev Xperience App - Connecting Developers, Building Experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark font-sans antialiased ${inter.variable} scroll-smooth`}
    >
      <body className="scrollbar scrollbar-track-transparent scrollbar-thumb-secondary scrollbar-track-rounded-md scrollbar-thumb-rounded-md scrollbar-w-2">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
