import { Adapter } from 'next-auth/adapters'

import { PrismaClient } from '@prisma/client'
import { env } from '@/env'

export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    async createUser(user) {
      const userNameSplit = user.name.split(' ')

      const name = userNameSplit[0].toLowerCase()
      const lastName = userNameSplit[userNameSplit.length - 1].toLowerCase()

      const countUsers = await prisma.users.count()

      const slugProfile = `${name}-${lastName}-${countUsers}`

      const prismaUser = await prisma.users.create({
        data: {
          name: user.name,
          slug_profile: slugProfile,
          email: user.email,
          avatar_url: user.avatarUrl,
          profile_url: `${env.NEXT_PUBLIC_VERCEL_URL}/me/${slugProfile}`,
          github_link: user.githubLink,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        avatarUrl: prismaUser.avatar_url,
        githubLink: prismaUser.github_link!,
        profileUrl: prismaUser.profile_url!,
        emailVerified: null,
      }
    },

    async getUser(id) {
      const user = await prisma.users.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url,
        githubLink: user.github_link!,
        profileUrl: user.profile_url!,
        emailVerified: null,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.users.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url,
        githubLink: user.github_link!,
        profileUrl: user.profile_url!,
        emailVerified: null,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.accounts.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          users: true,
        },
      })

      if (!account) {
        return null
      }

      const { users } = account

      return {
        id: users.id,
        name: users.name,
        email: users.email,
        avatarUrl: users.avatar_url,
        githubLink: users.github_link!,
        profileUrl: users.profile_url!,
        emailVerified: null,
      }
    },

    async updateUser(user) {
      const prismaUser = await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name!,
          email: user.email,
          avatar_url: user.avatarUrl,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        avatarUrl: prismaUser.avatar_url,
        githubLink: prismaUser.github_link!,
        profileUrl: prismaUser.profile_url!,
        emailVerified: null,
      }
    },

    async linkAccount(account) {
      await prisma.accounts.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          access_token: account.access_token,
          expires_at: account.expires_at,
          id_token: account.id_token,
          refresh_token: account.refresh_token,
          session_state: account.session_state,
          scope: account.scope,
          token_type: account.token_type,
        },
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.sessions.create({
        data: {
          expires,
          session_token: sessionToken,
          user_id: userId,
        },
      })

      return {
        userId,
        sessionToken,
        expires,
      }
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.sessions.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          users: true,
        },
      })

      if (!prismaSession) {
        return null
      }

      const { users, ...session } = prismaSession

      return {
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          avatarUrl: users.avatar_url,
          githubLink: users.github_link!,
          profileUrl: users.profile_url!,
          emailVerified: null,
        },
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: session.user_id,
        },
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const prismaSession = await prisma.sessions.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })

      return {
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
        expires: prismaSession.expires,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.sessions.delete({
        where: { session_token: sessionToken },
      })
    },
  }
}
