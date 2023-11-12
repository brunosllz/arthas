import { Separator } from '@/components/ui/separator'
import { NotificationList } from './components/notification-list'
import { redirect } from 'next/navigation'
import { prisma } from '@/libs/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

async function verifyIfHasAvailableNotifications() {
  const session = await getServerSession(authOptions)

  if (session) {
    const countNotificationsFromUser = await prisma.notifications.count({
      where: {
        author_id: session.user.uId,
      },
    })

    return countNotificationsFromUser
  }

  return 0
}

export default async function Notifications() {
  const count = await verifyIfHasAvailableNotifications()

  const hasNotifications = count > 0

  if (!hasNotifications) {
    redirect('/')
  }

  return (
    <div className="mx-auto max-w-[680px] page-container">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">Notifications</h1>
        </div>
      </div>

      <Separator className="mb-8 mt-4" />

      <NotificationList />
    </div>
  )
}
