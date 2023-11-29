/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { HTMLAttributes, MouseEvent, useEffect, useRef } from 'react'
import { useTrackSelectedStep } from '../contexts/track-selected-step-context'
import { twMerge } from 'tailwind-merge'

type InputTrackerProps = HTMLAttributes<HTMLDivElement>

export function InputTracker({ ...props }: InputTrackerProps) {
  const { handleSetCurrentTarget } = useTrackSelectedStep()
  const containerRef = useRef<HTMLDivElement | null>(null)

  function handleMouseEnter(event: MouseEvent<HTMLDivElement>) {
    const currentTarget = event.currentTarget

    const firstInputChild = currentTarget.getElementsByTagName('input')[0]
    const hasInputChildren = !!firstInputChild

    if (!hasInputChildren) {
      const hasEditorContainer =
        currentTarget.getElementsByClassName('prose')[0]

      if (hasEditorContainer) {
        return handleSetCurrentTarget(hasEditorContainer.id)
      }

      const divContainer = currentTarget.getElementsByTagName('div')

      return Array.from({ length: divContainer.length }).forEach((_, index) => {
        const hasIdIdentifierOnDiv = divContainer.item(index)?.id

        if (hasIdIdentifierOnDiv) {
          return handleSetCurrentTarget(hasIdIdentifierOnDiv)
        }
      })
    }

    const isInputFile = firstInputChild.type === 'file'

    if (isInputFile) {
      return handleSetCurrentTarget(`${firstInputChild.id}-container`)
    }

    handleSetCurrentTarget(firstInputChild.id)
  }

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const selectedInput = container.getElementsByTagName('button')[0]

    const hasSelectChildren = !!selectedInput

    if (hasSelectChildren) {
      selectedInput.addEventListener('focus', () => {
        handleSetCurrentTarget(selectedInput.id)
      })

      return () =>
        selectedInput.removeEventListener('focus', () => {
          handleSetCurrentTarget(selectedInput.id)
        })
    }

    const firstInputChild = container.getElementsByTagName('input')[0]
    const hasInputChildren = !!firstInputChild

    if (!hasInputChildren) {
      return
    }

    const isInputFile = firstInputChild.type === 'file'

    if (isInputFile) {
      const dropzoneContainer = container
        .getElementsByTagName('div')
        .namedItem(`${firstInputChild.id}-container`)

      if (!dropzoneContainer) {
        return
      }

      dropzoneContainer.addEventListener('focus', () => {
        handleSetCurrentTarget(`${firstInputChild.id}-container`)
      })

      return () =>
        dropzoneContainer.removeEventListener('focus', () => {
          handleSetCurrentTarget(`${firstInputChild.id}-container`)
        })
    }

    firstInputChild.addEventListener('focus', () => {
      handleSetCurrentTarget(firstInputChild.id)
    })

    return () =>
      firstInputChild.removeEventListener('focus', () => {
        handleSetCurrentTarget(firstInputChild.id)
      })
  }, [])

  return (
    <div
      ref={containerRef}
      className={twMerge('space-y-3.5', props.className)}
      onMouseEnter={(event) => handleMouseEnter(event)}
      {...props}
    />
  )
}
