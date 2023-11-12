import { apolloClient } from '@/libs/apollo'
import { gql } from '@apollo/client'

export type Role = {
  id: string
  value: string
  label: string
}

type ResponseItens = {
  roles: Role[]
}

export async function getRolesItensFromCms(): Promise<{
  roles: Role[]
}> {
  const { data } = await apolloClient.query<ResponseItens>({
    query: gql`
      query {
        roles(orderBy: value_ASC, first: 30) {
          id
          value
          label
        }
      }
    `,
  })

  const { roles } = data

  return { roles }
}
