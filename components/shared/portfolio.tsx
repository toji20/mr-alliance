'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { GalleryCard } from './gallery-card'
import { GalleryPhoto } from '@prisma/client'

interface TextContent {
  id: string
  key: string
  content: string;
}

interface Props {
  items: GalleryPhoto[]
}

export const GalleryPage: React.FC<React.PropsWithChildren<Props>> = ({ items }) => {
  const [texts, setTexts] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

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


  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleImageClick = (index: number) => {
    setSelectedImage(index)
    setCurrentIndex(index)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center md:pl-[18%] pl-[0]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600">Загрузка галереи...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 md:py-16 py-8 px-4 md:pl-[20%] pl-6" id='Фотогалерея'>
      <div className="max-w-7xl mx-auto">
        
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center md:mb-16 mb-7"
        >
          <h1 className="text-[24px] md:text-5xl font-light text-stone-800 mb-4">
            {getText('gallery_title', 'ГАЛЕРЕЯ РАБОТ')}
          </h1>
          <div className="w-24 h-1 bg-[#ffe6b6] mx-auto mb-6"></div>
          <p className="md:text-xl text-[20px] text-stone-600 max-w-3xl mx-auto">
            {getText('gallery_subtitle', 'Лучшие реализованные проекты домов и коттеджей')}
          </p>
        </motion.div>

        {/* Основная галерея */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {items.map((image, index) => (
            <GalleryCard
            key={image.id}
            image={{
              id: String(image.id),
              title: image.name,
              imageUrl: image.imageUrl
            }}
            galleryImages={items.map(item => ({
              id: String(item.id),
              title: item.name,
              imageUrl: item.imageUrl
            }))}
            index={index}
            onImageClick={handleImageClick}
            isModalOpen={selectedImage !== null}
            currentIndex={currentIndex}
            onCloseModal={handleCloseModal}
            onNextImage={nextImage}
            onPrevImage={prevImage}
            descr={String(image.descr)}
            title={image.name}
            imageUrl={image.imageUrl}
          />
          ))}
        </motion.div>

        {/* CTA блок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-light text-stone-800 mb-3">
              {getText('cta_title', 'Нравится то, что вы видите?')}
            </h3>
            <p className="text-stone-600 text-base mb-6">
              {getText('cta_description', 'Давайте создадим ваш идеальный дом вместе')}
            </p>
            <a href="/contacts">
            <button className="bg-stone-800 text-amber-50 font-medium py-3 px-8 rounded-lg hover:bg-stone-700 transition-colors">
              {getText('cta_button', 'Обсудить проект')}
            </button></a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}