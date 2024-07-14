/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'
import {
  ChevronRight,
  Crown,
  MoreVertical,
  Plus,
  User,
  User2,
  X,
} from 'lucide-react'
import { ProjectManagerTabs } from './components/project-manager-tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { externalApi } from '@/libs/fetch-api'
import { getCurrentServerSession } from '@/actions/get-current-user'
import dayjs from 'dayjs'
import { ProjectFormTab } from './components/project-form-tab'

import { AlertDialogTrigger, AlertDialog } from '@/components/ui/alert-dialog'
import { DeleteProjectAlert } from './components/delete-project-alert'
import { PERMISSION_TYPE } from '@/mappers/permission-type'
import { PROJECT_STATUS } from '@/mappers/project-status'
import { MultiSelectInput } from './components/multi-select-input'
import Link from 'next/link'
import { getRolesAndSenioritiesItensFromCms } from '@/actions/get-roles-and-seniorities-itens-from-cms'
import { SheetFormManageMember } from './components/sheet-form-manage-member'

export type ProjectDetails = {
  id: string
  slug: string
  author: {
    id: string
    name: string
  }
  bannerUrl: string
  imageUrl: string
  name: string
  description: string
  status: 'inProgress' | 'recruiting' | 'closed'
  availableDays: Array<string>
  availableTime: string
  skills: Array<string>
  teamMembers: Array<{
    id: string
    userId: string
    avatarUrl: string
    name: string
    title: string
    permissionType: 'owner' | 'member'
    roles: Array<{
      name: string
      slug: string
    }>
  }>
  jobs: Array<{
    id: string
    name: string
    slug: string
    membersAmount: number
    description: string
  }>
  interestedInProject: Array<{
    id: string
    avatarUrl: string
    role: string
    seniority: string
    name: string
    slugProfile: string
  }>
  createdAt: string
}

export async function getProjectDetailsBySlug({ slug }: { slug: string }) {
  const session = await getCurrentServerSession()

  const response = await externalApi(`/projects/${slug}/management/details`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  })

  const project: ProjectDetails = await response.json()

  return { project }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const { project } = await getProjectDetailsBySlug({ slug: params.slug })

  return {
    title: project.name,
  }
}

