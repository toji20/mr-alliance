import { Bg } from "@/components/shared/bg";
import ConstructionArticle from "@/components/shared/construction-article";
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
   <>
       <Bg
       title="СТРОИТЕЛЬСТВО ДОМОВ"
       background="/main-bg-3.png"/>
    <ConstructionArticle/>
    </>
  );
}