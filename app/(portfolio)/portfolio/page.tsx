import { Bg } from "@/components/shared/bg";
import { Footer } from "@/components/shared/footer";
import DesignArticle from "@/components/shared/planning";
import { GalleryPage } from "@/components/shared/portfolio";
import { prisma } from "@/prisma/prisma-client";
export const dynamic = 'force-dynamic';


export default async function Home() {
  const galleryCategories = await prisma.categoryGalleryPhoto.findMany({
    include: {
      galleryPhoto: true
    }
    })
  
  return (
   <>
    <Bg
        title="ПОРТФОЛИО"
        background="/main-bg-6.png"
        btnText="ФОТОГАЛЕРЕЯ" url="#Фотогалерея"/>
    <div className="pt-8 md:pt-16">
    {
      galleryCategories.map((item,id) => (
        <GalleryPage
          key={id}
          items={item.galleryPhoto}
          name={item.name}
          categoryId={item.id}/>
      ))
    } 
    </div>
    <Footer/>
    </>
   
  );
}