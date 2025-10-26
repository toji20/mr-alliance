'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Filter, Search, MessageCircle } from 'lucide-react';
import { ReviewCard } from './review-card';
import { ReviewForm } from './reviews-add-form';
import { Review } from '@prisma/client';

interface Props {
    items: Review[]
}

export const ReviewsPage: React.FC<Props> = ({items}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredReviews = items
    .filter(review => {
      const matchesSearch = review.text.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRating = ratingFilter ? review.rating === ratingFilter : true;
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.rating - a.rating;
      }
    });

  const averageRating = items.reduce((acc, review) => acc + review.rating, 0) / items.length;

  if (!isClient) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 md:py-8 py-4 pt-30 md:pl-[18%] pl-[0]">
      <div className="max-w-7xl mx-auto px-[0] sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:mb-12 mb-8 px-5"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <MessageCircle className="w-8 h-8 text-stone-600" />
            <h1 className="md:text-4xl text-[24px] font-bold text-stone-800">Отзывы клиентов</h1>
          </div>
          <p className="md:text-lg text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Мнение наших клиентов — лучшая оценка нашей работы. 
            Читайте реальные отзывы о сотрудничестве.
          </p>
          
          <div className="mt-6 inline-flex items-center space-x-4 bg-white px-6 py-3 md:rounded-2xl rounded-[0] shadow-sm border border-stone-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-stone-800">{averageRating.toFixed(1)}</div>
              <div className="flex items-center space-x-1 mt-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= Math.round(averageRating) ? "text-amber-600 fill-current" : "text-stone-300"}
                  />
                ))}
              </div>
            </div>
            <div className="h-12 w-px bg-stone-200"></div>
            <div className="text-sm text-stone-600">
              <div>На основе {items.length} отзывов</div>
              <div>98% клиентов рекомендуют</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white md:rounded-2xl rounded-[0] shadow-sm border border-stone-200 md:p-6 p-4 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Поиск по отзывам
              </label>
              <Search className="absolute left-3 top-[50px] transform -translate-y-1/2 text-stone-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск по отзывам..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Рейтинг
              </label>
              <select
                value={ratingFilter || ''}
                onChange={(e) => setRatingFilter(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors bg-white"
              >
                <option value="">Все рейтинги</option>
                {[5, 4, 3, 2, 1].map(rating => (
                  <option key={rating} value={rating}>
                    {rating} ★ и выше
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Сортировка
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'rating')}
                className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors bg-white"
              >
                <option value="date">Сначала новые</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setRatingFilter(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                ratingFilter === null
                  ? 'bg-stone-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Все
            </button>
            {[5, 4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => setRatingFilter(rating)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  ratingFilter === rating
                    ? 'bg-stone-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {rating} ★
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[500px] overflow-auto py-[20px] px-[10px] border-[3px] border-t-[#ebb842] border-b-[#ebb842]">
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ReviewCard
                  rating={review.rating}
                  text={review.text}
                  date={new Date(review.date).toISOString()}
                />
              </motion.div>
            ))}
          </div>

          <div className="md:hidden">
            <div className="flex overflow-x-auto pb-4 pl-4 space-x-4 scrollbar-hide">
              {filteredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-[85vw] max-w-sm"
                >
                  <ReviewCard
                    rating={review.rating}
                    text={review.text}
                    date={new Date(review.date).toISOString()}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {filteredReviews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 md:py-12"
          >
            <MessageCircle className="w-12 h-12 md:w-16 md:h-16 text-stone-300 mx-auto mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-semibold text-stone-600 mb-2">
              Отзывы не найдены
            </h3>
            <p className="text-stone-500 text-sm md:text-base">
              Попробуйте изменить параметры поиска или фильтры
            </p>
          </motion.div>
        )}

        <ReviewForm/>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 md:mt-16 text-center"
        >
          <div className="bg-white md:rounded-xl rounded-[0] p-6 md:p-8 shadow-sm border border-stone-200 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-light text-stone-800 mb-3">
              Оставьте свой отзыв
            </h3>
            <p className="text-stone-600 text-sm md:text-base mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
              Поделитесь своим опытом сотрудничества с нами. Ваше мнение поможет другим клиентам 
              принять правильное решение и нам стать лучше.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contacts" className='w-full'>
              <button className="w-full bg-stone-700 text-stone-50 font-medium py-3 px-6 rounded-lg hover:bg-stone-600 transition-colors text-sm">
                Связаться с нами
              </button>
              </a>
              <button className="border border-stone-700 text-stone-700 font-medium py-3 px-6 rounded-lg hover:bg-stone-700 hover:text-stone-50 transition-colors text-sm">
                Написать отзыв
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}