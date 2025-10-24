import '@/styles/main-bg.css'
import DesignProjectPage from "@/components/shared/apartament-design-article";
import { Bg } from "@/components/shared/bg";
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
   <>
    <Bg
    title="ДИЗАЙН-ПРОЕКТ КВАРТИР"
    background="/main-bg-4.png"/>
    <DesignProjectPage/>
    </>
  );
}