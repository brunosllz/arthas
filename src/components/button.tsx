'use client'

import { signIn } from 'next-auth/react'
import { HTMLAttributes } from 'react'

type ButtonProps = HTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      className="rounded-md bg-zinc-700 px-5 py-2 hover:bg-zinc-600"
      onClick={() => signIn('github', { callbackUrl: '/' })}
      {...props}
    />
  )
}
