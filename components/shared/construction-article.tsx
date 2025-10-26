'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TextContent {
  id: string
  key: string
  content: string
}

export default function ConstructionArticle() {
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

  const principles = [
    getText('principle_1', 'Соблюдение нормативов'),
    getText('principle_2', 'Полный цикл работ'),
    getText('principle_3', 'Элитные коттеджи'),
    getText('principle_4', 'Гарантия качества')
  ]

  const constructionStages = [
    {
      step: getText('stage_1_step', '01'),
      title: getText('stage_1_title', 'Техническое задание'),
      description: getText('stage_1_desc', 'Разработка ТЗ на возведение дома с пояснительной запиской')
    },
    {
      step: getText('stage_2_step', '02'),
      title: getText('stage_2_title', 'Проектирование'),
      description: getText('stage_2_desc', 'Архитектурные и инженерные решения с 3D-моделированием')
    },
    {
      step: getText('stage_3_step', '03'),
      title: getText('stage_3_title', 'Согласование'),
      description: getText('stage_3_desc', 'Предложение нескольких вариантов для согласования с клиентом')
    },
    {
      step: getText('stage_4_step', '04'),
      title: getText('stage_4_title', 'Реализация'),
      description: getText('stage_4_desc', 'Возведение от фундамента до кровельных работ')
    }
  ]

  const standards = [
    {
      icon: "📋",
      title: getText('standard_1_title', 'Детальная смета'),
      description: getText('standard_1_desc', 'На основе проектной документации')
    },
    {
      icon: "📝",
      title: getText('standard_2_title', 'Договор подряда'),
      description: getText('standard_2_desc', 'Юридическое оформление сотрудничества')
    },
    {
      icon: "🏠",
      title: getText('standard_3_title', 'Возведение'),
      description: getText('standard_3_desc', 'От заливки фундамента до кровельных работ')
    },
    {
      icon: "🎨",
      title: getText('standard_4_title', 'Дизайн и отделка'),
      description: getText('standard_4_desc', 'Оформление помещений и ландшафта')
    },
    {
      icon: "🔧",
      title: getText('standard_5_title', 'Коммуникации'),
      description: getText('standard_5_desc', 'Прокладка инженерных систем')
    }
  ]

  const additionalOptions = [
    getText('additional_option_1', 'Изучение готовых проектов'),
    getText('additional_option_2', 'Разработка индивидуального проекта'),
    getText('additional_option_3', 'Консультация менеджера'),
    getText('additional_option_4', 'Поэтапное выполнение работ')
  ]

  return (
    <div className="min-h-screen bg-stone-50 md:py-16 py-8 md:px-4 px-[0] lg:pl-[18%] pl-[0]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center md:mb-16 mb-8 px-4"
        >
          <h1 className="text-2xl md:text-5xl font-light text-stone-800 mb-3 md:mb-4">
            {getText('construction_title', 'СТРОИТЕЛЬСТВО ДОМОВ')}
          </h1>
          <div className="w-20 md:w-24 h-1 bg-[#ffe6b6] mx-auto mb-4 md:mb-6"></div>
          <p className="md:text-xl text-sm text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {getText('construction_subtitle', 'Создаем надежные дома, соответствующие высшим стандартам качества и вашим ожиданиям')}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
          
          {/* Левая часть - основной контент */}
          <div className="lg:w-7/12 space-y-6 md:space-y-10">
            
            {/* Блок введения */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -left-3 top-0 w-1 h-full bg-amber-400"></div>
              <div className="md:pl-6 px-4">
                <p className="md:text-xl text-base leading-relaxed text-stone-700 mb-4 md:mb-6">
                  {getText('intro_text_1', 'На современном рынке представлено множество компаний, предлагающих строительные услуги по низким ценам. Однако выбор подрядчика требует взвешенного подхода.')}
                </p>
                <div className="bg-amber-50 rounded-lg p-3 md:p-4 border border-amber-200">
                  <p className="text-stone-700 italic text-sm md:text-base">
                    {getText('intro_quote', '"Мы убеждены: важно не просто построить здание, а создать надежное жилье, соответствующее всем стандартам качества и законодательным требованиям."')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Блок преимуществ */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-4 md:p-6 md:rounded-xl rounded-[0] shadow-sm border border-stone-200"
            >
              <div className="flex items-start space-x-3 md:space-x-4 mb-3 md:mb-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-stone-800 rounded-xl flex items-center justify-center">
                    <span className="text-amber-400 text-lg md:text-xl">🏆</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-stone-800 mb-1 md:mb-2">
                    {getText('principles_title', 'Наши принципы')}
                  </h3>
                  <p className="text-stone-700 text-xs md:text-sm leading-relaxed">
                    {getText('principles_description', 'Строго соблюдаем установленные нормативы, осуществляем полный цикл работ и предлагаем клиентам комфортабельные элитные коттеджи.')}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-3 mt-3 md:mt-4">
                {principles.map((principle, index) => (
                  <div key={index} className="flex items-center space-x-1 md:space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#ffe6b6] rounded-full"></div>
                    <span className="text-stone-700 text-xs md:text-sm">{principle}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Блок этапов строительства */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-stone-800 md:rounded-xl rounded-[0] md:p-6 p-4 text-amber-50"
            >
              <h3 className="text-xl md:text-2xl font-light mb-3 md:mb-4 text-amber-100">
                {getText('construction_stages_title', 'Этапы строительства')}
              </h3>
              <div className="space-y-3 md:space-y-4">
                {constructionStages.map((stage, index) => (
                  <div key={index} className="flex items-start space-x-2 md:space-x-3 p-2 md:p-3 bg-stone-700 rounded-lg">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-[#ffe6b6] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs md:text-sm font-bold">{stage.step}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-100 text-xs md:text-sm mb-1">{stage.title}</h4>
                      <p className="text-amber-100 text-xs opacity-90 leading-relaxed">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Правая часть - акценты */}
          <div className="lg:w-5/12 space-y-4 md:space-y-6">
            
            {/* Блок стандартов качества */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="sticky top-6"
            >
              <div className="bg-white md:rounded-xl rounded-[0] md:p-6 p-4 shadow-lg border border-stone-200">
                <div className="text-center mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <span className="text-amber-600 text-lg md:text-xl">⭐️</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-stone-800">
                    {getText('standards_title', 'Стандарты качества')}
                  </h2>
                  <p className="text-stone-600 mt-1 text-xs md:text-sm">
                    {getText('standards_subtitle', 'Четко отработанная схема')}
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {standards.map((standard, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-2 md:space-x-3 p-2 md:p-3 bg-amber-50 rounded-lg border border-amber-100"
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="text-base md:text-lg">{standard.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-stone-800 mb-1 text-xs md:text-sm">{standard.title}</h4>
                        <p className="text-stone-600 text-xs leading-relaxed">{standard.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Блок дополнительных возможностей */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-4 md:mt-6 bg-gradient-to-br from-stone-700 to-stone-800 md:rounded-xl rounded-[0] md:p-6 p-4 text-amber-50"
              >
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-amber-100">
                  {getText('additional_options_title', 'Дополнительные возможности')}
                </h3>
                <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                  {additionalOptions.map((option, index) => (
                    <div key={index} className="flex items-center space-x-1 md:space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                      <span className="text-amber-100 text-xs md:text-sm">{option}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-3 md:pt-4 border-t border-stone-600">
                  <p className="text-amber-200 text-xs md:text-sm mb-2 md:mb-3 text-center">
                    {getText('additional_note', 'Современные технологии гарантируют качественное и комфортабельное жилье')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <button className="flex-1 bg-[#ffe6b6] text-stone-900 font-medium py-1.5 md:py-2 px-2 md:px-3 rounded-lg hover:bg-amber-400 transition-colors text-xs">
                      {getText('additional_button_1', 'Готовые проекты')}
                    </button>
                    <button className="flex-1 bg-transparent border border-amber-400 text-amber-400 font-medium py-1.5 md:py-2 px-2 md:px-3 rounded-lg hover:bg-amber-400 hover:text-stone-900 transition-colors text-xs">
                      {getText('additional_button_2', 'Индивидуальный проект')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Футер CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="md:mt-16 mt-8 text-center"
        >
          <div className="bg-white md:rounded-xl rounded-[0] md:p-8 p-6 shadow-sm border border-stone-200 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-light text-stone-800 mb-3">
              {getText('cta_title', 'Начните строительство вашего дома')}
            </h3>
            <p className="text-stone-600 text-sm md:text-base mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
              {getText('cta_description', 'Поэтапное выполнение работ от проектирования до внутренней отделки гарантирует строительство качественного и комфортабельного жилья.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contacts" className='w-full'>
              <button className="w-full bg-stone-800 text-amber-50 font-medium py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-stone-700 transition-colors text-sm">
                {getText('cta_button_primary', 'Получить консультацию')}
              </button>
              </a>
              <a href="/catalog" className='w-full'>
              <button className="w-full border border-stone-800 text-stone-800 font-medium py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-stone-800 hover:text-amber-50 transition-colors text-sm">
                {getText('cta_button_secondary', 'Смотреть проекты')}
              </button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}