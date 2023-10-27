import { HTMLAttributes, InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type InputRootProps = HTMLAttributes<HTMLDivElement> & {
  hasError?: boolean
}

const InputRoot = forwardRef<HTMLDivElement, InputRootProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-has-error={hasError}
        className={twMerge(
          'flex h-[3.25rem] w-full items-center rounded-md border border-input shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring group-disabled:cursor-not-allowed group-disabled:opacity-50 data-[has-error=true]:focus-within:ring-destructive',
          className,
        )}
        {...props}
      />
    )
  },
)

InputRoot.displayName = 'InputRoot'

export type InputControlProps = InputHTMLAttributes<HTMLInputElement>

const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          'group h-full w-full bg-transparent p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

InputControl.displayName = 'Input'

type InputPrefixProps = HTMLAttributes<HTMLSpanElement>

const InputPrefix = forwardRef<HTMLSpanElement, InputPrefixProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={twMerge(
          'pointer-events-none ml-2 rounded-sm bg-zinc-900 px-2 py-[0.5625rem] text-sm text-muted-foreground',
          className,
        )}
        {...props}
      />
    )
  },
)

InputPrefix.displayName = 'InputPrefix'

export type InputMessageErrorProps = InputHTMLAttributes<HTMLSpanElement>

const InputMessageError = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>((props, ref) => {
  return <span ref={ref} className="text-xs text-destructive" {...props} />
})

InputMessageError.displayName = 'InputMessageError'

export { InputRoot, InputPrefix, InputControl, InputMessageError }
