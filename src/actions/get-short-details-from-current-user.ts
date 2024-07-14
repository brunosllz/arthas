import { MeShortDetails } from '@/@types/me-short-details'
import { api } from '@/libs/fetch-api'
import { cookies as nextCookies } from 'next/headers'
import { redirect } from 'next/navigation'

type GetShortDetailsFromCurrentUserResponse = {
  shortDetailsFromCurrentUser: MeShortDetails
}

export async function getShortDetailsFromCurrentUser(): Promise<GetShortDetailsFromCurrentUserResponse> {
  const cookies = nextCookies()

  const response = await api(`/account/user/me/short/details`, {
    method: 'GET',
    headers: {
      Cookie: cookies.toString(),
    },
  })

  if (!response.ok) {
    console.error(response)
    return redirect('/')
  }

  const shortDetailsFromCurrentUser = await response.json()

  if (!shortDetailsFromCurrentUser) {
    console.error(await response.json())
    return redirect('/')
  }

  return shortDetailsFromCurrentUser
}
