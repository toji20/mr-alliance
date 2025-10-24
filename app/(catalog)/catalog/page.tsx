import { Catalog } from "@/components/shared/catalog";
import { prisma } from "@/prisma/prisma-client";


export default async function Home() {
  const houses = await prisma.house.findMany({
    })
  return (
    <div className="pt-20">
      <Catalog items={houses}/>
    </div>
  );
}
