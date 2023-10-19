'use client'

import {
  HTMLAttributes,
  createContext,
  // useContext,
  useId,
  // ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  ReactNode,
  LabelHTMLAttributes,
} from 'react'
import { twMerge } from 'tailwind-merge'

import { UploadCloud, User } from 'lucide-react'
import { useUploadStore } from '@/store'
import { ChangeHandler } from 'react-hook-form'

interface RootProps extends HTMLAttributes<HTMLDivElement> {
  multiple?: boolean
}

interface FileInputContextType {
  id: string
}

const FileInputContext = createContext({} as FileInputContextType)

// const useFileInput = () => useContext(FileInputContext)

function FileInputRoot({ id, ...props }: RootProps) {
  const customId = useId()

  return (
    <FileInputContext.Provider
      value={{
        id: id ?? customId,
      }}
    >
      <div {...props} className={twMerge('group w-full', props.className)} />
    </FileInputContext.Provider>
  )
}

interface FileInputControlProps extends InputHTMLAttributes<HTMLInputElement> {
  // uploadPrefix?: 'projects' | 'avatar'
  onValueChange?: ChangeHandler
}

const FileInputControl = forwardRef<HTMLInputElement, FileInputControlProps>(
  (
    {
      //  uploadPrefix = 'projects',
      ...props
    },
    ref,
  ) => {
    /**
     * we using dropzone for control this input
     */

    // const { addFile } = useUploadStore()

    // async function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    //   if (!event.target.files?.length) {
    //     return
    //   }

    //   const file = event.target.files[0]

    //   await addFile({
    //     file,
    //     uploadPrefix,
    //   })

    //   props.onValueChange?.(event)
    // }

    return (
      <input
        type="file"
        ref={ref}
        className="sr-only"
        // onChange={handleFilesSelected}
        multiple={false}
        {...props}
      />
    )
  },
)

FileInputControl.displayName = 'FileInputControl'

function FileInputImagePreview() {
  const { previewUrl } = useUploadStore()

  if (previewUrl === null) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-secondary">
        <User className="h-8 w-8 text-foreground " />
      </div>
    )
  } else {
    return (
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-md">
        <img className="h-gull w-full object-cover" src={previewUrl} alt="" />
      </div>
    )
  }
}

type FileInputTriggerProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children?: ReactNode
}

const FileInputTrigger = forwardRef<HTMLLabelElement, FileInputTriggerProps>(
  ({ children, ...props }, ref) => {
    return (
      <div className="flex-1 space-y-1">
        <label
          ref={ref}
          className="group flex w-full flex-1 cursor-pointer flex-col items-center gap-3 rounded-md border border-input px-6 py-4 text-center text-muted-foreground group-focus-within:border-input group-focus-within:ring-1 group-focus-within:ring-ring data-[drag-active=true]:bg-muted data-[drag-active=true]:text-foreground hover:bg-muted hover:text-foreground "
          {...props}
        >
          <span className="rounded-full bg-secondary p-2 group-hover:bg-accent">
            <UploadCloud className="h-5 w-5 text-muted-foreground group-hover:text-foreground " />
          </span>

          <div className="flex flex-col items-center gap-1">
            <span className="text-sm">
              <span className="font-semibold text-foreground">
                Click to upload
              </span>{' '}
              or drag and drop
            </span>

            <span className="text-xs">SVG, PNG, JPG (max. 100x100px)</span>
          </div>
        </label>

        {children}
      </div>
    )
  },
)

FileInputTrigger.displayName = 'FileInputTrigger'

export {
  FileInputRoot,
  FileInputTrigger,
  FileInputImagePreview,
  FileInputControl,
}
