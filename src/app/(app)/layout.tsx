import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="wrapper">{children}</main>
      <Footer />
    </div>
  )
}
