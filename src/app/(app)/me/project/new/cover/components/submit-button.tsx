'use client'

import { Button } from '@/components/ui/button'
import { useBoundStore } from '@/store'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function SubmitButton(props: SubmitButtonProps) {
  const { newProjectFormSteps } = useBoundStore(({ newProjectFormSteps }) => ({
    newProjectFormSteps,
  }))

  return (
    <Button
      disabled={
        !newProjectFormSteps.cover.isValidToSubmit ||
        newProjectFormSteps.cover.submitIsLoading
      }
      className="w-[7.9375rem]"
      size="lg"
      type="submit"
      {...props}
    >
      {newProjectFormSteps.cover.submitIsLoading ? (
        <Loader2 size={24} className="animate-spin" />
      ) : (
        props.children
      )}
    </Button>
  )
}
