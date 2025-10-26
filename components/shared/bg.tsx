'use client'

import { cn } from "@/lib/utils";
import { useState } from "react";
import '@/styles/main-bg.css'

interface Props {
    className?: string;
    title: string;
    background: string;
    btnText?: string;
    url?: string
}


export const Bg: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  background,
  btnText = 'ПАРТФОЛИО',
  url
}) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div 
              className={cn('apartment-renovation__container w-[100%] md:h-screen h-[98vh] overflow-hidden relative')}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
                  <div className="flex h-full">
                      <div 
                        className={cn(
                          'main-bg min-w-full h-full flex-shrink-0 bg-cover bg-center bg-no-repeat',
                          'transition-all duration-700 ease-out'
                        )}
                        style={{ 
                          backgroundImage: `url('${background}')`,
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                        }}
                      >
                        <div className='flex h-full items-center justify-center'>
                          <div className='text-center md:pl-[255px] pl-[0]'>
                            <h1 className='main-bg__title'>{title}</h1>
                            <div className='main-bg__title-btns flex justify-center'>
                              <a href="/contacts"><button className='main-bg__title-btn'>ЗАКАЗАТЬ УСЛУГУ</button></a>
                              <a href={url}><button className='main-bg__title-btn md:block hidden'>{btnText}</button></a>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
            </div>
    )
}