'use client'

import { ReactNode, useState } from 'react'

import { Tabs, TabsList } from '@/components/ui/tabs'
import { TabItem } from '../../../components/tabs/tab-item'

type ProjectsTabsProps = {
  children: ReactNode
  isProjectAuthorOrOwner: boolean
}

export function ProjectManagerTabs({
  children,
  isProjectAuthorOrOwner,
}: ProjectsTabsProps) {
  const [currentTab, setCurrentTab] = useState<string>('project')

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab}>
      <TabsList className="mt-12 flex w-full items-center justify-start rounded-none border-b bg-transparent">
        <TabItem
          title="Projeto"
          value="project"
          isSelected={currentTab === 'project'}
        />
        <TabItem
          title="Equipe"
          value="team"
          isSelected={currentTab === 'team'}
        />
        <TabItem
          title="Solicitações"
          value="requests"
          disabled={!isProjectAuthorOrOwner}
          isSelected={currentTab === 'requests'}
        />
      </TabsList>

      {children}
    </Tabs>
  )
}
