'use client'

import { cn } from '@/lib/utils';
import React from 'react';
import { motion } from 'framer-motion'
import { CatalogCard } from './catalog-card';
import '@/styles/catalog.css'
import { House } from '@prisma/client';

interface Props {
  className?: string;
  items: House[]
}

export const Catalog: React.FC<React.PropsWithChildren<Props>> = ({ className, children, items }) => {
  return (
    <div className={cn('min-h-screen bg-stone-50 md:py-16 py-10 px-6 md:pl-[20%] pl-6', className)}>
      <div className="max-w-7xl mx-auto">
        
        {/* Заголовок */}
        <div className="text-center md:mb-16 mb-7">
          <h1 className="text-[24px] md:text-5xl font-light text-stone-800 mb-4">
            КАТАЛОГ <span className="font-semibold">ДОМОВ</span>
          </h1>
          <div className="w-24 h-1 bg-[#ffe6b6] mx-auto mb-6"></div>
          <p className="md:text-xl text-[20px] text-stone-600 max-w-3xl mx-auto">
            Подберем идеальный дом для вашей семьи с учетом всех пожеланий и потребностей
          </p>
        </div>

        <div className="grid gap-8">
          {/* Сетка домов */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items?.map((item, id) => (
              <CatalogCard
                key={id}
                name={item.name}
                image={item.imageUrl}
                price={item.price}
                size={item.size}
                features={item.features}
                descr={item.descr as string}
              />
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200">
            <h3 className="text-2xl font-bold text-stone-800 mb-6 text-center">Наши преимущества</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="md:p-4 p-2">
                <div className="md:text-3xl text-xl font-bold text-amber-600 mb-2">50+</div>
                <div className="text-sm text-stone-600">Построенных домов</div>
              </div>
              <div className="md:p-4 p-2">
                <div className="md:text-3xl text-xl font-bold text-amber-600 mb-2">5 лет</div>
                <div className="text-sm text-stone-600">Гарантии на работы</div>
              </div>
              <div className="md:p-4 p-2">
                <div className="md:text-3xl text-xl font-bold text-amber-600 mb-2">100%</div>
                <div className="text-sm text-stone-600">Качественные материалы</div>
              </div>
              <div className="md:p-4 p-2">
                <div className="md:text-3xl text-xl font-bold text-amber-600 mb-2">24/7</div>
                <div className="text-sm text-stone-600">Поддержка клиентов</div>
              </div>
            </div>
          </div>
<motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="md:mt-16 mt-8 text-center"

>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200 max-w-3xl mx-auto">
            <h3 className="text-2xl font-light text-stone-800 mb-3">
            Найдем идеальный дом для вас?
            </h3>
            <p className="text-stone-600 text-base mb-6 max-w-2xl mx-auto">
            Получите бесплатную консультацию и подбор домов по вашим критериям
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contacts" className='w-full'>
              <button className="w-full bg-stone-800 text-amber-50 font-medium py-3 px-6 rounded-lg hover:bg-stone-700 transition-colors text-sm">
                Получить консультацию
              </button>
              </a>
              <a href="/portfolio" className='w-full'>
              <button className="w-full border border-stone-800 text-stone-800 font-medium py-3 px-6 rounded-lg hover:bg-stone-800 hover:text-amber-50 transition-colors text-sm">
                Посмотреть портфолио
              </button>
              </a>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
};