import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
import jwt from 'jsonwebtoken'

import NextAuth, { NextAuthOptions } from 'next-auth'
import { prisma } from '@/libs/prisma'
import { Adapter } from 'next-auth/adapters'
import { CustomPrismaAdapter } from '@/libs/next-auth/prisma-adapter'
import { env } from '@/env'

export const handler: NextAuthOptions = NextAuth({
  adapter: CustomPrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
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
    jwt({ token, user }) {
      const payload = {
        uid: token.sub,
      }

      const encodedToken = jwt.sign(payload, env.JWT_SECRET, {
        algorithm: env.JWT_ALGORITHM as jwt.Algorithm,
        expiresIn: '24h',
      })

      token.accessToken = encodedToken
      if (user) {
        token.avatarUrl = user.avatarUrl
      }

      return token
    },
    session({ session, token }) {
      session.user = {
        ...session.user,
        avatarUrl: token.avatarUrl,
        uId: token.sub ?? '',
        accessToken: token.accessToken,
      }

      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 24 hours
  },
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
})

export { handler as GET, handler as POST }
