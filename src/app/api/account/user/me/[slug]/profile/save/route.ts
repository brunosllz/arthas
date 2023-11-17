import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/libs/prisma'
import { env } from '@/env'
// import { revalidateTag } from 'next/cache'
import dayjs from 'dayjs'

const savedUserBodySchema = z.object({
  slugProfile: z.string(),
  name: z.string(),
  title: z.string(),
  role: z.string(),
  seniority: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  linkedinLink: z.string(),
  githubLink: z.string(),
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
        city: user.city,
        country: user.country,
        github_link: user.githubLink,
        linkedin_link: user.linkedinLink,
        name: user.name,
        role: user.role,
        seniority: user.seniority,
        slug_profile: user.slugProfile,
        state: user.state,
        title: user.title,
        profile_url: `${env.NEXT_PUBLIC_VERCEL_URL}/me/${user.slugProfile}`,
        updated_at: dayjs().toISOString(),
      },
    })

    return new Response()
  } catch (error) {
    console.error(error)
  }
}
