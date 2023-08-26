import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en" className="antialiased">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  )
}
