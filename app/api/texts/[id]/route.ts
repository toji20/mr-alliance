import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { prisma } from '@/prisma/prisma-client'

// Обновить текст
export async function PUT(
  request: Request, {params}: {params: Promise<{ id: string }>}
) {
  try {
    const { id } = await params
    const { content } = await request.json()
    const text = await prisma.textContent.update({
      where: { id: id },
      data: { content }
    })
    return NextResponse.json(text)
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка обновления' }, { status: 500 })
  }
}

// Удалить текст
export async function DELETE(
  request: Request, {params}: {params: Promise<{ id: string }>}
) {
  try {
    const { id } = await params
    await prisma.textContent.delete({
      where: { id: id }
    })
    return NextResponse.json({ message: 'Текст удален' })
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка удаления' }, { status: 500 })
  }
}