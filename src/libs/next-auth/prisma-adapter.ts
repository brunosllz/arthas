import { Adapter } from 'next-auth/adapters'

import { PrismaClient } from '@prisma/client'

export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    async createUser(user) {
      const prismaUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
          userName: user.userName,
          githubLink: user.githubLink,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        userName: prismaUser.userName!,
        avatarUrl: prismaUser.avatarUrl,
        githubLink: prismaUser.githubLink!,
        emailVerified: null,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
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
        avatarUrl: user.avatarUrl,
        githubLink: user.githubLink!,
        userName: user.userName!,
        emailVerified: null,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
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
        username: user.userName,
        avatarUrl: user.avatarUrl,
        githubLink: user.githubLink!,
        userName: user.userName!,
        emailVerified: null,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            providerAccountId,
            provider,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) {
        return null
      }

      const { user } = account

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.userName,
        avatarUrl: user.avatarUrl,
        githubLink: user.githubLink!,
        userName: user.userName!,
        emailVerified: null,
      }
    },

    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name!,
          email: user.email,
          avatarUrl: user.avatarUrl,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        username: prismaUser.userName,
        avatarUrl: prismaUser.avatarUrl,
        githubLink: prismaUser.githubLink!,
        userName: prismaUser.userName!,
        emailVerified: null,
      }
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          idToken: account.id_token,
          refreshToken: account.refresh_token,
          sessionState: account.session_state,
          scope: account.scope,
          tokenType: account.token_type,
        },
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          expires,
          sessionToken,
          userId,
        },
      })

      return {
        userId,
        sessionToken,
        expires,
      }
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!prismaSession) {
        return null
      }

      const { user, ...session } = prismaSession

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.userName,
          avatarUrl: user.avatarUrl,
          githubLink: user.githubLink!,
          userName: user.userName!,
          emailVerified: null,
        },
        session: {
          expires: session.expires,
          sessionToken: session.sessionToken,
          userId: session.userId,
        },
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const prismaSession = await prisma.session.update({
        where: {
          sessionToken,
        },
        data: {
          expires,
          userId,
        },
      })

      return {
        sessionToken: prismaSession.sessionToken,
        userId: prismaSession.userId,
        expires: prismaSession.expires,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: { sessionToken },
      })
    },
  }
}
