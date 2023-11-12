import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Link from 'next/link'
import { SignOutButton } from '../sign-out-button'
import { UserInfoLabel } from './user-info-label'
import { UserAvatar } from '../user-avatar'
import { ProfileLink } from './profile-link'

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-12 w-12 select-none rounded-full bg-primary/10"
        >
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <UserInfoLabel />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ProfileLink />

          <DropdownMenuItem asChild>
            <Link href="/me/projects">Meus projetos</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/me">
              Command menu
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/me">Theme</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}

        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuItem>
          <SignOutButton>
            Log out
            {/* <DropdownMenuShortcut>
              ⇧<span className="text-[0.625rem]">⌘</span>Q
            </DropdownMenuShortcut> */}
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
