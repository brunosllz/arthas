'use client'

import { ReactNode, useState } from 'react'

import { Tabs, TabsList } from '@/components/ui/tabs'
import { TabItem } from '../../components/tabs/tab-item'

type ProjectsTabsProps = {
  children: ReactNode
}

export function ProjectsTabs({ children }: ProjectsTabsProps) {
  const [currentTab, setCurrentTab] = useState<string>('creator')

  return (
    <Tabs
      defaultValue="creator"
      value={currentTab}
      onValueChange={setCurrentTab}
    >
      <TabsList className="mt-12 flex w-full items-center justify-start rounded-none border-b bg-transparent">
        <TabItem
          title="Sou Criador"
          value="creator"
          isSelected={currentTab === 'creator'}
        />
        <TabItem
          title="Estou envolvido"
          value="involved"
          isSelected={currentTab === 'involved'}
        />
      </TabsList>

      {children}
    </Tabs>
  )
}
