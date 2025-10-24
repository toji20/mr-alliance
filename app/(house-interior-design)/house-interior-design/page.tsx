import { Bg } from "@/components/shared/bg";
import HouseInteriorDesignPage from "@/components/shared/house-interior-design-article";
export const dynamic = 'force-dynamic';

export default function Home() {
    return (
   <>
    <Bg
        title="ДИЗАЙН ИНТЕРЬЕРА ДОМА"
        background="/main-bg-5.png"/>
    <HouseInteriorDesignPage/>
    </>
  );
}