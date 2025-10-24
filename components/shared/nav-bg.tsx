'use client'

import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import '@/styles/nav-bg.css'

interface Props {
  className?: string;
}

export const NavBg: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    const [background,setBackground] = useState('/nav-bg.png')
    const [zoom,setZoom] = useState(false)
    const changeBg = (bgImage: string) => {
        setBackground(bgImage)
        setZoom(true)
    }
    const returnBg = () => {
        setBackground('/nav-bg.png')
        setZoom(false)
    }
  return <div className={cn('nav-bg__container w-[100%] h-screen', className, {
    'nav-bg__container--zoomed': zoom
  })}
  style={{backgroundImage: `url(${background})`}}>
   <div className='nav-bg__container-block'>
     <h1 className='nav-bg__title'>ПРОЕКТИРОВАНИЕ И СТРОИТЕЛЬСТВО ДОМОВ</h1>
    <div>
        <ul>
            <a href="" className='nav-bg__list-item-link' 
            ><li className='nav-bg__list-item'>ПРОЕКТИРОВАНИЕ ДОМОВ</li></a>
            <a href="" className='nav-bg__list-item-link'
            onMouseEnter={() => changeBg('/main-bg-2.png')}
            onMouseLeave={returnBg}><li className='nav-bg__list-item'>СТРОИТЕЛЬСТВО ДОМОВ</li></a>
            <a href="" className='nav-bg__list-item-link'
            onMouseEnter={() => changeBg('/main-bg-3.png')}
            onMouseLeave={returnBg}><li className='nav-bg__list-item'>ДИЗАЙН ИНТЕРЬЕРА КВАРТИР</li></a>
            <a href="" className='nav-bg__list-item-link'
            onMouseEnter={() => changeBg('/main-bg-4.png')}
            onMouseLeave={returnBg}><li className='nav-bg__list-item'>РЕМОНТ</li></a>
            <a href="" className='nav-bg__list-item-link'
            onMouseEnter={() => changeBg('/main-bg-5.png')}
            onMouseLeave={returnBg}><li className='nav-bg__list-item'>ПАРТФОЛИО</li></a>
            <a href="" className='nav-bg__list-item-link'
            onMouseEnter={() => changeBg('/main-bg-6.png')}
            onMouseLeave={returnBg}><li className='nav-bg__list-item'>ПРОЕКТЫ ДОМОВ</li></a>
            <a href="" className='nav-bg__list-item-link'
            onMouseEnter={() => changeBg('/main-bg-2.png')}
            onMouseLeave={returnBg}><li className='nav-bg__list-item'>ДИЗАЙН ИНТЕРЬЕРА ДОМОВ</li></a>
        </ul>
    </div>
   </div>
  </div>;
};