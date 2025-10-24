import { ReviewsPage } from "@/components/shared/review-page";
import { prisma } from "@/prisma/prisma-client";

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