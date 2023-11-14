'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { externalApi } from '@/libs/fetch-api'

type ManifestInterestButtonProps = {
  projectId: string
  isInterestedInParticipate: boolean
}

export function ManifestInterestButton({
  projectId,
  isInterestedInParticipate,
}: ManifestInterestButtonProps) {
  const [hasInterest, setHasInterest] = useState(false)

  async function handleManifestInterest() {
    try {
      await externalApi(`/projects/interest/in/${projectId}`, {
        method: 'POST',
      })

      setHasInterest(true)
    } catch (error) {
      console.error(error)

      return toast({
        title: 'Ocorreu um erro ao enviar a sua solicitação de interesse.',
        description: `Tente novamente mais tarde.`,
        variant: 'destructive',
      })
    }
  }

  return (
    <Button
      onClick={handleManifestInterest}
      disabled={hasInterest || isInterestedInParticipate}
    >
      {hasInterest || isInterestedInParticipate
        ? 'Enviado'
        : 'Enviar solicitação'}
    </Button>
  )
}
