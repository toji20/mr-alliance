'use client'

import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import '@/styles/header.css'
import { HeartPlus, MapIcon, MapPin, MessageCircle, Menu, X } from 'lucide-react';

interface Props {
  className?: string;
}

export const Header: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    // Определяем мобильное устройство
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName);
        if (isMobile) {
            setIsMobileMenuOpen(false);
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const navItems = [
        { name: 'КАТАЛОГ ПРОЕКТОВ', href: '/catalog' },
        { name: 'ПАРТФОЛИО', href: '/portfolio' },
        { name: 'РЕМОНТ КВАРТИР', href: '/apartment-renovation' },
        { name: 'ДИЗАЙН-ПРОЕКТ КВАРТИРЫ', href: '/apartment-design' },
        { name: 'ДИЗАЙН ИНТЕРЬЕРА ДОМА', href: '/house-interior-design' },
        { name: 'ПРОЕКТИРОВАНИЕ', href: '/planning' },
        { name: 'СТРОИТЕЛЬСТВО ДОМОВ', href: '/construction' }
    ];

    const functionItems = [
        { name: 'ОТЗЫВЫ', href: '/reviewes', icon: <MessageCircle size={16} className='pr-[3px]' /> },
        { name: 'КОНТАКТЫ', href: '/contacts', icon: <MapPin size={16} className='pr-[3px]' /> }
    ];

    return (
        <>
            <div className={cn('header__mobile-container w-full fixed top-0 left-0 bg-black md:py-4 py-2 px-4 flex justify-between items-center z-50', 
                isMobile ? 'block' : 'hidden')}>
                <div className='header__mobile-logo'>
                    <a href="/"><img src="/mr-logo.png" alt="Logo" className='lg:w-[120px] w-[80px]'/></a>
                </div>
                
                <button 
                    className="burger-menu p-2"
                    onClick={toggleMobileMenu}
                    aria-label="Открыть меню"
                >
                    {isMobileMenuOpen ? (
                        <X size={24} className="text-white" />
                    ) : (
                        <Menu size={24} className="text-white" />
                    )}
                </button>
            </div>

            <div className={cn('header__conatiner min-h-screen w-[18%] fixed flex border-gray py-[20px] flex-col z-10', 
                className,
                isMobile ? 'hidden' : 'block')}>
                <div className='mx-auto mb-[10px]'>
                    <a href="/"><img src="/mr-logo.png" alt="Logo" className='w-[150px]'/></a>
                </div>
                <div className='flex flex-col px-[5px]'>
                    <div className='header__nav mb-[40px]'>
                        <ul className='header__nav-list flex flex-col gap-[6px]'>
                            {navItems.map((item) => (
                                <li 
                                    key={item.name}
                                    className={cn(
                                        'header__nav-list-item cursor-pointer transition-colors duration-200',
                                        activeItem === item.name 
                                            ? 'text-beige-500 bg-beige-50' 
                                            : 'text-gray-700 hover:text-beige-400'
                                    )}
                                    onClick={() => handleItemClick(item.name)}
                                >
                                    <a href={item.href} className="block w-full h-full">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='header__function'>
                        <ul className='header__function-list flex flex-col gap-[7px]'>
                            {functionItems.map((item) => (
                                <li 
                                    key={item.name}
                                    className={cn(
                                        'header__function-list-item flex items-center cursor-pointer transition-colors duration-200',
                                        activeItem === item.name 
                                            ? 'text-beige-500 bg-beige-50' 
                                            : 'text-gray-700 hover:text-beige-400'
                                    )}
                                    onClick={() => handleItemClick(item.name)}
                                >
                                    <a href={item.href} className="flex items-center w-full h-full">
                                        {item.icon}
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className={cn(
                'mobile-menu fixed top-0 left-0 w-full h-screen bg-black z-40 transform transition-transform duration-300',
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
                isMobile ? 'block' : 'hidden'
            )}>
                <div className="pt-[120px] px-6 pb-6 h-full overflow-y-auto">
                    <div className='header__nav mb-8'>
                        <ul className='header__nav-list flex flex-col gap-2'>
                            {navItems.map((item) => (
                                <li 
                                    key={item.name}
                                    className={cn(
                                        'mobile-nav-item cursor-pointer transition-colors duration-200 py-3 px-4 rounded text-white',
                                        activeItem === item.name 
                                            ? 'text-beige-500 bg-beige-50' 
                                            : 'hover:bg-gray-800'
                                    )}
                                    onClick={() => handleItemClick(item.name)}
                                >
                                    <a href={item.href} className="block w-full h-full text-sm">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className='header__function'>
                        <ul className='header__function-list flex flex-col gap-2'>
                            {functionItems.map((item) => (
                                <li 
                                    key={item.name}
                                    className={cn(
                                        'mobile-function-item flex items-center cursor-pointer transition-colors duration-200 py-3 px-4 rounded text-white',
                                        activeItem === item.name 
                                            ? 'text-beige-500 bg-beige-50' 
                                            : 'hover:bg-gray-800'
                                    )}
                                    onClick={() => handleItemClick(item.name)}
                                >
                                    <a href={item.href} className="flex items-center w-full h-full text-sm">
                                        {item.icon}
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && isMobile && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
};