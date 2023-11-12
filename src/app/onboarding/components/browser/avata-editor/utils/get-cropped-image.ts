import { Area } from 'react-easy-crop'
import { createImage } from './create-image'

export async function getCroppedImage(sourceImage: string, crop: Area) {
  const image = await createImage(sourceImage)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width
  canvas.height = crop.height

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  )

  try {
    return new Promise<{ fileUrl: string; file: File }>((resolve) => {
      canvas.toBlob((file) => {
        if (file) {
          const fileCreated = new File([file], 'avatar.png', {
            type: 'image/png',
          })

          resolve({
            file: fileCreated,
            fileUrl: URL.createObjectURL(fileCreated),
          })
        }
      }, 'image/png')
    })
  } catch (error) {
    console.error(error)
    return null
  }
}
