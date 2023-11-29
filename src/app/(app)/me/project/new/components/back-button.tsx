'use client'

import { useBoundStore } from '@/store'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { HTMLAttributes } from 'react'

type BackButtonProps = HTMLAttributes<HTMLButtonElement>

export function BackButton({ ...props }: BackButtonProps) {
  const { newProjectFormSteps } = useBoundStore(({ newProjectFormSteps }) => ({
    newProjectFormSteps,
  }))

  const router = useRouter()

  function handleBack() {
    router.back()
  }

  return (
    <Button
      onClick={handleBack}
      disabled={
        newProjectFormSteps.description.submitIsLoading ||
        newProjectFormSteps.job.submitIsLoading
      }
      className="max-w-min"
      variant="outline"
      size="lg"
      {...props}
    >
      Voltar
    </Button>
  )
}
