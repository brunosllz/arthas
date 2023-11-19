import { env } from '@/env'
import { CustomPrismaAdapter } from '@/libs/next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
import { prisma } from '@/libs/prisma'
import jwt from 'jsonwebtoken'

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
