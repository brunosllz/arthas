import axios from 'axios'
import { getSession } from 'next-auth/react'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VERCEL_URL,
})

const clientExternalApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
})

const serverExternalApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
})

clientExternalApi.interceptors.request.use(async (response) => {
  const session = await getSession()

  response.headers.Authorization = `Bearer ${session?.user.accessToken}`

  return response
})

export { api, clientExternalApi, serverExternalApi }
