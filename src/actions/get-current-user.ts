import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/libs/prisma'
import { getServerSession } from 'next-auth'

async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()

  if (!session?.user) {
    return null
  }

  const sessionUser = session.user

  const user = await prisma.user.findUnique({
    where: {
      id: sessionUser.uId,
    },
    include: {
      skills: true,
    },
  })

  return user
}
