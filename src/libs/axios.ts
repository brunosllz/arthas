import axios from 'axios'
import { getSession } from 'next-auth/react'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VERCEL_URL,
})

const externalApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_URL,
})

externalApi.interceptors.request.use(async (response) => {
  const token = await getSession()
  response.headers.Authorization = `Bearer ${token?.user.accessToken}`
  return response
})

export { api, externalApi }
