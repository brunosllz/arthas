import { getCurrentServerSession } from './get-current-user'
import { externalApi } from '@/libs/fetch-api'

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

  const response = await externalApi(
    `/projects/general-skills?search=${search ?? ''}`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      next: {
        revalidate: 60 * 60 * 6, // 6 hours
      },
    },
  )

  const data: ResponseItens = await response.json()

  return { generalSkills: data }
}
