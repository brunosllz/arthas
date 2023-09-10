import { env } from '@/env'
import { r2 } from '@/libs/cloudflare-r2'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z } from 'zod'

const uploadFileBodySchema = z.object({
  uploadPrefix: z.enum(['projects', 'avatar']),
  fileContentType: z.string().min(1),
})

export async function POST(request: NextRequest) {
  const requestBody = await request.json()

  const { fileContentType, uploadPrefix } =
    uploadFileBodySchema.parse(requestBody)

  const token = await getToken({ req: request, secret: env.NEXTAUTH_SECRET })
  const userId = token?.sub

  const fileKey = `${uploadPrefix}/profile-${userId}-${new Date().getTime()}.${fileContentType}`

  const publicUrl = `${env.CLOUDFLARE_PUBLIC_BUCKET_URL}${fileKey}`

  try {
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: env.CLOUDFLARE_UPLOAD_BUCKET_NAME,
        Key: fileKey,
        ContentType: `image/${fileContentType}`,
      }),
      { expiresIn: 60 * 5 }, // 5 minutes
    )

    return NextResponse.json({
      signedUrl,
      publicUrl,
    })
  } catch (err) {
    console.log('error')
  }
}
