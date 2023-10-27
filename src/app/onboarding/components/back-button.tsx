'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()

  function handleBack() {
    router.back()
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-6 w-6"
      onClick={handleBack}
    >
      <ArrowLeft size={18} />
    </Button>
  )
}
