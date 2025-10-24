import { Catalog } from "@/components/shared/catalog";
import { prisma } from "@/prisma/prisma-client";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const houses = await prisma.house.findMany({
    })
  return (
    <div className="md:pt-[0] pt-20">
      <Catalog items={houses}/>
    </div>
  );
}
