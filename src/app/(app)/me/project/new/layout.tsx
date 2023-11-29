import { ReactNode } from 'react'
import { SidebarNavigation } from './components/sidebar-navigation'
import { TrackSelectedStepContextProvider } from './contexts/track-selected-step-context'

export const NEW_PROJECT_COOKIES_ID = '@devxperience:new-project-id'

export default async function NewProjectLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="grid grid-cols-[minmax(16rem,25.75rem)_minmax(31rem,1fr)] gap-6 page-container">
      <TrackSelectedStepContextProvider>
        <SidebarNavigation />

        {children}
      </TrackSelectedStepContextProvider>
    </div>
  )
}
