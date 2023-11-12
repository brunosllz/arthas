'use client'

import lazy from 'next/dynamic'
import { motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const Tabs = lazy(async () => {
  const { Tabs } = await import('@/components/ui/tabs')

  return { default: Tabs }
})

const TabsList = lazy(async () => {
  const { TabsList } = await import('@/components/ui/tabs')

  return { default: TabsList }
})

const TabsTrigger = lazy(async () => {
  const { TabsTrigger } = await import('@/components/ui/tabs')

  return { default: TabsTrigger }
})

const TabsContent = lazy(async () => {
  const { TabsContent } = await import('@/components/ui/tabs')

  return { default: TabsContent }
})

type ProjectRoleTabsProps = {
  projectRoles: Array<{
    id: string
    name: string
    description: string
    membersAmount: number
  }>
}

function useHookWithRefCallback<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [width, setWidth] = useState(0)
  const [x, setX] = useState(0)

  const setRef = useCallback((node: T) => {
    if (node) {
      setWidth(node.scrollWidth - node.offsetWidth)
    }

    ref.current = node
  }, [])

  function nextButton() {
    setX((state) => {
      if (-state >= width) {
        return state
      }

      return state - 156
    })
  }

  function prevButton() {
    setX((state) => {
      if (state === 0) {
        return state
      }

      return state + 156
    })
  }

  return { ref: setRef, width, x, nextButton, prevButton }
}

export function ProjectRoleTabs({ projectRoles }: ProjectRoleTabsProps) {
  const { ref, width, nextButton, x, prevButton } =
    useHookWithRefCallback<HTMLDivElement>()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-zinc-200">Funções</h3>

        <div className="space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={prevButton}
          >
            <ArrowLeft size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextButton}
            className="rounded-full"
          >
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <Tabs defaultValue={projectRoles[0]?.name}>
        <TabsList
          className="flex justify-start space-x-4 bg-transparent"
          asChild
          loop={false}
        >
          <motion.div
            ref={ref}
            className="cursor-grab overflow-hidden"
            whileTap={{ cursor: 'grabbing' }}
          >
            <motion.div
              drag="x"
              animate={{ x }}
              dragConstraints={{ right: 0, left: -width }}
              className="flex items-center justify-start space-x-4"
            >
              {projectRoles.map((role) => (
                <TabsTrigger
                  key={role.id}
                  value={role.name}
                  disabled={role.membersAmount === 0}
                  className="border px-6 py-3 text-xs font-semibold text-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground data-[state=active]:hover:bg-primary data-[state=active]:hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-50"
                >
                  {role.membersAmount === 0 ? '' : `${role.membersAmount} -`}{' '}
                  {role.name}
                </TabsTrigger>
              ))}
            </motion.div>
          </motion.div>
        </TabsList>

        {projectRoles.map((role) => (
          <TabsContent
            key={role.id}
            value={role.name}
            className="mt-8 text-muted-foreground"
          >
            {role.description}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
