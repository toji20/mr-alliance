import { Bg } from "@/components/shared/bg";
import DesignArticle from "@/components/shared/planning";
import { GalleryPage } from "@/components/shared/portfolio";
import { prisma } from "@/prisma/prisma-client";
export const dynamic = 'force-dynamic';


export default async function Home() {
  const galleryImages = await prisma.galleryPhoto.findMany({
    })
  
  return (
   <>
    <Bg
        title="ПАРТФОЛИО"
        background="/main-bg-6.png"
        btnText="ФОТОГАЛЕРЕЯ" url="#Фотогалерея"/>
    <GalleryPage
    items={galleryImages}/>
    </>
  );
}