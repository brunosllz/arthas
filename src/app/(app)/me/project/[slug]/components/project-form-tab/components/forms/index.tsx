import { FormChanger } from './form-changer'
import { getProjectDetailsBySlug } from '../../../../page'
import { InitializerEditProjectStore } from '../initializer-edit-project-store'
import { getRolesItensFromCms } from '@/actions/get-roles-itens-from-cms'
import { getCurrentServerSession } from '@/actions/get-current-user'

type FormsProps = {
  projectSlug: string
}

export async function Forms({ projectSlug }: FormsProps) {
  const { roles } = await getRolesItensFromCms()
  const { project } = await getProjectDetailsBySlug({ slug: projectSlug })
  const session = await getCurrentServerSession()

  const isProjectAuthorOrOwner =
    project.author.id === session?.user.uId ||
    project.teamMembers.some(
      (member) =>
        member.userId === session?.user.uId &&
        member.permissionType === 'owner',
    )

  return (
    <>
      <InitializerEditProjectStore
        project={{
          projectId: project.id,
          projectName: project.name,
          avatarUrl: project.imageUrl,
          bannerUrl: project.bannerUrl,
          availableDays: project.availableDays,
          roleItens: roles,
          roles: project.jobs.map((role) => ({
            roleId: role.id,
            membersAmount: role.membersAmount,
            name: role.name,
            description: role.description,
          })),
        }}
      />
      <FormChanger
        project={project}
        isProjectAuthorOrOwner={isProjectAuthorOrOwner}
      />
    </>
  )
}
