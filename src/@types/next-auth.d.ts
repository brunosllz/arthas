import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    userName: string
    avatarUrl: string
    githubLink: string
  }

  interface Session {
    accessToken: string
  }

  interface DefaultJWT {
    uid: string
  }
}
