import { Bg } from "@/components/shared/bg";
import DesignArticle from "@/components/shared/planning";
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
   <>
    <Bg
        title="ПРОЕКТИРОВАНИЕ"
        background="/main-bg-2.png"/>
    <DesignArticle/>
    </>
  );
}