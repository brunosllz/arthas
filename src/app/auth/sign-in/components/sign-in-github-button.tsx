'use client'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { ArrowRightIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export function SignInGithubButton() {
  const [isLoading, setIsLoading] = useState(false)

  function signInWithGithub() {
    setIsLoading(true)

    signIn('github', { callbackUrl: '/' }).catch(() => setIsLoading(false))
  }

  return (
    <Button
      className="group w-full justify-between"
      disabled={isLoading}
      onClick={signInWithGithub}
    >
      <span className="flex items-center gap-1">
        {isLoading ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          <GitHubLogoIcon className="h-4 w-4" />
        )}
        Contiue with Github
      </span>

      <ArrowRightIcon className="hidden transition-all group-hover:flex" />
    </Button>
  )
}
