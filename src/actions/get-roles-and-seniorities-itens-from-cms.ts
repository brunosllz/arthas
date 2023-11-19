import { apolloClient } from '@/libs/apollo'
import { gql } from '@apollo/client'
import { Role } from './get-roles-itens-from-cms'

export type Seniority = {
  id: string
  value: string
  label: string
}

type ResponseItens = {
  roles: Role[]
  seniorities: Seniority[]
}

export async function getRolesAndSenioritiesItensFromCms(): Promise<{
  roles: Role[]
  seniorities: Seniority[]
}> {
  const { data } = await apolloClient.query<ResponseItens>({
    query: gql`
      query {
        seniorities(orderBy: value_ASC, first: 30) {
          id
          value
          label
        }
        roles(orderBy: value_ASC, first: 30) {
          id
          value
          label
        }
      }
    `,
  })

  const { roles, seniorities } = data

  return { roles, seniorities }
}
