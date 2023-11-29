'use client'

import { createContext, useContext, useState } from 'react'

type TrackSelectedStepContextType = {
  currentTarget: string
  handleSetCurrentTarget: (target: string) => void
}

const TrackSelectedStepContext = createContext<TrackSelectedStepContextType>(
  {} as TrackSelectedStepContextType,
)

export function TrackSelectedStepContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentTarget, setCurrentTarget] = useState('')

  function handleSetCurrentTarget(target: string) {
    setCurrentTarget((state) => {
      if (state === target) {
        return state
      }

      return target
    })
  }

  return (
    <TrackSelectedStepContext.Provider
      value={{ currentTarget, handleSetCurrentTarget }}
    >
      {children}
    </TrackSelectedStepContext.Provider>
  )
}

export const useTrackSelectedStep = () => useContext(TrackSelectedStepContext)
