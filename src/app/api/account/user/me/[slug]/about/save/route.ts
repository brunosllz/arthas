import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/libs/prisma'

import dayjs from 'dayjs'

const savedUserBodySchema = z.object({
  aboutMe: z.string().max(1200).optional(),
  skills: z.array(z.string()),
})

interface SavedUserParams {
  params: {
    slug: string
  }
}

export async function POST(request: NextRequest, { params }: SavedUserParams) {
  const slugProfile = params.slug
  // console.log(slugProfile)
  const requestBody = await request.json()

  // console.log(requestBody)
  const user = savedUserBodySchema.parse(requestBody)

  try {
    await prisma.users.update({
      where: {
        slug_profile: slugProfile,
      },
      data: {
        about_me: user.aboutMe,
        skills: {
          connectOrCreate: user.skills.map((skill) => ({
            where: {
              slug: skill,
            },
            create: {
              slug: skill,
            },
          })),
        },
        updated_at: dayjs().toISOString(),
      },
    })

    return new Response()
  } catch (error) {
    console.error(error)
  }
}
