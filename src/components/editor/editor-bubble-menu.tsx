/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { BubbleMenu, BubbleMenuProps } from '@tiptap/react'

import { Tooltip, TooltipProvider } from '../ui/tooltip'
import { TooltipContent } from '@radix-ui/react-tooltip'

import {
  Bold,
  Italic,
  LucideIcon,
  Strikethrough as StrikethroughIcon,
} from 'lucide-react'
import { BubbleMenuButton } from './bubble-menu-button'

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'>

type BubbleMenuItens = {
  isActive: boolean
  command: () => void
  icon: LucideIcon
  commandLabel: Array<{
    type: 'symbol' | 'letter'
    value: string
  }>
}

export function EditorBubbleMenu(props: EditorBubbleMenuProps) {
  const bubbleMenuItens: BubbleMenuItens[] = [
    {
      command: () => props?.editor?.chain().focus().toggleBold().run(),
      icon: Bold,
      isActive: props?.editor?.isActive('bold')!,
      commandLabel: [
        { type: 'symbol', value: '⌘' },
        { type: 'letter', value: 'B' },
      ],
    },
    {
      command: () => props?.editor?.chain().focus().toggleItalic().run(),
      icon: Italic,
      isActive: props?.editor?.isActive('italic')!,
      commandLabel: [
        { type: 'symbol', value: '⌘' },
        { type: 'letter', value: 'I' },
      ],
    },
    {
      command: () => props?.editor?.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
      isActive: props?.editor?.isActive('strike')!,
      commandLabel: [
        { type: 'symbol', value: '⌘' },
        { type: 'letter', value: 'S' },
      ],
    },
  ]

  return (
    <BubbleMenu
      tippyOptions={{ duration: 100 }}
      className="space-x-1 overflow-hidden rounded-md border border-zinc-700 bg-secondary p-1 shadow-xl shadow-black/30"
      {...props}
    >
      {bubbleMenuItens.map(
        ({ command, commandLabel, icon: Icon, isActive }, index) => (
          <TooltipProvider key={index} disableHoverableContent={true}>
            <Tooltip>
              <BubbleMenuButton onClick={command} data-active={isActive}>
                <Icon size={14} />
              </BubbleMenuButton>

              <TooltipContent
                sideOffset={12}
                className="pointer-events-none flex select-none gap-1.5 rounded-md border border-zinc-700 bg-background p-1.5 shadow-xl shadow-black/30 "
              >
                {commandLabel.map((label, index) => (
                  <>
                    {label.type === 'symbol' ? (
                      <div className="rounded-sm bg-zinc-800 px-1.5 py-0 text-center shadow-md ring-1 ring-zinc-700">
                        <kbd key={index} className="text-[10px] font-light">
                          {label.value}
                        </kbd>
                      </div>
                    ) : (
                      <div className="rounded-sm bg-secondary px-1.5 py-0 text-center shadow-md ring-1 ring-zinc-700">
                        <kbd
                          key={index}
                          className="text-xs font-light leading-none"
                        >
                          {label.value}
                        </kbd>
                      </div>
                    )}
                  </>
                ))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      )}
    </BubbleMenu>
  )
}
