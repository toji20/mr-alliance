'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TextContent {
  id: string
  key: string
  content: string
}

export default function HouseInteriorDesignPage() {
  const [activeStyle, setActiveStyle] = useState(0)
  const [texts, setTexts] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return <div className="min-h-screen bg-stone-50 flex items-center justify-center md:pl-[18%] pl-[0]">
    <div className="text-center">
      <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3 md:mb-4"></div>
      <p className="text-stone-600 text-sm md:text-base">Загрузка...</p>
    </div>
  </div>
  }

  const designStyles = [
    {
      name: getText('style_1_name', 'Современный'),
      description: getText('style_1_desc', 'Четкие линии, минимализм и функциональность'),
      features: [
        getText('style_1_feature_1', 'Минимализм'),
        getText('style_1_feature_2', 'Натуральные материалы'),
        getText('style_1_feature_3', 'Скрытое освещение')
      ],
      icon: "⬜️"
    },
    {
      name: getText('style_2_name', 'Классический'),
      description: getText('style_2_desc', 'Элегантность, симметрия и богатые текстуры'),
      features: [
        getText('style_2_feature_1', 'Лепнина'),
        getText('style_2_feature_2', 'Натуральное дерево'),
        getText('style_2_feature_3', 'Антикварная мебель')
      ],
      icon: "🏛"
    },
    {
      name: getText('style_3_name', 'Скандинавский'),
      description: getText('style_3_desc', 'Светлые пространства, натуральные материалы и уют'),
      features: [
        getText('style_3_feature_1', 'Светлые тона'),
        getText('style_3_feature_2', 'Натуральные ткани'),
        getText('style_3_feature_3', 'Эко-материалы')
      ],
      icon: "❄️"
    },
    {
      name: getText('style_4_name', 'Лофт'),
      description: getText('style_4_desc', 'Индустриальная эстетика и свободные пространства'),
      features: [
        getText('style_4_feature_1', 'Кирпичные стены'),
        getText('style_4_feature_2', 'Открытые коммуникации'),
        getText('style_4_feature_3', 'Металлические элементы')
      ],
      icon: "🏭"
    },
    {
      name: getText('style_5_name', 'Экостиль'),
      description: getText('style_5_desc', 'Гармония с природой и экологичные материалы'),
      features: [
        getText('style_5_feature_1', 'Натуральные материалы'),
        getText('style_5_feature_2', 'Обилие растений'),
        getText('style_5_feature_3', 'Энергоэффективность')
      ],
      icon: "🌿"
    },
    {
      name: getText('style_6_name', 'Неоклассика'),
      description: getText('style_6_desc', 'Современная интерпретация классических традиций'),
      features: [
        getText('style_6_feature_1', 'Современные материалы'),
        getText('style_6_feature_2', 'Классические формы'),
        getText('style_6_feature_3', 'Умеренный декор')
      ],
      icon: "⚜️"
    }
  ]

  const designProcess = [
    {
      stage: getText('stage_1_stage', 'Анализ'),

title: getText('stage_1_title', 'Изучение архитектуры'),
      description: getText('stage_1_desc', 'Анализ конструктивных особенностей дома, естественного освещения и планировочных решений'),
      details: [
        getText('stage_1_detail_1', 'Изучение несущих конструкций'),
        getText('stage_1_detail_2', 'Анализ инсоляции'),
        getText('stage_1_detail_3', 'Замеры помещений')
      ]
    },
    {
      stage: getText('stage_2_stage', 'Концепция'),
      title: getText('stage_2_title', 'Разработка стиля'),
      description: getText('stage_2_desc', 'Создание общей концепции интерьера, соответствующей архитектуре дома и пожеланиям жильцов'),
      details: [
        getText('stage_2_detail_1', 'Подбор цветовой палитры'),
        getText('stage_2_detail_2', 'Разработка стилевого решения'),
        getText('stage_2_detail_3', 'Планирование освещения')
      ]
    },
    {
      stage: getText('stage_3_stage', 'Планировка'),
      title: getText('stage_3_title', 'Зонирование пространства'),
      description: getText('stage_3_desc', 'Оптимальное распределение функциональных зон с учетом образа жизни семьи'),
      details: [
        getText('stage_3_detail_1', 'Функциональное зонирование'),
        getText('stage_3_detail_2', 'Расстановка мебели'),
        getText('stage_3_detail_3', 'Организация хранения')
      ]
    },
    {
      stage: getText('stage_4_stage', 'Детализация'),
      title: getText('stage_4_title', 'Проработка элементов'),
      description: getText('stage_4_desc', 'Разработка детальных решений для каждого помещения с учетом эргономики и эстетики'),
      details: [
        getText('stage_4_detail_1', 'Дизайн мебели'),
        getText('stage_4_detail_2', 'Подбор материалов'),
        getText('stage_4_detail_3', 'Разработка декора')
      ]
    }
  ]

  const specialFeatures = [
    {
      icon: "🔥",
      title: getText('special_feature_1_title', 'Каминные зоны'),
      description: getText('special_feature_1_desc', 'Создание уютных зон с каминами как центром притяжения в гостиной')
    },
    {
      icon: "🥂",
      title: getText('special_feature_2_title', 'Винные погреба'),
      description: getText('special_feature_2_desc', 'Проектирование профессиональных винных погребов с идеальными условиями хранения')
    },
    {
      icon: "🎬",
      title: getText('special_feature_3_title', 'Домашние кинотеатры'),
      description: getText('special_feature_3_desc', 'Оборудование кинозалов с акустической подготовкой помещений')
    },
    {
      icon: "🏊",
      title: getText('special_feature_4_title', 'SPA-зоны'),
      description: getText('special_feature_4_desc', 'Дизайн банных комплексов, саун и зон релаксации')
    },
    {
      icon: "📚",
      title: getText('special_feature_5_title', 'Библиотеки'),
      description: getText('special_feature_5_desc', 'Создание интеллектуальных пространств для чтения и работы')
    },
    {
      icon: "🎯",
      title: getText('special_feature_6_title', 'Игровые комнаты'),
      description: getText('special_feature_6_desc', 'Организация развлекательных пространств для всей семьи')
    }
  ]

  const designFeatures = [
    {
      icon: "🏠",
      title: getText('feature_1_title', 'Индивидуальная планировка'),
      description: getText('feature_1_desc', 'Учет архитектурных особенностей и расположения дома')
    },
    {
      icon: "🌳",
      title: getText('feature_2_title', 'Связь с ландшафтом'),
      description: getText('feature_2_desc', 'Интеграция интерьера с окружающим пространством')
    },
    {
      icon: "💡",
      title: getText('feature_3_title', 'Естественное освещение'),
      description: getText('feature_3_desc', 'Максимальное использование дневного света')
    },
    {
      icon: "🛋",
      title: getText('feature_4_title', 'Просторные помещения'),
      description: getText('feature_4_desc', 'Создание комфортных пространств для большой семьи')
    }
  ]

