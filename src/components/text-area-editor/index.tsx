'use client'

import { EditorContent, BubbleMenu, useEditor } from '@tiptap/react'

import { Bold, Italic, Strikethrough as StrikethroughIcon } from 'lucide-react'

import { BubbleButton } from './bubble-button'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Strikethrough from '@tiptap/extension-strike'
import { Markdown } from 'tiptap-markdown'

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

const CustomStrikethrough = Strikethrough.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-s': () => this.editor.commands.toggleStrike(),
    }
  },
})

interface TextAreaEditorProps {
  id: string
  placeholder: string
  disabled?: boolean
  onChange: (value: string) => void
}

export function TextAreaEditor({
  id,
  onChange,
  disabled = false,
  placeholder,
}: TextAreaEditorProps) {
  const editor = useEditor({
    extensions: [
      Markdown,
      CustomStrikethrough,
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
        placeholder,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
    onBlur(props) {
      onChange(props.editor.storage.markdown.getMarkdown())
    },
  })

  return (
    <>
      <EditorContent
        id={id}
        disabled={disabled}
        editor={editor}
        className="prose prose-sm prose-invert h-[129.6px] overflow-y-auto rounded-md border border-input px-3 py-1 text-foreground scrollbar scrollbar-track-transparent scrollbar-thumb-secondary scrollbar-track-rounded-md scrollbar-thumb-rounded-md scrollbar-w-1 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring prose-p:m-0 "
      />

      {editor && (
        <>
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            className="overflow-hidden rounded-md border border-zinc-600 bg-secondary p-0.5 shadow-xl shadow-black/30"
          >
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive('bold')}
            >
              <Bold size={14} />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive('italic')}
            >
              <Italic size={14} />
            </BubbleButton>

            <BubbleButton
              data-active={editor.isActive('strike')}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <StrikethroughIcon size={14} />
            </BubbleButton>
          </BubbleMenu>
        </>
      )}
    </>
  )
}
