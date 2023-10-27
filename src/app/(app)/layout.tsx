import { Footer } from '@/components/footer'
import { FooterRoot } from '@/components/footer/footer-root'
import { Header } from '@/components/header'
import { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen wrapper">{children}</main>
      {/* <Footer /> */}

      <FooterRoot>
        <Footer />
      </FooterRoot>
    </>
  )
}
