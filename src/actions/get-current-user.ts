import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import { prisma } from '@/libs/prisma'
import { getServerSession } from 'next-auth'

async function getCurrentServerSession() {
  return await getServerSession(authOptions)
}

async function getCurrentUser() {
  const session = await getCurrentServerSession()

  if (!session?.user) {
    return null
  }

  const sessionUser = session.user

  const user = await prisma.users.findUnique({
    where: {
      id: sessionUser.uId,
    },
    include: {
      skills: true,
    },
  })

  return user
}

export { getCurrentUser, getCurrentServerSession }
