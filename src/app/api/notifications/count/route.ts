import { prisma } from '@/libs/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request })

  try {
    const countNotificationsFromUser = await prisma.notification.count({
      where: {
        authorId: token?.sub,
      },
    })

    return NextResponse.json({ count: countNotificationsFromUser })
  } catch (err) {
    console.log(err)
  }
}
