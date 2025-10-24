import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const houses = await prisma.house.findMany({
      orderBy: { id: 'desc' }
    })
    return NextResponse.json(houses)
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка загрузки домов' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const house = await prisma.house.create({
      data: {
        name: body.name,
        price: body.price,
        size: body.size,
        imageUrl: body.imageUrl,
        features: body.features,
        descr: body.descr
      }
    })
    return NextResponse.json(house)
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка создания дома' }, { status: 500 })
  }
}