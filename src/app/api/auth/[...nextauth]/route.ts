// import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
// import jwt from 'jsonwebtoken'

import NextAuth from 'next-auth'
// import { prisma } from '@/libs/prisma'
// import { Adapter } from 'next-auth/adapters'
// import { CustomPrismaAdapter } from '@/libs/next-auth/prisma-adapter'
// import { env } from '@/env'
import { authOptions } from './auth-options'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