const experienceStats = [
    {
      value: getText('experience_1_value', '80+'),
      label: getText('experience_1_label', 'Частных домов')
    },
    {
      value: getText('experience_2_value', '5-12'),
      label: getText('experience_2_label', 'Недель на проект')
    },
    {
      value: getText('experience_3_value', '100%'),
      label: getText('experience_3_label', 'Учтена архитектура')
    },
    {
      value: getText('experience_4_value', '24/7'),
      label: getText('experience_4_label', 'Поддержка проекта')
    }
  ]

  return (
    <div className="min-h-screen bg-stone-50 md:py-16 py-8 md:px-6 px-[0] md:pl-[20%] pl-[0]">
      <div className="max-w-7xl mx-auto">
        
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center md:mb-16 mb-8 px-4"
        >
          <h1 className="text-2xl md:text-5xl font-light text-stone-800 mb-3 md:mb-4">
            {getText('house_interior_title', 'ДИЗАЙН ИНТЕРЬЕРА ДОМА')}
          </h1>
          <div className="w-20 md:w-24 h-1 bg-[#ffe6b6] mx-auto mb-4 md:mb-6"></div>
          <p className="md:text-xl text-sm text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {getText('house_interior_subtitle', 'Создаем гармоничные пространства, где архитектура и интерьер существуют в единой концепции')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 md:mb-16 mb-8">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="bg-white md:rounded-2xl rounded-[0] md:p-8 p-4 shadow-lg border border-stone-200">
              <h2 className="text-xl md:text-2xl font-bold text-stone-800 mb-4 md:mb-6 flex items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#ffe6b6] rounded-xl flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-white text-base md:text-lg">🎨</span>
                </div>
                {getText('styles_title', 'Стили интерьера для дома')}
              </h2>

              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                {designStyles.map((style, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      activeStyle === index 
                        ? 'border-amber-500 bg-amber-50' 
                        : 'border-stone-200 bg-white hover:border-amber-300'
                    }`}
                    onClick={() => setActiveStyle(index)}
                  >
                    <div className="flex items-center space-x-2 md:space-x-3 mb-2">
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center ${
                        activeStyle === index ? 'bg-[#ffe6b6]' : 'bg-stone-100'
                      }`}>
                        <span className={`text-sm md:text-base ${activeStyle === index ? 'text-white' : 'text-stone-600'}`}>
                          {style.icon}
                        </span>
                      </div>
                      <h3 className={`font-semibold text-sm md:text-base ${
                        activeStyle === index ? 'text-stone-800' : 'text-stone-700'
                      }`}>
                        {style.name}
                      </h3>
                    </div>
                    <p className="text-stone-600 text-xs md:text-sm mb-2 leading-relaxed">{style.description}</p>

<div className="flex flex-wrap gap-1">
                      {style.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className={`text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded ${
                            activeStyle === index 
                              ? 'bg-[#ffe6b6] text-white' 
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-stone-800 md:rounded-2xl rounded-[0] md:p-8 p-4 text-amber-50">
              <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-amber-100">
                {getText('special_features_title', 'Особенные решения для дома')}
              </h3>
              <div className="grid gap-3 md:gap-4">
                {specialFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-stone-700 rounded-xl"
                  >
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-[#ffe6b6] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-base md:text-lg">{feature.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-100 text-sm md:text-lg mb-1">{feature.title}</h4>
                      <p className="text-amber-100 text-xs md:text-sm opacity-90 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 md:space-y-8"
          >
            
            <div className="bg-white md:rounded-2xl rounded-[0] md:p-8 p-4 shadow-lg border border-stone-200">
              <h2 className="text-xl md:text-2xl font-bold text-stone-800 mb-4 md:mb-6 flex items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#ffe6b6] rounded-xl flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-white text-base md:text-lg">🔄</span>
                </div>
                {getText('process_title', 'Процесс проектирования')}
              </h2>
              
              <div className="space-y-4 md:space-y-6">
                {designProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-amber-50 rounded-xl border border-amber-100"
                  >
                    <div className="w-12 h-10 md:w-15 md:h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-amber-600 font-bold text-[8px] md:text-[10px]">{step.stage}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-800 text-sm md:text-lg mb-1 md:mb-2">{step.title}</h3>
                      <p className="text-stone-600 text-xs md:text-sm mb-2 md:mb-3 leading-relaxed">{step.description}</p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {step.details.map((detail, idx) => (

<span 
                            key={idx}
                            className="text-xs px-2 py-1 bg-white rounded border border-amber-200 text-stone-600"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-stone-700 to-stone-800 md:rounded-2xl rounded-[0] md:p-8 p-4 text-amber-50">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-amber-100">
                {getText('design_features_title', 'Особенности дизайна домов')}
              </h3>
              
              <div className="space-y-3 md:space-y-4">
                {designFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-[#ffe6b6] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs md:text-sm">{feature.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-100 text-sm md:text-base">{feature.title}</h4>
                      <p className="text-amber-100 text-xs md:text-sm opacity-90 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-stone-600 rounded-xl">
                <p className="text-amber-100 text-xs md:text-sm text-center leading-relaxed">
                  {getText('design_features_note', 'Каждый проект начинается с глубокого анализа архитектуры дома и образа жизни его жильцов')}
                </p>
              </div>
            </div>

            <div className="bg-white md:rounded-2xl rounded-[0] md:p-6 p-4 shadow-lg border border-stone-200">
              <h3 className="text-base md:text-lg font-bold text-stone-800 mb-3 md:mb-4 text-center">
                {getText('experience_title', 'Опыт работы с домами')}
              </h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4 text-center">
                {experienceStats.map((stat, index) => (
                  <div key={index} className="p-2 md:p-3">
                    <div className="text-lg md:text-2xl font-bold text-amber-600 mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-stone-600 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="md:mt-16 mt-8 text-center"
        >
          <div className="bg-white md:rounded-xl rounded-[0] md:p-8 p-6 shadow-sm border border-stone-200 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-light text-stone-800 mb-3">
              {getText('cta_title', 'Создадим интерьер вашего дома вместе?')}
            </h3>
            <p className="text-stone-600 text-sm md:text-base mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
              {getText('cta_description', 'Разработаем дизайн-проект, который подчеркнет архитектуру дома и создаст идеальную среду для вашей семьи')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contacts" className='w-full'>
              <button className="w-full bg-stone-800 text-amber-50 font-medium py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-stone-700 transition-colors text-sm">

{getText('cta_button_primary', 'Получить консультацию')}
              </button>
              </a>
              <a href="/portfolio" className='w-full'>
              <button className="w-full border border-stone-800 text-stone-800 font-medium py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-stone-800 hover:text-amber-50 transition-colors text-sm">
                {getText('cta_button_secondary', 'Посмотреть портфолио')}
              </button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}