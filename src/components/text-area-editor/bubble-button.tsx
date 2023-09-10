import { HTMLAttributes } from 'react'

type BubbleButtonProps = HTMLAttributes<HTMLButtonElement>

export function BubbleButton(props: BubbleButtonProps) {
  return (
    <button
      type="button"
      className="rounded-md p-2 data-[active=true]:text-violet-400 hover:bg-zinc-600 focus:bg-zinc-600 focus:outline-none"
      {...props}
    />
  )
}
