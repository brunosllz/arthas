import { Separator } from '@/components/ui/separator'
import { NotificationList } from './components/notification-list'
import { api } from '@/libs/axios'
import { redirect } from 'next/navigation'

export default async function Notifications() {
  const { data } = await api.get('/notifications/count')
  const { count } = data

  const hasNotifications = count > 0

  if (!hasNotifications) {
    redirect('/')
  }

  return (
    <div className="mx-auto max-w-[680px]">
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
