import { useSession } from 'next-auth/react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'

export function UserNav() {
  // const { data } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 select-none rounded-full bg-primary/10"
        >
          <Avatar className="h-8 w-8">
            {/* <AvatarImage src={data?.user.image!} alt="" /> */}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          {/* <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">
              {user.firstName + ' ' + user.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId,
                )?.emailAddress
              }
            </p>
          </div> */}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/teams">My teams</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/billing">Billing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/keys">API Keys</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Button className="w-full" variant="ghost">
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
