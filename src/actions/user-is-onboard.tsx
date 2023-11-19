import { prisma } from '@/libs/prisma'
import { getCurrentUser } from './get-current-user'

export async function userIsBoard() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return false
  }

  const user = await prisma.users.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      onboard: true,
    },
  })

  if (user?.onboard) {
    return true
  }

  return false
}
