'use client'

import { Card, CardContent } from '@/components/ui/card'
import { BrowserHeader } from './header'
import { BrowserContent } from './content'
import { BrowserCanva } from './canva'
import { useRef } from 'react'
import { HTMLMotionProps } from 'framer-motion'

export function Browser() {
  const BrowserCanvaRef = useRef<HTMLDivElement | null>(null)

  return (
    <Card className="h-[832px] overflow-hidden">
      <CardContent className="relative pb-[52px] pt-[52px]">
        <BrowserCanva ref={BrowserCanvaRef}>
          <BrowserHeader />
          <BrowserContent />
        </BrowserCanva>
      </CardContent>
    </Card>
  )
}
