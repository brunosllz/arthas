'use client'

import { useState } from 'react'
import { clientExternalApi } from '@/libs/axios'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

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
      await clientExternalApi.post(`/projects/interest/in/${projectId}`)

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
      size="lg"
      onClick={handleManifestInterest}
      disabled={hasInterest || isInterestedInParticipate}
    >
      {hasInterest || isInterestedInParticipate
        ? 'Enviado'
        : 'Enviar solicitação'}
    </Button>
  )
}
