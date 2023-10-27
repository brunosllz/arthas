'use client'

import { EditorContent, useEditor } from '@tiptap/react'

import { EditorBubbleMenu } from './editor-bubble-menu'
import { editorExtensions } from './extensions'
import { twMerge } from 'tailwind-merge'
import { Content } from 'next/font/google'

// JSON SCHEMA FOR VALIDATE IN ZOD RESOLVER - NOT IMPLEMENTED
// export const textAreaEditorSchema = z.object(
//   {
//     type: z.enum(['doc'], {
//       errorMap: (issue) => {
//         switch (issue.code) {
//           case 'invalid_enum_value':
//             return {
//               message: 'Invalid doc type',
//             }
//           default:
//             return {
//               message: 'Invalid doc type',
//             }
//         }
//       },
//     }),
//     content: z.array(
//       z
//         .object(
//           {
//             type: z.enum(['paragraph']),
//             content: z.array(
//               z.object({
//                 type: z.enum(['text'], {
//                   errorMap: (issue) => {
//                     switch (issue.code) {
//                       case 'invalid_enum_value':
//                         return {
//                           message: 'Invalid content type',
//                         }
//                       default:
//                         return {
//                           message: 'Invalid content type',
//                         }
//                     }
//                   },
//                 }),
//                 text: z.string({ required_error: 'Add content' }).min(5, {
//                   message: 'The content should be grant than 5 characters',
//                 }),
//               }),
//             ),
//           },
//           { required_error: 'Add content' },
//         )
//         .strict({ message: 'Invalid content' }),
//     ),
//   },
//   { required_error: 'Add content' },
// )

// type TextAreaEditorSchema = z.infer<typeof textAreaEditorSchema>

interface EditorProps {
  id?: string
  placeholderValue: string
  disabled?: boolean
  className?: string
  content?: string
  onUpdateMarkdown?: (value: string) => void
  onBlurMarkdown?: (value: string) => void
}

export function Editor({
  id,
  onBlurMarkdown,
  onUpdateMarkdown,
  disabled = false,
  className,
  placeholderValue,
  content,
}: EditorProps) {
  const editor = useEditor({
    extensions: editorExtensions({
      placeholderValue,
    }),
    content,
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
  })

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
        disabled={disabled}
        editor={editor}
        className={twMerge(
          'prose prose-sm prose-invert h-[9.75rem] overflow-y-auto rounded-md border border-input p-4 text-foreground scrollbar scrollbar-track-transparent scrollbar-thumb-secondary scrollbar-track-rounded-md scrollbar-thumb-rounded-md scrollbar-w-1 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring prose-p:m-0 ',
          className,
        )}
      />
    </>
  )
}
