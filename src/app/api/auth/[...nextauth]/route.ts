import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
import jwt from 'jsonwebtoken'

import NextAuth, { NextAuthOptions } from 'next-auth'
import { prisma } from '@/libs/prisma'
import { Adapter } from 'next-auth/adapters'
import { CustomPrismaAdapter } from '@/libs/next-auth/prisma-adapter'

export const handler: NextAuthOptions = NextAuth({
  adapter: CustomPrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          email: profile.email!,
          name: profile.name!,
          avatarUrl: profile.avatar_url,
          userName: profile.login,
          githubLink: profile.html_url,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token }) {
      const payload = {
        uid: token.sub,
      }

      const encodedToken = jwt.sign(payload, process.env.JWT_SECRET!, {
        algorithm: process.env.JWT_ALGORITHM as jwt.Algorithm,
        expiresIn: '24h',
      })

      token.accessToken = encodedToken

      return token
    },
    session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
})

export { handler as GET, handler as POST }
