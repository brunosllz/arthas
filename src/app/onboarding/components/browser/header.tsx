'use client'

import { useBoundStore } from '@/store'
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  MoreVertical,
  Plus,
  RotateCw,
  X,
} from 'lucide-react'

export function BrowserHeader() {
  const user = useBoundStore((state) => state.user)

  return (
    <header className="w-full bg-[#18181B] pt-[0.5625rem]">
      <div className="flex h-[2.390625rem] items-center ">
        <div className="h-full bg-[#27272A]">
          <div className="flex h-full items-center gap-1.5 rounded-br-lg bg-[#18181B] px-4">
            <div className="h-3 w-3 rounded-full bg-[#CE5347]" />
            <div className="h-3 w-3 rounded-full bg-[#D6A243]" />
            <div className="h-3 w-3 rounded-full bg-[#58A942]" />
          </div>
        </div>

        <div className="flex h-[2.390625rem] w-full max-w-[14.484375rem] items-center justify-between rounded-t-lg bg-[#27272A] px-3.5 py-2.5">
          <div className="inline-flex items-center gap-1.5">
            <span>x</span>
            <span className="text-[0.84375rem] leading-none">
              Dev Xperience
            </span>
          </div>
          <X size={14} />
        </div>

        <div className="h-full bg-[#27272A]">
          <div className="flex h-full items-center gap-1.5 rounded-bl-lg bg-[#18181B] px-4">
            <Plus size={18} />
          </div>
        </div>
      </div>

      <div className="flex h-[2,390625rem] items-center justify-center space-x-[1.40625rem] bg-zinc-800 py-[4.5px] pl-[1.125rem] ">
        <div className="inline-flex h-full items-center justify-center gap-3">
          <ArrowLeft size={20} />
          <ArrowRight size={20} className="opacity-20" />
          <RotateCw size={20} />
        </div>

        <div className="inline-flex h-[1.828125rem] w-full items-center space-x-[0.703125rem] rounded-full bg-[#18181B] py-[0.351875rem] pl-[0.703125rem]">
          <Lock size={12.5} />
          <div className="flex items-center justify-center ">
            <span className="text-[0.84375rem] leading-none">
              https://www.devxperience.app/me/
            </span>

            {user.slugProfile ? (
              <span className="text-[0.84375rem] leading-none">
                {user.slugProfile}
              </span>
            ) : (
              <div className="ml-0.5 h-4 w-[9.375rem] rounded-full bg-zinc-800" />
            )}
          </div>
        </div>

        <div className="pr-4">
          <MoreVertical size={18} />
        </div>
      </div>
    </header>
  )
}
