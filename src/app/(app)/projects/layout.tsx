import { ReactNode } from 'react'
import { SideBar } from './components/sidebar'

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative grid grid-cols-[minmax(18.75rem,25.75rem)_1fr] gap-3">
      <SideBar />

      <div className="col-start-2">{children}</div>
    </div>
  )
}
