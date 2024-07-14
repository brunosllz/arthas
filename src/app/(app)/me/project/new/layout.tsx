import { ReactNode } from 'react'
import { SidebarNavigation } from './components/sidebar-navigation'
import { TrackSelectedStepContextProvider } from '../contexts/track-selected-step-context'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const NEW_PROJECT_COOKIES_ID = '@devxperience:new-project-id'

export default async function NewProjectLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="space-y-6 page-container">
      <div className="flex items-center gap-1 pb-2">
        <Link
          href="/me/projects"
          className="text-sm text-muted-foreground transition-colors hover:text-zinc-300"
        >
          Projetos
        </Link>{' '}
        <ChevronRight size={14} className="text-zinc-500" />{' '}
        <span className="select-none text-sm text-zinc-300">Novo Projeto</span>
      </div>

      <div className="grid grid-cols-[minmax(16rem,25.75rem)_minmax(31rem,1fr)] gap-6 ">
        <TrackSelectedStepContextProvider>
          <SidebarNavigation />

          {children}
        </TrackSelectedStepContextProvider>
      </div>
    </div>
  )
}
