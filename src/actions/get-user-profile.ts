import { UserProfile } from '@/@types/user-profile'
import { api } from '@/libs/fetch-api'
import { cookies as nextCookies } from 'next/headers'

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
