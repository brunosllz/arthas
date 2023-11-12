import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/libs/prisma'
import { env } from '@/env'

const savedUserBodySchema = z.object({
  name: z.string().min(1),
  avatarUrl: z.string().url(),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  linkedinLink: z.string().url().optional(),
  githubLink: z.string().url().optional(),
  aboutMe: z.string().optional(),
  role: z.string().min(1),
  seniority: z.string().min(1),
  slugProfile: z.string().min(1),
  title: z.string().min(1),
  skills: z.array(z.string()),
  onboard: z.string(),
})

interface SavedUserParams {
  params: {
    id: string
  }
}

export async function POST(request: NextRequest, { params }: SavedUserParams) {
  const userId = params.id
  const requestBody = await request.json()

  const user = savedUserBodySchema.parse(requestBody)

  try {
    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        about_me: user.aboutMe,
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
        avatar_url: user.avatarUrl,
        profile_url: `${env.NEXT_PUBLIC_VERCEL_URL}/me/${user.slugProfile}`,
        onboard: user.onboard,
      },
    })

    if (user.skills) {
      await Promise.all(
        user.skills.map(async (skill) => {
          await prisma.skills.upsert({
            where: {
              slug: skill,
            },
            update: {
              users: {
                connect: {
                  id: userId,
                },
              },
            },
            create: {
              users: {
                connect: {
                  id: userId,
                },
              },
              slug: skill.toLowerCase(),
            },
          })
        }),
      )
    }

    return new Response()
  } catch (error) {
    console.error(error)
  }
}
