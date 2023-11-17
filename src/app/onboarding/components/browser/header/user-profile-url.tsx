'use client'

import { useBoundStore } from '@/store'

export function UserProfileUrl() {
  const user = useBoundStore.getState().user

  return (
    <>
      {user.slugProfile ? (
        <span className="text-[0.84375rem] leading-none">
          {user.slugProfile}
        </span>
      ) : (
        <div className="ml-0.5 h-4 w-[9.375rem] rounded-full bg-zinc-800" />
      )}
    </>
  )
}
