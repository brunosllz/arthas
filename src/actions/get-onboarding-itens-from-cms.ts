import { apolloClient } from '@/libs/apollo'
import { gql } from '@apollo/client'

export type Role = {
  id: string
  value: string
}

export type Seniority = {
  id: string
  value: string
}

type OnboardingItens = {
  roles: Role[]
  seniorities: Seniority[]
}

export async function getOnboardingItensFromCms() {
  const { data } = await apolloClient.query<OnboardingItens>({
    query: gql`
      query {
        seniorities(orderBy: value_ASC) {
          id
          value
        }
        roles(orderBy: value_ASC) {
          id
          value
        }
      }
    `,
  })

  const { roles, seniorities } = data

  return { roles, seniorities }
}
