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

}

export const Footer: React.FC<React.PropsWithChildren<Props>> = ({ }) => {
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

  return (
    <div className="bg-stone-50 md:pb-16 pb-8 px-4 md:pl-[20%] pl-6" id='Фотогалерея'>
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
  )
}