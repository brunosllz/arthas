import { ReactNode } from 'react'
import { SideBar } from './components/side-bar'

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative grid grid-cols-[minmax(18.75rem,25rem)_1fr] gap-6">
      <SideBar />

      <div className="col-start-2">{children}</div>
    </div>
  )
}
