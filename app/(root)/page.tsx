import { Catalog } from "@/components/shared/catalog";
import { Header } from "@/components/shared/header";
import { MainBg } from "@/components/shared/main-bg";
import { NavBg } from "@/components/shared/nav-bg";
import PageLoader from "@/components/shared/pageLoader";
import { prisma } from "@/prisma/prisma-client";
import Image from "next/image";

export default async function Home() {
  const houses = await prisma.house.findMany({
  })
  return (
    <div className="">
      <PageLoader/>
      <Header/>
      <MainBg/>
      <NavBg/>
      <Catalog items={houses}/>
    </div>
  );
}
