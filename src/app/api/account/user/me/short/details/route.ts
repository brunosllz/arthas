import { NextRequest } from 'next/server'
import { prisma } from '@/libs/prisma'
import { getToken } from 'next-auth/jwt'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shortDetailsFromUserMapper(user: any) {
  return {
    overallRate: user.overall_rate.toPrecision(2),
    count: {
      projectRealized: user._count.projects_realized,
    },
    lastProjectRealized: user.projects_realized.length
      ? user.projects_realized[0].occurred_at
      : null,
  }
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET })

  if (!token) {
    return new Response(null, {
      status: 401,
      statusText: 'Unauthorized',
    })
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: token.sub,
      },
      select: {
        overall_rate: true,
        _count: {
          select: {
            projects_realized: true,
          },
        },
        projects_realized: {
          select: {
            occurred_at: true,
          },
          take: 1,
          orderBy: {
            occurred_at: 'desc',
          },
        },
      },
    })

    if (!user) {
      return new Response(null, {
        status: 401,
        statusText: 'Unauthorized',
      })
    }

    return Response.json({
      shortDetailsFromCurrentUser: shortDetailsFromUserMapper(user),
    })
  } catch (error) {
    console.error(error)
  }
}
