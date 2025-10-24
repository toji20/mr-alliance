'use client'

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import'@/styles/header.css'
import { HeartPlus, MapIcon, MapPin } from 'lucide-react';
import { TextContent } from '@prisma/client';

interface Props {
  className?: string;
}

export const Header: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [texts, setTexts] = useState<Record<string, string>>({})
      const [loading, setLoading] = useState(true)
    
      useEffect(() => {
        const loadTexts = async () => {
          try {
            const response = await fetch('/api/texts')
            const data: TextContent[] = await response.json()
            
            const textsMap = data.reduce((acc, text) => {
              acc[text.key] = text.content
              return acc
            }, {} as Record<string, string>)
            
            setTexts(textsMap)
          } catch (error) {
            console.error('Ошибка загрузки текстов:', error)
          } finally {
            setLoading(false)
          }
        }
    
        loadTexts()
      }, [])
    
      const getText = (key: string, fallback: string = '') => {
        return texts[key] || fallback
      }
    
      if (loading) {
        return <div className="min-h-screen bg-stone-50 flex items-center justify-center md:pl-[18%] pl-[0]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600">Загрузка...</p>
        </div>
      </div>
      }
    
    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName);
    }

    const navItems = [
        { title: getText('header_nav_1_item','КАТАЛОГ ПРОЕКТОВ'), href: '/catalog' },
        { title: getText('header_nav_2_item','ПАРТФОЛИО'), href: '/portfolio' },
        { title: getText('header_nav_3_item','РЕМОНТ КВАРТИР'), href: '/apartment-renovation' },
        { title: getText('header_nav_4_item','ДИЗАЙН-ПРОЕКТ КВАРТИРЫ'), href: '/apartment-design' },
        { title: getText('header_nav_5_item','ДИЗАЙН ИНТЕРЬЕРА ДОМА'), href: '/house-interior-design' },
        { title: getText('header_nav_6_item','ПРОЕКТИРОВАНИЕ'), href: '/planning' },
        { title: getText('header_nav_7_item','СТРОИТЕЛЬСТВО ДОМОВ'), href: '/construction' }
    ];

    const functionItems = [
        { title: getText('header_dop_1_item','ИЗБРАННОЕ'), href: '/favorites', icon: <HeartPlus size={16} className='pr-[3px]' /> },
        { title: getText('header_dop_2_item','КОНТАКТЫ'), href: '/contacts', icon: <MapPin size={16} className='pr-[3px]' /> }
    ];

    return (
        <div className={cn('header__conatiner min-h-screen w-[18%] fixed flex  border-gray py-[20px] flex-col z-10', className)}>
            <div className='mx-auto mb-[10px]'>
                <a href="/"><img src="/mr-logo.png" alt="Logo" className='w-[150px]'/></a>
            </div>
            <div className='flex flex-col px-[5px]'>
                <div className='header__nav mb-[40px]'>
                    <ul className='header__nav-list flex flex-col gap-[6px]'>
                        {navItems.map((item,index) => (
                            <li 
                                key={index}
                                className={cn(
                                    'header__nav-list-item cursor-pointer transition-colors duration-200',
                                    activeItem === item.title 
                                        ? 'text-beige-500 bg-beige-50' 
                                        : 'text-gray-700 hover:text-beige-400'
                                )}
                                onClick={() => handleItemClick(item.title)}
                            >
                                <a href={item.href} className="block w-full h-full">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='header__function'>
                    <ul className='header__function-list flex flex-col gap-[7px]'>
                        {functionItems.map((item,index) => (
                            <li 
                                key={index}
                                className={cn(
                                    'header__function-list-item flex items-center cursor-pointer transition-colors duration-200',
                                    activeItem === item.title 
                                        ? 'text-beige-500 bg-beige-50' 
                                        : 'text-gray-700 hover:text-beige-400'
                                )}
                                onClick={() => handleItemClick(item.title)}
                            >
                                <a href={item.href} className="flex items-center w-full h-full">
                                    {item.icon}
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};