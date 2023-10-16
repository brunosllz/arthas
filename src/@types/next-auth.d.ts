import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    avatarUrl: string
    githubLink?: string
    profileUrl?: string
  }

  interface Session {
    user: {
      uId: string
      name: string
      email: string
      avatarUrl: string
      profileUrl: string
      accessToken: string
    }
  }
}


declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string   
    avatarUrl: string
    profileUrl: string
  }
}