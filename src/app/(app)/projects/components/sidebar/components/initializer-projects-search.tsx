'use client'

import { useBoundStore } from '@/store'
import { Param } from '@/store/slices/projects-search-slice'
import { useRef } from 'react'

type InitializerOnboardingStore = {
  selectedProjectsSearchParams: Array<Param>
  daftProjectsSearchParams: Array<Param>
}

export function InitializerProjectsSearchStore({
  selectedProjectsSearchParams,
  daftProjectsSearchParams,
}: InitializerOnboardingStore) {
  const initializer = useRef(false)

  if (!initializer.current) {
    useBoundStore.setState({
      selectedProjectsSearchParams,
      daftProjectsSearchParams,
    })
    initializer.current = true
  }

  return null
}
