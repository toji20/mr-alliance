'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TextContent {
  id: string
  key: string
  content: string
}

export default function DesignProjectPage() {
  const [activeStage, setActiveStage] = useState(0)
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

  const designStages = [
    {
      number: "01",
      title: getText('stage_1_title', 'Консультация'),
      description: getText('stage_1_desc', 'Обсуждение ваших пожеланий, потребностей и бюджета проекта'),
      icon: "💬"
    },
    {
      number: "02",
      title: getText('stage_2_title', 'Обмеры'),
      description: getText('stage_2_desc', 'Точные замеры помещения и анализ существующих условий'),
      icon: "📐"
    },
    {
      number: "03", 
      title: getText('stage_3_title', 'Планировка'),
      description: getText('stage_3_desc', 'Разработка оптимальной планировочной схемы помещений'),
      icon: "🏠"
    },
    {
      number: "04",
      title: getText('stage_4_title', 'Визуализация'),
      description: getText('stage_4_desc', 'Создание 3D-визуализаций будущего интерьера'),
      icon: "🎨"
    },
    {
      number: "05",
      title: getText('stage_5_title', 'Чертежи'),
      description: getText('stage_5_desc', 'Подготовка рабочей документации для строителей'),
      icon: "📋"
    },
    {
      number: "06",
      title: getText('stage_6_title', 'Авторский надзор'),
      description: getText('stage_6_desc', 'Контроль реализации проекта на всех этапах'),
      icon: "👁"
    }
  ]

  const benefits = [
    {
      icon: "✓",
      title: getText('benefit_avoid_errors_title', 'Избегаем ошибок'),
      description: getText('benefit_avoid_errors_desc', 'Проработанный проект исключает дорогостоящие переделки')
    },
    {
      icon: "✓",
      title: getText('benefit_save_budget_title', 'Экономим бюджет'),
      description: getText('benefit_save_budget_desc', 'Точный расчет материалов и грамотное распределение средств')
    },
    {
      icon: "✓",
      title: getText('benefit_visualization_title', 'Визуализация результата'),
      description: getText('benefit_visualization_desc', 'Вы видите будущий интерьер до начала работ')
    },
    {
      icon: "✓",
      title: getText('benefit_time_saving_title', 'Экономим время'),
      description: getText('benefit_time_saving_desc', 'Четкий план работ и заранее продуманные решения ускоряют процесс')
    },
    {
      icon: "✓",
      title: getText('benefit_quality_title', 'Профессиональный результат'),
      description: getText('benefit_quality_desc', 'Опыт наших дизайнеров гарантирует высокое качество исполнения')
    }
  ]

  const results = [
    {
icon: "📊",
      title: getText('result_1_title', 'Техническое задание'),
      description: getText('result_1_desc', 'Детальный план работ с учетом всех ваших пожеланий и технических возможностей помещения')
    },
    {
      icon: "🏗",
      title: getText('result_2_title', 'Планировочные решения'),
      description: getText('result_2_desc', 'Оптимальная организация пространства с расстановкой мебели и оборудования')
    },
    {
      icon: "🎭",
      title: getText('result_3_title', '3D-визуализация'),
      description: getText('result_3_desc', 'Фотореалистичные изображения будущего интерьера со всеми материалами и освещением')
    },
    {
      icon: "📐",
      title: getText('result_4_title', 'Рабочая документация'),
      description: getText('result_4_desc', 'Полный комплект чертежей для строителей: планы, развертки, узлы и схемы')
    },
    {
      icon: "🛍",
      title: getText('result_5_title', 'Ведомость материалов'),
      description: getText('result_5_desc', 'Подробный список всех отделочных материалов, мебели и декора с артикулами')
    },
    {
      icon: "👨‍💼",
      title: getText('result_6_title', 'Авторское сопровождение'),
      description: getText('result_6_desc', 'Контроль реализации проекта на объекте для точного соответствия дизайн-проекту')
    },
    {
      icon: "💡",
      title: getText('result_7_title', 'Световой сценарий'),
      description: getText('result_7_desc', 'Проработка системы освещения с учетом функциональных зон и атмосферы')
    },
    {
      icon: "🛋",
      title: getText('result_8_title', 'Подбор мебели'),
      description: getText('result_8_desc', 'Рекомендации по выбору мебели, которая идеально впишется в интерьер')
    }
  ]

  const pricingItems = [
    {
      label: getText('price_project_cost_label', 'Стоимость проекта:'),
      value: getText('price_project_cost_value', 'от 2 500 ₽/м²')
    },
    {
      label: getText('price_timeline_label', 'Срок разработки:'),
      value: getText('price_timeline_value', '3-6 недель')
    },
    {
      label: getText('price_measurements_label', 'Выезд на замеры:'),
      value: getText('price_measurements_value', 'Бесплатно')
    },
    {
      label: getText('price_consultation_label', 'Консультация:'),
      value: getText('price_consultation_value', 'Бесплатно')
    },
    {
      label: getText('price_revision_label', 'Правки на этапе работы:'),
      value: getText('price_revision_value', 'Бесплатно')
    }
  ]

  const guarantees = [
    {
      value: getText('guarantee_1_value', '100%'),
      label: getText('guarantee_1_label', 'Соответствие проекту')
    },
    {
      value: getText('guarantee_2_value', '12 мес'),
      label: getText('guarantee_2_label', 'Гарантия на проект')
    },
    {
      value: getText('guarantee_3_value', '∞'),
      label: getText('guarantee_3_label', 'Правки на этапе работы')
    },
    {
      value: getText('guarantee_4_value', '24/7'),
      label: getText('guarantee_4_label', 'Поддержка')
    },
    {
      value: getText('guarantee_5_value', '100%'),
      label: getText('guarantee_5_label', 'Конфиденциальность')
    },
    {
      value: getText('guarantee_6_value', '5 лет'),
      label: getText('guarantee_6_label', 'Опыт работы')
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
            {getText('design_project_title', 'ДИЗАЙН-ПРОЕКТ КВАРТИРЫ')}
</h1>
          <div className="w-20 md:w-24 h-1 bg-[#ffe6b6] mx-auto mb-4 md:mb-6"></div>
          <p className="md:text-xl text-sm text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {getText('design_project_subtitle', 'Создаем интерьеры, которые отражают ваш стиль и делают жизнь комфортнее')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 md:mb-16 mb-8">

          {/* Левая колонка - Основная информация */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Блок преимуществ */}
            <div className="bg-white md:rounded-2xl rounded-[0] md:p-8 p-4 shadow-lg border border-stone-200">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ffe6b6] rounded-xl flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-white text-lg md:text-xl">✨</span>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-800">
                    {getText('why_design_title', 'Почему нужен дизайн-проект?')}
                  </h2>
                  <p className="text-stone-600 text-xs md:text-sm">
                    {getText('why_design_subtitle', 'Профессиональный подход к созданию интерьера')}
                  </p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-amber-50 rounded-xl">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-[#ffe6b6] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-1">
                      <span className="text-white text-xs md:text-sm">{benefit.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-800 text-sm md:text-base mb-1">{benefit.title}</h4>
                      <p className="text-stone-600 text-xs md:text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Блок этапов */}
            <div className="bg-stone-800 md:rounded-2xl rounded-[0] md:p-8 p-4 text-amber-50">
              <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-amber-100">
                {getText('stages_title', 'Этапы работы')}
              </h3>
              <div className="space-y-3 md:space-y-4">
                {designStages.map((stage, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl cursor-pointer transition-all ${
                      activeStage === index ? 'bg-[#ffe6b6]' : 'bg-stone-700 hover:bg-stone-600'
                    }`}
                    onClick={() => setActiveStage(index)}
                  >
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activeStage === index ? 'bg-white' : 'bg-[#ffe6b6]'
                    }`}>
                      <span className={`text-base md:text-lg ${activeStage === index ? 'text-amber-500' : 'text-white'}`}>
                        {stage.icon}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">

<span className="text-xs md:text-sm font-bold opacity-80">{stage.number}</span>
                        <h4 className={`font-semibold text-sm md:text-base ${
                          activeStage === index ? 'text-white' : 'text-amber-100'
                        }`}>
                          {stage.title}
                        </h4>
                      </div>
                      <p className={`text-xs md:text-sm leading-relaxed ${
                        activeStage === index ? 'text-white' : 'text-amber-100 opacity-90'
                      }`}>
                        {stage.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Правая колонка */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 md:space-y-8"
          >
            
            {/* Блок что вы получаете */}
            <div className="bg-white md:rounded-2xl rounded-[0] md:p-8 p-4 shadow-lg border border-stone-200">
              <h2 className="text-xl md:text-2xl font-bold text-stone-800 mb-4 md:mb-6 flex items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#ffe6b6] rounded-xl flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-white text-base md:text-lg">📦</span>
                </div>
                {getText('what_included_title', 'Что входит в дизайн-проект')}
              </h2>
              
              <div className="grid gap-3 md:gap-4">
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-amber-50 rounded-xl border border-amber-100"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-lg md:text-xl">{result.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-800 text-sm md:text-lg mb-1 md:mb-2">{result.title}</h3>
                      <p className="text-stone-600 text-xs md:text-sm leading-relaxed">{result.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Блок стоимости и сроков */}
            <div className="bg-gradient-to-br from-stone-700 to-stone-800 md:rounded-2xl rounded-[0] md:p-8 p-4 text-amber-50">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-amber-100">
                {getText('pricing_title', 'Стоимость и сроки')}
              </h3>
              
              <div className="space-y-4 md:space-y-6">
                {pricingItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 md:py-3 border-b border-stone-600">
                    <span className="text-amber-200 text-sm md:text-base">{item.label}</span>
                    <span className="text-amber-100 font-semibold text-sm md:text-base text-right">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-stone-600 rounded-xl">
                <p className="text-amber-100 text-xs md:text-sm text-center leading-relaxed">
                  {getText('pricing_note', 'Точная стоимость рассчитывается индивидуально после обмеров помещения и обсуждения ваших пожеланий')}
                </p>
              </div>
            </div>

{/* Блок гарантий */}
            <div className="bg-white md:rounded-2xl rounded-[0] md:p-6 p-4 shadow-lg border border-stone-200">
              <h3 className="text-base md:text-lg font-bold text-stone-800 mb-3 md:mb-4 text-center">
                {getText('guarantees_title', 'Наши гарантии')}
              </h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4 text-center">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="p-2 md:p-3">
                    <div className="text-lg md:text-2xl font-bold text-amber-600 mb-1">
                      {guarantee.value}
                    </div>
                    <div className="text-xs md:text-sm text-stone-600 leading-tight">
                      {guarantee.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA блок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="md:mt-16 mt-8 text-center"
        >
          <div className="bg-white md:rounded-xl rounded-[0] md:p-8 p-6 shadow-sm border border-stone-200 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-light text-stone-800 mb-3">
              {getText('cta_title', 'Готовы создать интерьер вашей мечты?')}
            </h3>
            <p className="text-stone-600 text-sm md:text-base mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
              {getText('cta_description', 'Закажите дизайн-проект квартиры и получите бесплатную консультацию от нашего дизайнера')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-stone-800 text-amber-50 font-medium py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-stone-700 transition-colors text-sm">
                {getText('cta_button_primary', 'Получить консультацию')}
              </button>
              <button className="border border-stone-800 text-stone-800 font-medium py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-stone-800 hover:text-amber-50 transition-colors text-sm">
                {getText('cta_button_secondary', 'Посмотреть портфолио')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}