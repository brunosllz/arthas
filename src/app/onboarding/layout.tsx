import { useBoundStore } from '@/store'
import { addUserFromServerSideSession } from '@/store/slices/add-user-from-server-side-session'
import { InitializerOnboardingStore } from './components/initializer-onboarding-store'
import { Browser } from './components/browser'

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await addUserFromServerSideSession()
  const user = useBoundStore.getState().user
  return (
    <main className="wrapper">
      <>
        <InitializerOnboardingStore user={user} />
        <div className="grid grid-cols-[minmax(30rem,31.75rem)_1fr] gap-24 pb-8 pt-24">
          {children}

          <Browser />
        </div>
      </>
    </main>
  )
}