'use client'

import { HTMLAttributes, createContext, forwardRef, useContext } from 'react'
import { twMerge } from 'tailwind-merge'

interface MultiStepContextProps {
  size: number
  currentStep: number
}

const MultiStepContext = createContext({} as MultiStepContextProps)

const useMultiStepContext = () => useContext(MultiStepContext)

type MultiStepProps = HTMLAttributes<HTMLDivElement> & {
  size: number
  currentStep: number
}

const MultiStepRoot = forwardRef<HTMLDivElement, MultiStepProps>(
  ({ size, currentStep, className, ...props }, ref) => {
    return (
      <MultiStepContext.Provider value={{ currentStep, size }}>
        <div
          ref={ref}
          {...props}
          className={twMerge('flex flex-col', className)}
        />
      </MultiStepContext.Provider>
    )
  },
)

MultiStepRoot.displayName = 'MultiStepRoot'

type MultiStepContentProps = HTMLAttributes<HTMLDivElement>

const MultiStepContent = forwardRef<HTMLDivElement, MultiStepContentProps>(
  ({ className, ...props }, ref) => {
    const { currentStep, size } = useMultiStepContext()
    return (
      <div
        ref={ref}
        className={twMerge('flex items-center space-x-2', className)}
        {...props}
      >
        {Array.from({ length: size }, (_, i) => i + 1).map((step) => {
          return (
            <>
              <div
                key={step}
                data-active={currentStep >= step}
                className="h-3 w-3 rounded-full bg-zinc-900 ring-inset data-[active=true]:bg-none data-[active=true]:ring-2 data-[active=true]:ring-zinc-50"
              />

              {step < size && (
                <div
                  data-active={currentStep - 1 >= step}
                  className="h-0.5 flex-1 rounded-full bg-zinc-900 data-[active=true]:bg-zinc-50"
                />
              )}
            </>
          )
        })}
      </div>
    )
  },
)

MultiStepContent.displayName = 'MultiStepContent'

type MultiStepLabelProps = HTMLAttributes<HTMLSpanElement>

const MultiStepLabel = forwardRef<HTMLSpanElement, MultiStepLabelProps>(
  ({ className, ...props }, ref) => {
    const { currentStep, size } = useMultiStepContext()

    return (
      <span
        ref={ref}
        className={twMerge('text-sm text-muted-foreground', className)}
        {...props}
      >{`Passo ${currentStep} de ${size}`}</span>
    )
  },
)

MultiStepLabel.displayName = 'MultiStepLabel'

export { MultiStepRoot, MultiStepContent, MultiStepLabel }
