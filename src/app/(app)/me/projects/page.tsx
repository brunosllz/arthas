import { Metadata } from 'next'
import { getShortDetailsFromCurrentUser } from '@/actions/get-short-details-from-current-user'

import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ProjectsTabs } from './components/projects-tabs'
import Link from 'next/link'
import { CreatorProjectList } from './components/creator-project-list'

import { Plus, Star } from 'lucide-react'
import { ProjectInvolvedList } from './components/project-involved-list'

export const metadata: Metadata = {
  title: 'Meus Projetos',
}

export default async function MyProjects() {
  const { shortDetailsFromCurrentUser } = await getShortDetailsFromCurrentUser()

  return (
    <div className="min-h-screen page-container">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <strong className="text-3xl font-medium">Meus projetos</strong>
          </div>

          <Button asChild variant="outline" size="lg">
            <Link href="/me/project/new/cover">
              <Plus size={16} /> Novo projeto
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2">
          <div className="w-full max-w-[277px]">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm text-muted-foreground">Nota geral</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Star size={16} className="fill-yellow-500 text-yellow-500" />
                {shortDetailsFromCurrentUser.overallRate}
              </span>
            </div>

            <div className="flex w-full items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Projetos realizados
              </span>
              <span className="font-medium">
                {shortDetailsFromCurrentUser.count.projectRealized > 1
                  ? `${shortDetailsFromCurrentUser.count.projectRealized} projetos`
                  : `${shortDetailsFromCurrentUser.count.projectRealized} projeto`}
              </span>
            </div>
          </div>

          <div className="flex items-end  justify-end gap-1.5">
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <span className="leading-none text-muted-foreground">•</span>
              Último projeto realizado:{' '}
              <span className="text-primary">
                {shortDetailsFromCurrentUser.lastProjectRealized ?? (
                  <div className="h-0.5 w-4 bg-primary" />
                )}
              </span>
            </span>
          </div>
        </div>
      </header>

      <ProjectsTabs>
        <TabsContent value="creator">
          <CreatorProjectList />
        </TabsContent>

        <TabsContent value="involved">
          <ProjectInvolvedList />
        </TabsContent>
      </ProjectsTabs>
    </div>
  )
}
