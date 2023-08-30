'use client'

import { signOut } from 'next-auth/react'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type SignOutButtonProps = HTMLAttributes<HTMLButtonElement>

export function SignOutButton(props: SignOutButtonProps) {
  function handleSignOut() {
    signOut({ callbackUrl: '/' })
  }

  return (
    <button
      onClick={handleSignOut}
      className={twMerge(
        'flex w-full items-center justify-between',
        props.className,
      )}
      {...props}
    />
  )
}
