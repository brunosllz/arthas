import { ReactNode } from 'react'
import { SidebarNav } from './components/sidebar-nav'

const sidebarNavItems = [
  {
    title: 'Project',
    href: '/me/project/1',
  },
  {
    title: 'Team members',
    href: '/me/project/1/team-members',
  },
]

export default function ProjectDetailsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-6xl p-6">
        <SidebarNav items={sidebarNavItems} />

        {children}
      </main>
    </div>
  )
}
