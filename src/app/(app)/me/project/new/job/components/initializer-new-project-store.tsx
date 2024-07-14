'use client'

import { useBoundStore } from '@/store'
import { useRef } from 'react'

type InitializerNewProjectStore = {
  roleItens: Array<{ label: string; value: string }>
}

export function InitializerNewProjectStore({
  roleItens,
}: InitializerNewProjectStore) {
  const initializer = useRef(false)

  if (!initializer.current) {
    useBoundStore.setState((state) => ({
      newProjectFormSteps: {
        ...state.newProjectFormSteps,
        job: {
          ...state.newProjectFormSteps.job,
          roleItens,
        },
      },
    }))
    initializer.current = true
  }

  return null
}
