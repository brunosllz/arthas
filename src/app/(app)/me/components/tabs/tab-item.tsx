import { motion } from 'framer-motion'

import { TabsTrigger } from '@/components/ui/tabs'

interface TabItemProps {
  value: string
  title: string
  isSelected: boolean
  disabled?: boolean
}

export function TabItem({ title, value, isSelected, disabled }: TabItemProps) {
  return (
    <TabsTrigger
      value={value}
      disabled={disabled}
      className="group relative px-6 pb-4 outline-none"
    >
      <span
        data-is-selected={isSelected}
        className="whitespace-nowrap text-base font-normal group-hover:text-primary data-[is-selected=true]:font-medium"
      >
        {title}
      </span>

      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
        />
      )}
    </TabsTrigger>
  )
}
