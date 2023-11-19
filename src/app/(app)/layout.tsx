import { userIsBoard } from '@/actions/user-is-onboard'
import { Footer } from '@/components/footer'
import { FooterRoot } from '@/components/footer/footer-root'
import { Header } from '@/components/header'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function AppLayout({ children }: { children: ReactNode }) {
  const userIsBoarded = await userIsBoard()

  if (!userIsBoarded) {
    return redirect('/onboarding/step-1')
  }

  return (
    <>
      <Header />
      <main className="min-h-screen wrapper">{children}</main>

      <FooterRoot>
        <Footer />
      </FooterRoot>
    </>
  )
}
