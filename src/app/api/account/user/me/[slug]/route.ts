import { NextRequest } from 'next/server'
import { prisma } from '@/libs/prisma'

interface SavedUserParams {
  params: {
    slug: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function userProfileMapper(user: any) {
  return {
    id: user.id,
    name: user.name,
    aboutMe: user.about_me,
    seniority: user.seniority,
    role: user.role,
    avatar_url: user.avatar_url,
    state: user.state,
    city: user.city,
    country: user.country,
    slugProfile: user.slug_profile,
    overallRate: user.overall_rate.toPrecision(2),
    linkedinLink: user.linkedin_link,
    githubLink: user.github_link,
    title: user.title,
    skills: user.skills.map((skill: { slug: string }) => skill.slug),
    projectRealized: user.projects_realized,
    involvedProjects: user.projects,
    updatedAt: user.updated_at,
  }
}

export async function GET(_: NextRequest, { params }: SavedUserParams) {
  const slugProfile = params.slug

  try {
    const user = await prisma.users.findUnique({
      where: {
        slug_profile: slugProfile,
      },
      select: {
        id: true,
        name: true,
        about_me: true,
        seniority: true,
        role: true,
        avatar_url: true,
        state: true,
        city: true,
        slug_profile: true,
        country: true,
        overall_rate: true,
        linkedin_link: true,
        github_link: true,
        title: true,
        updated_at: true,
        skills: {
          select: {
            slug: true,
            id: true,
          },
        },
        projects: {
          where: {
            team_members: {
              some: {
                AND: [
                  {
                    status: 'approved',
                  },
                  {
                    users: {
                      slug_profile: slugProfile,
                    },
                  },
                ],
              },
            },
          },
          select: {
            id: true,
            image_url: true,
            name: true,
            status: true,
            team_members: {
              select: {
                id: true,
                users: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: {
            created_at: 'desc',
          },
          take: 3,
        },
        projects_realized: {
          where: {
            user: {
              slug_profile: slugProfile,
            },
          },
          select: {
            project: {
              select: {
                image_url: true,
                name: true,
                description: true,
                team_members: {
                  select: {
                    id: true,
                    users: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

    return Response.json({ user: userProfileMapper(user) })
  } catch (error) {
    console.error(error)
  }
}
