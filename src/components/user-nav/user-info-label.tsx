import { getCurrentUser } from '@/actions/get-current-user'

export async function UserInfoLabel() {
  const user = await getCurrentUser()

  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium leading-none">{user?.name}</p>
      <p className="text-xs leading-none text-muted-foreground">
        {user?.email}
      </p>
    </div>
  )
}
