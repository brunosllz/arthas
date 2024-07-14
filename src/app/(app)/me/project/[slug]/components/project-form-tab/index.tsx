import { TrackSelectedStepContextProvider } from '../../../contexts/track-selected-step-context'

import { Forms } from './components/forms'
import { SidebarNavigation } from './components/sidebar-navigation'

type ProjectFormTabProps = {
  projectSlug: string
}

export function ProjectFormTab({ projectSlug }: ProjectFormTabProps) {
  return (
    <TrackSelectedStepContextProvider>
      <div className="grid grid-cols-[minmax(16rem,25.75rem)_minmax(31rem,1fr)] gap-6">
        <SidebarNavigation />

        <Forms projectSlug={projectSlug} />
      </div>
    </TrackSelectedStepContextProvider>
  )
}
