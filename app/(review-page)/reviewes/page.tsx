import { ReviewsPage } from "@/components/shared/review-page";
import { prisma } from "@/prisma/prisma-client";
export const dynamic = 'force-dynamic';


export default async function Home() {
  const reviews = await prisma.review.findMany({
  })
  return (
   <>
    <ReviewsPage 
    items={reviews}/>
    </>
  );
}