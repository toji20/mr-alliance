'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface GalleryImage {
  id: string
  title: string
  imageUrl: string
}

interface GalleryCardProps {
  image: GalleryImage
  index: number
  onImageClick: (index: number) => void
  isModalOpen: boolean
  currentIndex: number
  galleryImages: GalleryImage[]
  onCloseModal: () => void
  onNextImage: () => void
  onPrevImage: () => void
  descr: string;
  title: string;
  imageUrl: string;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ 
  index, 
  onImageClick,
  isModalOpen,
  currentIndex,
  galleryImages,
  onCloseModal,
  onNextImage,
  onPrevImage,
  descr,
  title,
  imageUrl,
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group cursor-pointer"
        onClick={() => onImageClick(index)}
      >
        <div className="relative h-80 bg-stone-200 rounded-xl overflow-hidden shadow-sm border border-stone-200">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end">
            <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <p className="text-amber-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Нажмите для просмотра
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && currentIndex === index && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900 bg-opacity-95 flex items-center justify-center z-50 md:p-4 p-[0]"
            onClick={onCloseModal}
          >
            <button 
              className="cursor-pointer absolute top-6 right-6 z-10 w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-amber-50 hover:bg-stone-700 transition-colors"
              onClick={onCloseModal}
            >
              <X size={15}/>
            </button>

            <button 
              className="cursor-pointer absolute left-6 top-1/2 transform -translate-y-1/2 z-10 md:w-12 md:h-12 w-8 h-8 bg-stone-800 bg-opacity-50 rounded-full flex items-center justify-center text-amber-50 hover:bg-opacity-70 transition-all"
              onClick={(e) => {
                e.stopPropagation()
                onPrevImage()
              }}
            >
              <ChevronLeft className='md:w-7 md:h-7 w-4 h-4'/>
            </button>

            <button 
              className="cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2 z-10 md:w-12 md:h-12 w-8 h-8 bg-stone-800 bg-opacity-50 rounded-full flex items-center justify-center text-amber-50 hover:bg-opacity-70 transition-all"
              onClick={(e) => {
                e.stopPropagation()
                onNextImage()
              }}
            >
              <ChevronRight className='md:w-7 md:h-7 w-4 h-4'/>
            </button>

            <div className="absolute md:bottom-6 bottom-150 left-1/2 transform -translate-x-1/2 z-10 bg-stone-800 bg-opacity-50 text-amber-50 px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {galleryImages.length}
            </div>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white md:rounded-xl rounded-[0] md:max-h-[90vh] h-[100vh] overflow-hidden shadow-2xl">
                <div className="relative md:h-[70vh] h-[80vh] w-full bg-stone-200 flex items-center justify-center">
                  <img 
                    src={galleryImages[currentIndex].imageUrl} 
                    alt={galleryImages[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="md:text-2xl text-xl font-semibold text-stone-800 mb-2">
                    {galleryImages[currentIndex].title}
                  </h3>
                  <p className="text-stone-600 md:text-[16px] text-[12px]">
                    {descr}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}