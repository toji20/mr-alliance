'use client'

import { cn } from '@/lib/utils';
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { formatDateToNumeric } from '@/lib/formateDate';

interface ReviewCardProps {
  className?: string;
  rating: number;
  text: string;
  date: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  className,
  rating,
  text,
  date
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={cn(
          index < rating 
            ? "text-amber-500 fill-current" 
            : "text-stone-300"
        )}
      />
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "bg-white rounded-2xl shadow-lg border border-stone-200 p-6",
        "hover:shadow-xl transition-all duration-300 group",
        className
      )}
    >
      {/* Иконка цитаты */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex space-x-1">
          {renderStars(rating)}
        </div>
        <Quote 
          size={24} 
          className="text-amber-200 group-hover:text-amber-300 transition-colors" 
        />
      </div>

      {/* Текст отзыва */}
      <div className="mb-6 overflow-hidden">
        <p className="text-stone-700 leading-relaxed text-lg">
          "{text}"
        </p>
      </div>

      {/* Нижняя часть с датой и рейтингом */}
      <div className="flex justify-between items-center pt-4 border-t border-stone-100">
        <span className="text-stone-500 font-medium">{formatDateToNumeric(date)}</span>
        
        {/* Индикатор проверенного отзыва */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-amber-600">
            {rating}.0/5.0
          </span>
          <div className="flex items-center space-x-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
            <span>✓</span>
            <span>Проверено</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};