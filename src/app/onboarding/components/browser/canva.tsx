'use client'

import { useBoundStore } from '@/store'
import { HTMLMotionProps, motion } from 'framer-motion'
import { forwardRef } from 'react'

type BrowserCanvaProps = HTMLMotionProps<'div'>

export const BrowserCanva = forwardRef<HTMLDivElement, BrowserCanvaProps>(
  (props, ref) => {
    const { x, y, scale } = useBoundStore((state) => state.animatedBrowser)

    return (
      <motion.div
        ref={ref}
        animate={{ scale, x, y }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="top-1/5 -translate-y-1/5 absolute left-[52px] w-[1024px] overflow-hidden rounded-lg"
        {...props}
      />
    )
  },
)

BrowserCanva.displayName = 'BrowserCanva'
