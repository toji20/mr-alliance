'use client'

import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClosedCaption, Cross, X } from 'lucide-react';
import { parseFeatures } from '@/lib/parseFeatures';

interface Props {
  className?: string;
  price: number;
  name: string;
  image: string;
  size: number;
  features?: any;
  descr?: string;
  onClickRemove?: () => void;
}

export const AdminCatalogCard: React.FC<React.PropsWithChildren<Props>> = ({ 
  className, 
  price, 
  name, 
  image, 
  size, 
  features = [] ,
  descr,
  onClickRemove
}) => {
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
            {features.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2">
                {features.map((feature: string, index: number) => (
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
            <button className='flex-1 bg-[#cf3d30] text-[white] font-semibold py-3 px-6 rounded-lg hover:bg-amber-400 transition-colors'onClick={() => onClickRemove?.()}>Удалить товар</button>
          </div>
        </div>
      </motion.div>
    </>
  );
};