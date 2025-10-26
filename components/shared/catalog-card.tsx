'use client'

import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClosedCaption, Cross, X } from 'lucide-react';
import { parseFeatures } from '@/lib/parseFeatures';
import Link from 'next/link';

interface Props {
  className?: string;
  price: number;
  name: string;
  image: string;
  size: number;
  features?: any;
  descr?: string;
}

export const CatalogCard: React.FC<React.PropsWithChildren<Props>> = ({ 
  className, 
  price, 
  name, 
  image, 
  size, 
  features = [] ,
  descr
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden'
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = ''
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const featuresArray = parseFeatures(features);

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className={cn('bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden group cursor-pointer', className)}
      >
        <div className="p-6">
          <div 
            className="relative overflow-hidden rounded-xl mb-4 aspect-video bg-stone-100"
            onClick={openModal}
          >
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </div>

          {/* Информация */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-stone-800">{name}</h3>
            
            <div className="flex items-center justify-between text-stone-600">
              <div className="flex items-center space-x-1">
                <span className="text-lg">📐</span>
                <span>{size} м²</span>
              </div>
              <div className="text-lg font-bold text-amber-600">
                {formatPrice(price)} ₽
              </div>
            </div>

            {/* Особенности */}
            {featuresArray.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2">
                {featuresArray.map((feature: string, index: number) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full border border-amber-200"
                  >
                    {feature}
                  </span>
                ))}
                {features.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full">
                    +{features.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Кнопка */}
            <button 
              onClick={openModal}
              className="w-full mt-4 bg-stone-800 text-amber-50 py-3 rounded-lg font-semibold hover:bg-stone-700 transition-colors duration-200 border border-stone-700"
            >
              Посмотреть детали
            </button>
          </div>
        </div>
      </motion.div>

      {isModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 bg-opacity-80 flex items-center justify-center z-50 p-0 md:p-6 overflow-hidden"
          onClick={closeModal}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white md:rounded-2xl rounded-[0] w-full max-w-4xl max-h-[100%] md:max-h-[90vh] overflow-y-auto mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Хедер модалки */}
            <div className="sticky top-0 bg-white border-b border-stone-200 px-4 py-3 md:px-8 md:py-4 flex items-center justify-between z-10">
              <h2 className="text-lg md:text-2xl font-bold text-stone-800 truncate pr-4">
                {name}
              </h2>
              <button 
                onClick={closeModal}
                className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors duration-200 text-stone-600"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>

            <div className="p-4 md:p-8">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8">
                {/* Левая колонка - изображение и описание */}
                <div className="space-y-4 md:space-y-6">
                  <div className="rounded-xl overflow-hidden bg-stone-100 aspect-video">
                    <img 
                      src={image} 
                      alt={name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Описание для мобильной версии */}
                  <div className="block md:hidden">
                    <h3 className="text-lg font-semibold text-stone-800 mb-3">Описание</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {descr}
                    </p>
                  </div>
                </div>

                {/* Правая колонка - информация и кнопки */}
                <div className="space-y-4 md:space-y-6">
                  {/* Блок с ценой и площадью */}
                  <div className="bg-amber-50 rounded-xl p-4 md:p-6 border border-amber-100">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <div className="text-xl md:text-2xl font-bold text-amber-600">
                        {formatPrice(price)} ₽
                      </div>
                      <div className="text-base md:text-lg text-stone-700 font-semibold">
                        {size} м²
                      </div>
                    </div>
                    <div className="text-stone-600 text-xs md:text-sm">
                      {Math.round(price / size).toLocaleString()} ₽ за м²
                    </div>
                  </div>

                  {/* Особенности дома */}
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-stone-800 mb-3">Особенности дома</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                      {features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2 text-stone-600">
                          <div className="w-2 h-2 bg-[#ffe6b6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm md:text-base break-words">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Дополнительная информация (только для десктопа) */}
                  {descr && (
                    <div className="hidden md:block space-y-3">
                      <h3 className="text-lg font-semibold text-stone-800">Дополнительная информация</h3>
                      <div className="space-y-2 text-sm text-stone-600">
                        <div className="flex justify-between">
                          <p className='font-semibold'>{descr}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Футер для мобильной версии */}
            <div className="sticky bottom-0 bg-white border-t border-stone-200 p-4">
              <div className="flex">
              <Link href="/contacts" className='flex w-full'>
              <button className="w-full bg-[#ffe6b6] text-stone-900 font-semibold py-3 px-4 md:px-6 rounded-lg hover:bg-amber-400 transition-colors text-sm md:text-base">
                Забронировать просмотр
              </button>
              </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};