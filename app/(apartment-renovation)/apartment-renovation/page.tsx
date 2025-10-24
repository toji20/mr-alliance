import '@/styles/main-bg.css'
import '@/styles/apartment-renovation.css'
import RepairArticle from "@/components/shared/apartment-renovation-article";
import { Bg } from '@/components/shared/bg';
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
   <>
   <Bg
       title="РЕМОНТ КВАРТИР"
       background="/main-bg-1.png"/>
    <RepairArticle/>
    </>
  );
}