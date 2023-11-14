import { env } from '@/env'
import { getSession } from 'next-auth/react'

interface DefaultApiProps {
  baseUrl: string
  path: string
  apiPrefix?: string
  init?: RequestInit
}

async function defaultApi({ path, init, apiPrefix, baseUrl }: DefaultApiProps) {
  const prefix = apiPrefix ? apiPrefix.concat(path) : path

  const url = new URL(prefix, baseUrl)
  return await fetch(url, init)
}

async function api(path: string, init?: RequestInit) {
  return await defaultApi({
    baseUrl: env.NEXT_PUBLIC_VERCEL_URL,
    apiPrefix: '/api',
    path,
    init,
  })
}

async function externalApi(path: string, init?: RequestInit) {
  const session = await getSession()

  return await defaultApi({
    baseUrl: env.NEXT_PUBLIC_EXTERNAL_API_URL,
    apiPrefix: '/api/v1',
    path,
    init: {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        'Content-Type': 'application/json',
      },
      ...init,
    },
  })
}

export { api, externalApi }
