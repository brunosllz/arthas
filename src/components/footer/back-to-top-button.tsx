'use client'

import { ArrowUp } from 'lucide-react'
import { Button } from '../ui/button'

export function BackToTopButton() {
  return (
    <Button
      onClick={() => window.scrollTo(0, 0)}
      variant="link"
      size="sm"
      className="gap-1.5"
    >
      Voltar ao topo <ArrowUp size={16} />
    </Button>
  )
}
