import dayjs from 'dayjs'
import { getCurrentServerSession } from '@/actions/get-current-user'
import { serverExternalApi } from '@/libs/axios'
import { toast } from '@/components/ui/use-toast'

import Image from 'next/image'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Calendar, Timer } from 'lucide-react'
import { Footer } from './footer'
import { Badge } from '@/components/ui/badge'
import { ProjectDetailsSkeleton } from './project-details-skeleton'
import { ProjectRoleTabs } from './project-role-tabs'
import { ManifestInterestButton } from './manifest-interest-button'

type ProjectDetailsResponse = {
  id: string
  imageUrl: string
  name: string
  description: string
  author: {
    name: string
    role: string
  }
  availableDays: Array<string>
  availableTime: string
  roles: Array<{
    id: string
    name: string
    description: string
    membersAmount: number
  }>
  generalSkills: Array<string>
  hasInterestInParticipate: Array<{ userId: string }>
  createdAt: string
}

type ProjectDetailsProps = {
  currentProjectId: string
}

async function getProjectDetails(currentProjectId: string) {
  const session = await getCurrentServerSession()

  try {
    const { data: projectDetails } =
      await serverExternalApi.get<ProjectDetailsResponse>(
        `/projects/from/${currentProjectId}/details`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        },
      )

    return { projectDetails }
  } catch (error) {
    console.error(error)

    toast({
      title: 'Ocorreu um erro ao carregar os detalhes do projeto.',
      description: `Tente novamente mais tarde.`,
      variant: 'destructive',
    })
  }
}

export async function ProjectDetails({
  currentProjectId,
}: ProjectDetailsProps) {
  if (!currentProjectId) {
    return <ProjectDetailsSkeleton />
  }

  const hasProjectDetails = await getProjectDetails(currentProjectId)

  if (!hasProjectDetails) {
    return <ProjectDetailsSkeleton />
  }

  const { projectDetails } = hasProjectDetails

  const currentUser = await getCurrentServerSession()

  const manifestInterested = projectDetails.hasInterestInParticipate.find(
    (user) => user.userId === currentUser?.user?.uId,
  )

  return (
    <div className="space-y-6 page-container">
      <Card className="overflow-hidden">
        <div className="relative h-36 w-full bg-zinc-900">
          <Avatar className="h-full w-full rounded-none"></Avatar>

          <div className="absolute -bottom-[44px] left-6">
            <Avatar size="xl" className="bg-zinc-800 ring-2 ring-black">
              {projectDetails.imageUrl && (
                <Image
                  src={projectDetails.imageUrl}
                  width={80}
                  height={80}
                  alt={projectDetails.name}
                  quality={90}
                  className="h-full w-full object-cover"
                />
              )}
            </Avatar>
          </div>
        </div>

        <CardContent className="mt-[68px] space-y-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-1.5">
              <strong className="block text-2xl font-semibold">
                {projectDetails.name}
              </strong>

              <div className="inline-flex w-full items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="block text-zinc-200">
                    {projectDetails.author.name}
                  </span>

                  <span className="text-lg leading-none text-zinc-900">•</span>

                  <span className="block text-muted-foreground">
                    {projectDetails.author.role}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Postado {dayjs(projectDetails.createdAt).fromNow()}.
                </span>
              </div>
            </div>

            <div className="space-y-3 pb-2">
              <span className="text-zinc-200">Disponibilidade</span>

              <div className="space-x-4">
                <span className="inline-flex items-center gap-1.5 text-sm capitalize text-muted-foreground/90">
                  <Calendar size={16} />
                  {projectDetails.availableDays.join(', ')}
                </span>

                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground/90">
                  <Timer size={16} />
                  {projectDetails.availableTime}
                </span>
              </div>
            </div>

            <ManifestInterestButton
              projectId={projectDetails.id}
              isInterestedInParticipate={!!manifestInterested}
            />
          </div>

          <Separator className="bg-zinc-900" />

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-zinc-200">
              Descrição do projeto
            </h3>

            <p className="leading-relaxed text-muted-foreground">
              {projectDetails.description}
            </p>

            <div className="flex flex-wrap items-center justify-start gap-3">
              {projectDetails.generalSkills.map((skill) => (
                <Badge key={skill} variant="static">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="bg-zinc-900" />

          <ProjectRoleTabs projectRoles={projectDetails.roles} />
        </CardContent>
      </Card>

      <Footer />
    </div>
  )
}
