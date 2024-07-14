'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import { Editor as EditorType } from '@tiptap/core'
import { editorExtensions } from './extensions'
import { twMerge } from 'tailwind-merge'

import { EditorBubbleMenu } from './editor-bubble-menu'
import { useEffect } from 'react'

interface EditorProps {
  id?: string
  placeholderValue: string
  config: {
    editable?: boolean
    className?: string
    maxLength?: number
  }
  content?: string
  onUpdateMarkdown?: (value: string) => void
  onBlurMarkdown?: (value: string) => void
  onFocusMarkdown?: (editor: EditorType) => void
}

export function Editor({
  id,
  onBlurMarkdown,
  onUpdateMarkdown,
  onFocusMarkdown,
  config: { editable = true, className, maxLength },
  placeholderValue,
  content,
}: EditorProps) {
  const editor = useEditor({
    editable,
    extensions: editorExtensions({
      placeholderValue,
    }),
    content,
    parseOptions: { preserveWhitespace: true },
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
    onBlur(props) {
      if (onBlurMarkdown) {
        onBlurMarkdown(props.editor.storage.markdown.getMarkdown())
      }
    },
    onUpdate(props) {
      if (onUpdateMarkdown) {
        onUpdateMarkdown(props.editor.storage.markdown.getMarkdown())
      }
    },
    onFocus(props) {
      if (onFocusMarkdown) {
        onFocusMarkdown(props.editor)
      }
    },
  })

  useEffect(() => {
    if (editor) {
      editor.setOptions({ editable })
      editor.view.update(editor.view.props)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable])

  if (!editor) {
    return (
      <div
        className={twMerge(
          'prose-sm prose-invert h-[9.75rem] rounded-md border border-input p-4 text-muted-foreground',
          className,
        )}
      >
        {placeholderValue}
      </div>
    )
  }

  return (
    <>
      <EditorBubbleMenu editor={editor} />

      <EditorContent
        id={id}
        editor={editor}
        maxLength={maxLength}
        className={twMerge(
          'prose prose-sm prose-invert h-[9.75rem] overflow-y-auto rounded-md border border-input p-4 text-foreground scrollbar scrollbar-track-transparent scrollbar-thumb-secondary scrollbar-track-rounded-md scrollbar-thumb-rounded-md scrollbar-w-1 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring prose-p:m-0 ',
          className,
        )}
      />
    </>
  )
}
