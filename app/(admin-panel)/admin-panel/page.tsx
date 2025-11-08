import { AdminGroupCard } from '@/components/shared/admin-catalog-group-card'
import { prisma } from '@/prisma/prisma-client'
import { TextEditor } from '@/components/shared/admin-text-editor'
import { getUserSession } from '@/lib/get-user-session'
import { redirect } from 'next/navigation'

interface TextContent {
  id: string
  key: string
  content: string
  category?: string
}

export default async function Home() {
  const houses = await prisma.house.findMany({
  })
  const galleryPhoto = await prisma.galleryPhoto.findMany({
  })
  const galleryCategories = await prisma.categoryGalleryPhoto.findMany({
    include: {
      galleryPhoto: true
    }
    })
  const session = await getUserSession();
  if (!session?.id) {
    return redirect('/not-auth')
  }
  const user = await prisma.user.findFirst({
         where: {
             id: Number(session?.id),
         }
     });
     if (user?.role === 'USER') {
        return redirect('/not-auth');
     }
  return (
    <>
    <TextEditor items={houses} galleryPhotos={galleryPhoto} category={galleryCategories}/>
    </>
  )
}