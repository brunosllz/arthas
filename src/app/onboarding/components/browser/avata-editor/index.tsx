'use client'

import { Button } from '@/components/ui/button'
import { useBoundStore } from '@/store'
import { useCallback, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { getCroppedImage } from './utils/get-cropped-image'
import { Loader2 } from 'lucide-react'

export function AvatarEditor() {
  const {
    cropAvatarImageStatus,
    getPreviewUrlFromBucket,
    croppedAvatarImagePreviewURL,
  } = useBoundStore((state) => {
    return {
      croppedAvatarImagePreviewURL: state.croppedAvatarImagePreviewURL,
      cropAvatarImageStatus: state.cropAvatarImageStatus,
      getPreviewUrlFromBucket: state.getPreviewUrlFromBucket,
    }
  })
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedArea, setCroppedArea] = useState<Area>({} as Area)

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }, [])

  const handleCroppedAvatarImage = useCallback(async () => {
    try {
      useBoundStore.setState({
        cropAvatarImageStatus: 'loading',
      })

      if (!croppedAvatarImagePreviewURL) return

      const croppedImage = await getCroppedImage(
        croppedAvatarImagePreviewURL,
        croppedArea,
      )

      if (!croppedImage) return

      await getPreviewUrlFromBucket({
        imageFile: croppedImage.file,
        imageUrl: croppedImage.fileUrl,
      })
    } catch (error) {
      console.error(error)
    }
  }, [croppedAvatarImagePreviewURL, croppedArea, getPreviewUrlFromBucket])

  return (
    <div className="w-full max-w-[500px] space-y-6">
      <div className="relative h-[500px] w-full">
        {croppedAvatarImagePreviewURL && (
          <Cropper
            image={croppedAvatarImagePreviewURL}
            crop={crop}
            objectFit="cover"
            cropSize={{ width: 420, height: 420 }}
            zoom={1}
            cropShape="round"
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
          />
        )}
      </div>

      <Button
        type="button"
        variant="outline"
        disabled={cropAvatarImageStatus === 'loading'}
        className="w-full"
        onClick={handleCroppedAvatarImage}
      >
        {cropAvatarImageStatus === 'loading' ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          'Aplicar'
        )}
      </Button>
    </div>
  )
}
