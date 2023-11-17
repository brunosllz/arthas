import { ComponentProps } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { twMerge } from 'tailwind-merge'

type MarkdownWrapperProps = ComponentProps<typeof Markdown>
export function MarkdownWrapper({ className, ...props }: MarkdownWrapperProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      className={twMerge(
        'prose prose-invert break-all leading-relaxed text-muted-foreground prose-p:m-0',
        className,
      )}
      {...props}
    />
  )
}
