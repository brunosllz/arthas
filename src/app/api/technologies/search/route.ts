import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const search = searchParams.get('q')

  const pageIndex = z.coerce
    .number()
    .default(0)
    .parse(searchParams.get('pageIndex'))

  const pageSize = z.coerce
    .number()
    .default(20)
    .parse(searchParams.get('pageSize'))

  const searchWhere: Prisma.TechnologyWhereInput = {}

  if (search?.length) {
    searchWhere.slug = {
      contains: search,
    }
  }

  try {
    const foundTechnologies = await prisma.technology.findMany({
      where: searchWhere,
      skip: pageIndex * pageSize,
      take: pageSize,
    })

    const technologies = foundTechnologies.map((technology) => technology.slug)

    return NextResponse.json({ technologies })
  } catch (err) {
    console.log(err)
  }
}
