import { Extensions } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import Placeholder from '@tiptap/extension-placeholder'
import HardBreak from '@tiptap/extension-hard-break'
import { CustomStrikethrough } from './custom-strike-through'

type editorExtensions = {
  placeholderValue: string
}

export function editorExtensions({
  placeholderValue,
}: editorExtensions): Extensions {
  return [
    CustomStrikethrough,
    Markdown.configure({
      breaks: true,
    }),
    HardBreak.extend({
      addKeyboardShortcuts() {
        return {
          Enter: () => {
            return this.editor.commands.setHardBreak()
          },
        }
      },
    }),
    StarterKit.configure({
      code: false,
      codeBlock: false,
      listItem: false,
      bulletList: false,
      orderedList: false,
      blockquote: false,
      heading: false,
    }),
    Placeholder.configure({
      emptyEditorClass:
        'cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-0 before:left-0 before:text-muted-foreground before-pointer-events-none',
      placeholder: placeholderValue,
    }),
  ]
}
