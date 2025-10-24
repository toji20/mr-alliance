'use client'

import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import '@/styles/main-bg.css'

interface Props {
  className?: string;
}

export const MainBg: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { 
      id: 1, 
      bgClass: 'main-bg--one',
      title: 'СТРОИТЕЛЬСТВО ДОМОВ'
    },
    { 
      id: 2, 
      bgClass: 'main-bg--two',
      title: 'ДИЗАЙН ИНТЕРЬЕРА'
    },
    { 
      id: 3, 
      bgClass: 'main-bg--three',
      title: 'ПРОЕКТИРОВАНИЕ'
    },
    { 
      id: 4, 
      bgClass: 'main-bg--four',
      title: 'РЕМОНТ КВАРТИР'
    },
    { 
      id: 5, 
      bgClass: 'main-bg--five',
      title: 'ЛАНДШАФТНЫЙ ДИЗАЙН'
    },
    { 
      id: 6, 
      bgClass: 'main-bg--six',
      title: 'КОМПЛЕКСНЫЕ РЕШЕНИЯ'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className={cn('w-[100%] h-[95vh] overflow-hidden relative', className)}>
      <div 
        className="flex h-full transition-transform duration-600 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={cn('main-bg min-w-full h-full flex-shrink-0 ', slide.bgClass)}
          >
            <div className='flex h-full items-center justify-center'>
              <div className='text-center md:pl-[255px] pl-[0]'>
                <h1 className='main-bg__title'>{slide.title}</h1>
                <div className='main-bg__title-btns flex justify-center'>
                  <a href="/catalog"><button className='main-bg__title-btn md:block hidden'>ПРОЕКТЫ</button></a>
                  <a href="/contacts"><button className='main-bg__title-btn'>КОНТАКТЫ</button></a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={prevSlide}
        className="cursor-pointer absolute md:left-[20%] left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
      >
        <svg className="md:w-6 md:h-6 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
      >
        <svg className="md:w-6 md:h-6 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex md:space-x-3 space-x-2 z-10 md:pl-[250px] pl-[0]">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'md:w-3 md:h-3 w-2 h-2 rounded-full transition-all duration-300 border border-white',
              currentSlide === index 
                ? 'bg-white scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            )}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};