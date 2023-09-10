import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VERCEL_URL,
})

const externalApi = axios.create({
  baseURL: 'http://localhost:3333/api/v1',
})

export { api, externalApi }
