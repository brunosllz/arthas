import { DropdownMenuItem } from '../ui/dropdown-menu'
import Link from 'next/link'
import { getCurrentUser } from '@/actions/get-current-user'

export async function ProfileLink() {
  const user = await getCurrentUser()

  return (
    <DropdownMenuItem asChild>
      <Link href={`${user?.profile_url}`}>Meu perfil</Link>
    </DropdownMenuItem>
  )
}
