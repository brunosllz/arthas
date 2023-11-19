'use client'

import ReactConfetti from 'react-confetti'
import { useEffect, useState } from 'react'

export function Confetti() {
  const [dimensions, setDimensions] = useState({
    width: window.document.body.clientWidth - 20,
    height: window.innerHeight,
  })
  const { height, width } = dimensions

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.document.body.offsetWidth - 20,
        height: window.document.body.offsetHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <ReactConfetti
        width={width}
        height={height}
        numberOfPieces={1700}
        tweenDuration={10000}
        gravity={0.28}
        recycle={false}
      />
    </>
  )
}
