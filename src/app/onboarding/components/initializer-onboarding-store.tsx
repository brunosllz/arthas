'use client'

import { useBoundStore } from '@/store'
import { UserOnboardingInfos } from '@/store/slices/onboarding-slice'
import { useRef } from 'react'

type InitializerOnboardingStore = {
  user: Partial<UserOnboardingInfos>
}

export function InitializerOnboardingStore({
  user,
}: InitializerOnboardingStore) {
  const initializer = useRef(false)

  if (!initializer.current) {
    useBoundStore.setState({ user })
    initializer.current = true
  }

  return null
}
