'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const PageLoader = () => {
  const [showLoader, setShowLoader] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  
  const isHomePage = pathname === '/'
  
  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (isHomePage) {
      timeoutRef.current = setTimeout(() => {
        setShowLoader(false)
      }, 3000)
    } else {
      setShowLoader(false)
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
  }, [isHomePage, showLoader])
  
  if (!isHomePage) {
    return null
  }

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black min-h-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1]
            }
          }}
        >
          <div className="relative">
            {/* Основной контейнер логотипа */}
            <div className="relative">

              {/* Буквы MR */}
              <motion.div 
                className="flex items-center justify-center space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {/* Буква M */}
                <motion.div className="relative">
                  <motion.svg
                    width="80"
                    height="120"
                    viewBox="0 0 80 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M10 120V20L40 70L70 20V120"
                      stroke="url(#paleGoldGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                    />
                  </motion.svg>
                  
                  {/* Эффект свечения для M */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-100/15 to-amber-50/15 blur-sm"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Буква R */}
                <motion.div className="relative">
                  <motion.svg
                    width="70"
                    height="120"
                    viewBox="0 0 70 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M10 120V20H40C50 20 55 25 55 35C55 45 50 50 40 50H20V120"
                      stroke="url(#paleGoldGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"

initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                    />
                    <motion.path
                      d="M20 50L55 120"
                      stroke="url(#paleGoldGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 1.2 }}
                    />
                  </motion.svg>
                  
                  {/* Эффект свечения для R */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-l from-amber-100/15 to-amber-50/15 blur-sm"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>
              </motion.div>

              {/* Градиент для бледного золотого цвета */}
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="paleGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <motion.stop 
                      offset="0%" 
                      stopColor="#F5E6B3"
                      animate={{
                        stopColor: ['#F5E6B3', '#FFF8DC', '#F5E6B3']
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.stop 
                      offset="50%" 
                      stopColor="#FFF8DC"
                      animate={{
                        stopColor: ['#FFF8DC', '#F5F5DC', '#FFF8DC']
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.stop 
                      offset="100%" 
                      stopColor="#E6D7A8"
                      animate={{
                        stopColor: ['#E6D7A8', '#F5E6B3', '#E6D7A8']
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Красивая надпись MR | ALLIANCE */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <motion.div
                className="text-amber-100/90 font-light text-xl tracking-widest"
                animate={{
                  opacity: [0.8, 1, 0.8],
                  textShadow: [
                    '0 0 12px rgba(245, 230, 179, 0.5)',
                    '0 0 20px rgba(245, 230, 179, 0.7)',
                    '0 0 12px rgba(245, 230, 179, 0.5)'
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                MR | ALLIANCE
              </motion.div>
            </motion.div>

            {/* Текст под логотипом */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.p
                className="text-amber-100/70 font-light text-lg tracking-widest"
                animate={{
                  opacity: [0.6, 0.9, 0.6],
                  textShadow: [
                    '0 0 8px rgba(245, 230, 179, 0.3)',
                    '0 0 15px rgba(245, 230, 179, 0.5)',

'0 0 8px rgba(245, 230, 179, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                СТРОИТЕЛЬНАЯ КОМПАНИЯ
              </motion.p>
              
              {/* Индикатор загрузки */}
              <motion.div 
                className="mt-6 h-1 bg-amber-100/20 rounded-full overflow-hidden w-48 mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-100/60 to-amber-50/80"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader