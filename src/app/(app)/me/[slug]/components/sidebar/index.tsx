import { AvatarGroup } from '@/components/avatar-group'
import { Button } from '@/components/ui/button'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { InvolvedProjectCard } from './involved-project-card'
import { getUserProfile } from '@/actions/get-user-profile'

interface SideBarProps {
  slugProfile: string
}

export async function SideBar({ slugProfile }: SideBarProps) {
  const { user } = await getUserProfile({ slug: slugProfile })

  if (!user) {
    return null
  }

  return (
    <aside className="space-y-6">
      {user.involvedProjects.length > 0 && (
        <Card>
          <CardHeader className="pb-4">
            <h3 className="text-sm font-medium">Projetos envolvido</h3>
          </CardHeader>

          <CardContent className="space-y-6">
            {user.involvedProjects.map((project, index) => {
              return (
                <div key={project.id}>
                  <InvolvedProjectCard project={project} />

                  {index > 0 && index < 3 - 1 && <Separator />}
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      <Card className="sticky top-[7.5rem]">
        <CardHeader className="p-5">
          <AvatarGroup />
        </CardHeader>

        <CardContent className="space-y-2 px-5">
          <p className="text-lg font-medium leading-tight ">
            Projetos sem equipe? Vamos ajudar você a montar a sua!
          </p>

          <p className="leading-tight text-muted-foreground">
            Monte uma equipe para concretizar seus projetos. A colaboração leva
            ao sucesso.
          </p>
        </CardContent>

        <CardFooter className="p-5 pt-2">
          <Button asChild className="w-full">
            <Link href="/me/projects">Criar projeto</Link>
          </Button>
        </CardFooter>
      </Card>
    </aside>
  )
}
