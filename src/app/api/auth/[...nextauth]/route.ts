import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
import jwt from 'jsonwebtoken'

import NextAuth, { NextAuthOptions } from 'next-auth'
import { prisma } from '@/libs/prisma'
import { Adapter } from 'next-auth/adapters'
import { CustomPrismaAdapter } from '@/libs/next-auth/prisma-adapter'
import { env } from '@/env'

export const authOptions: NextAuthOptions = {
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

      const encodedToken = jwt.sign(payload, env.JWT_SECRET, {
        algorithm: env.JWT_ALGORITHM as jwt.Algorithm,
        expiresIn: '24h',
      })

      token.accessToken = encodedToken

      return token
    },
    session({ session, token }) {
      session.user = {
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
    newUser: '/onboarding/step-1',
  },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
