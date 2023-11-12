import { serverExternalApi } from '@/libs/axios'
import { getCurrentServerSession } from './get-current-user'

export type GeneralSkills = {
  id: string
  value: string
  label: string
}

type ResponseItens = GeneralSkills[]

type getGeneralSkillsProps = {
  search?: string
}

export async function getGeneralSkillsItens({
  search,
}: getGeneralSkillsProps): Promise<{
  generalSkills: GeneralSkills[]
}> {
  const session = await getCurrentServerSession()

  const { data } = await serverExternalApi.get<ResponseItens>(
    `/projects/general-skills?search=${search ?? ''}`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    },
  )

  return { generalSkills: data }
}
