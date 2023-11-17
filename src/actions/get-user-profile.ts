import { api } from '@/libs/fetch-api'
import { cookies as nextCookies } from 'next/headers'

export type UserProfile = {
  id: string
  name: string
  aboutMe: string | null
  seniority: string
  role: string
  avatar_url: string
  state: string
  city: string
  country: string
  overallRate: string
  slugProfile: string
  linkedinLink: string
  githubLink: string
  title: string
  skills: Array<string>
  updatedAt: string
  involvedProjects: Array<{
    id: string
    image_url: string
    name: string
    status: 'inProgress' | 'recruiting' | 'closed'
  }>
  projectRealized: Array<{ id: string }>
}

type GetUserResponse = {
  user: UserProfile | null
}

export async function getUserProfile({
  slug,
}: {
  slug: string
}): Promise<GetUserResponse> {
  const cookies = nextCookies()

  const response = await api(`/account/user/me/${slug}`, {
    headers: {
      Cookie: cookies.toString(),
    },
    next: {
      tags: [`profile:${slug}`],
    },
  })

  const user = await response.json()

  return user
}