export default async function ProjectManager({
  params,
}: {
  params: { slug: string }
}) {
  const { project } = await getProjectDetailsBySlug({ slug: params.slug })
  const { roles, seniorities } = await getRolesAndSenioritiesItensFromCms()
  const session = await getCurrentServerSession()

  const isProjectAuthorOrOwner =
    project.author.id === session?.user.uId ||
    project.teamMembers.some(
      (member) =>
        member.userId === session?.user.uId &&
        member.permissionType === 'owner',
    )

  function handleManageInterestInParticipate() {
    console.log('handleManageInterestInParticipate')
  }

  return (
    <div className="page-container">
      <header className="space-y-4">
        <div className="flex items-center gap-1 pb-2">
          <Link
            href="/me/projects"
            className="text-sm text-muted-foreground transition-colors hover:text-zinc-300"
          >
            Projetos
          </Link>{' '}
          <ChevronRight size={14} className="text-zinc-500" />{' '}
          <span className="select-none text-sm text-zinc-300">
            {project.name}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-6">
            <strong className="text-3xl font-medium">{project.name}</strong>

            <Badge size="sm" variant={PROJECT_STATUS[project.status].color}>
              {PROJECT_STATUS[project.status].label}
            </Badge>
          </div>

          {isProjectAuthorOrOwner && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Excluir projeto
                </Button>
              </AlertDialogTrigger>

              <DeleteProjectAlert
                projectName={project.name}
                projectId={project.id}
              />
            </AlertDialog>
          )}
        </div>

        <div className="w-full space-y-2.5">
          <div className="grid grid-cols-[9.375rem_1fr] items-center justify-start">
            <span className="text-sm text-muted-foreground">Criador</span>
            <span className="font-medium">{project.author.name}</span>
          </div>

          <div className="grid grid-cols-[9.375rem_1fr] items-center justify-start">
            <span className="text-sm text-muted-foreground">
              Data de criação
            </span>
            <span className="font-medium">
              {dayjs(project.createdAt).format('DD/MM/YYYY')}
            </span>
          </div>

          <div className="grid grid-cols-[9.375rem_1fr] items-center justify-start">
            <span className="block text-sm text-muted-foreground">
              Funções disponíveis
            </span>

            <div className="flex flex-wrap gap-3">
              {project.jobs.map((job) => (
                <Badge key={job.id} variant="secondary">
                  {String(job.membersAmount).padStart(2, '0')} -{' '}
                  {roles.find((role) => role.value === job.name)?.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      <ProjectManagerTabs isProjectAuthorOrOwner={isProjectAuthorOrOwner}>
        <TabsContent value="project" className="mt-6 rounded-lg">
          <ProjectFormTab projectSlug={params.slug} />
        </TabsContent>

        <TabsContent value="team" className="mt-6 rounded-lg border p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30.375rem]">Nome</TableHead>
                <TableHead className="w-[21.625rem]">Hierarquia</TableHead>
                <TableHead>Funções</TableHead>
                <TableHead className="w-4" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {project.teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatarUrl} />
                    </Avatar>
                    <span>{member.name}</span>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className="gap-2.5"
                      variant={PERMISSION_TYPE[member.permissionType].color}
                    >
                      {member.permissionType === 'owner' ? (
                        <Crown size={14} />
                      ) : (
                        <User size={14} />
                      )}

                      {PERMISSION_TYPE[member.permissionType].label}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {member.roles.length > 0 ? (
                      member.roles.map((role) => (
                        <Badge key={role.slug} variant="secondary">
                          {
                            roles.find((roleCms) => roleCms.value === role.name)
                              ?.label
                          }
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="secondary">Sem função</Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <Sheet>
                      <SheetTrigger asChild disabled={!isProjectAuthorOrOwner}>
                        <Button variant="ghost" size="icon-sm">
                          <MoreVertical size={14} />
                        </Button>
                      </SheetTrigger>

                      <SheetContent className="flex flex-col p-0 sm:max-w-[28.75rem]">
                        <SheetClose className="absolute right-6 top-5 z-10 rounded-full border border-zinc-600 bg-accent p-3 hover:bg-zinc-700 hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-zinc-300  disabled:pointer-events-none">
                          <X size={18} />
                          <span className="sr-only">Close</span>
                        </SheetClose>

                        <SheetHeader className="relative h-[7rem] bg-zinc-900">
                          <Image
                            src="/background-profile.png"
                            alt=""
                            width={460}
                            height={112}
                            className="h-full object-cover"
                          />

                          <div className="absolute -bottom-9 left-6 h-[4.5rem] w-[4.5rem] rounded-full">
                            <Image
                              src={member.avatarUrl}
                              alt={member.name}
                              className="h-full w-full rounded-full object-cover"
                              width={50}
                              height={50}
                              quality={90}
                            />
                          </div>
                        </SheetHeader>

                        <div className="flex flex-1 flex-col gap-6 px-6 pb-6 pt-12">
                          <div className="flex flex-col border-b pb-6">
                            <div className="flex items-center justify-between gap-1">
                              <strong className="truncate text-xl font-medium">
                                {member.name}
                              </strong>

                              <Badge
                                className="gap-2.5"
                                size="sm"
                                variant={
                                  PERMISSION_TYPE[member.permissionType].color
                                }
                              >
                                {member.permissionType === 'owner' ? (
                                  <Crown size={14} />
                                ) : (
                                  <User size={14} />
                                )}

                                {PERMISSION_TYPE[member.permissionType].label}
                              </Badge>
                            </div>

                            <span className="block truncate text-muted-foreground">
                              {member.title}
                            </span>
                          </div>

                          <SheetFormManageMember
                            memberPermissionType={member.permissionType}
                            project={project}
                            roles={roles}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="requests" className="mt-6 rounded-lg border p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30.375rem]">Nome</TableHead>
                <TableHead>Área de atuação</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {project.interestedInProject.map((interestedUser) => (
                <TableRow key={interestedUser.id}>
                  <TableCell>
                    <Link
                      href={`/me/${interestedUser.slugProfile}`}
                      className="flex items-center gap-3"
                    >
                      <Avatar>
                        <AvatarImage src={interestedUser.avatarUrl} />
                      </Avatar>
                      <span>{interestedUser.name}</span>
                    </Link>
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {
                        roles.find((role) => role.value === interestedUser.role)
                          ?.label
                      }
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {
                        seniorities.find(
                          (seniority) =>
                            seniority.value === interestedUser.seniority,
                        )?.label
                      }
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-end gap-3">
                      <Button size="sm" variant="outline" type="button">
                        Recusar
                      </Button>

                      <Button
                        size="sm"
                        type="button"
                        // onClick={handleManageInterestInParticipate}
                      >
                        Aceitar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </ProjectManagerTabs>
    </div>
  )
}
