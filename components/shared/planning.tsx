'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TextContent {
  id: string
  key: string
  content: string
}

export default function DesignArticle() {
  const [texts, setTexts] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  // Загрузка текстов из базы данных
  useEffect(() => {
    const loadTexts = async () => {
      try {
        const response = await fetch('/api/texts')
        const data: TextContent[] = await response.json()
        
        // Преобразуем массив в объект для удобного доступа
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

  // Функция для получения текста по ключу
  const getText = (key: string, fallback: string = '') => {
    return texts[key] || fallback
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center md:pl-[18%] pl-[0]">
        <div className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3 md:mb-4"></div>
          <p className="text-stone-600 text-sm md:text-base">Загрузка...</p>
        </div>
      </div>
    )
  }

  // Данные для блоков (теперь с загрузкой из БД)
  const keyPoints = [
    {
      icon: "📏",
      title: getText('key_point_1_title', 'Площадь дома'),
      description: getText('key_point_1_desc', 'Соответствует количеству постоянных жильцов и возможных гостей')
    },
    {
      icon: "🏢", 
      title: getText('key_point_2_title', 'Количество этажей'),
      description: getText('key_point_2_desc', 'Определяется потребностями семьи и планируемым числом проживающих')
    },
    {
      icon: "📍",
      title: getText('key_point_3_title', 'Расположение участка'),
      description: getText('key_point_3_desc', 'Удобство выезда в город, доступность транспортных развязок, расстояние до магазинов')
    }
  ]

  const services = [
    getText('service_1', 'Архитектурные и конструктивные решения'),
    getText('service_2', 'Схемы инженерных коммуникаций'), 
    getText('service_3', 'Проекты благоустройства территории'),
    getText('service_4', 'Современные технологии проектирования')
  ]

  const specializationFeatures = [
    getText('specialization_feature_1', 'Все коммуникации'),
    getText('specialization_feature_2', 'Системы кондиционирования')
  ]

  const offers = [
    getText('offer_1', 'Адаптацию готового проекта'),
    getText('offer_2', 'Разработку индивидуального проекта')
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
            {getText('design_article_title', 'ПРОЕКТИРОВАНИЕ ДОМОВ')}
          </h1>
          <div className="w-20 md:w-24 h-1 bg-[#ffe6b6] mx-auto mb-4 md:mb-6"></div>
          <p className="md:text-xl text-sm text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {getText('design_article_subtitle', 'Создание архитектурных решений, где каждая деталь отражает ваше видение идеального дома')}
          </p>
        </motion.div>

        {/* Основной контент в асимметричном layout */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
          
          {/* Левая часть - текстовая */}
          <div className="lg:w-7/12 space-y-6 md:space-y-10">

            {/* Блок с цитатой */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -left-3 top-0 w-1 h-full bg-amber-400"></div>
              <div className="pl-6">
                <p className="md:text-xl text-base leading-relaxed text-stone-700 italic mb-4">
                  {getText('quote_text', '"Одним из ключевых преимуществ элитной загородной недвижимости является качественное проектирование. Грамотно разработанный проект — основа создания комфортабельного жилья с высокими стандартами проживания."')}
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-stone-800 rounded-full flex items-center justify-center">
                    <span className="text-amber-400 text-sm md:text-md">✓</span>
                  </div>
                  <span className="text-stone-600 font-medium text-sm md:text-base">
                    {getText('quote_note', 'Основа комфортного проживания')}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Блок специализации */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-4 md:p-6 md:rounded-xl rounded-[0] shadow-sm border border-stone-200"
            >
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-[#ffe6b6] rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg md:text-xl">🏗</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-stone-800 mb-2 md:mb-3">
                    {getText('specialization_title', 'Строительство «под ключ»')}
                  </h3>
                  <p className="text-stone-700 leading-relaxed mb-3 md:mb-4 text-xs md:text-sm">
                    {getText('specialization_description', 'Мы специализируемся на строительстве домов «под ключ», которое включает все необходимые коммуникации и системы кондиционирования. Наши специалисты готовы разработать для вас индивидуальный проект, отвечающий самым высоким требованиям.')}
                  </p>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {specializationFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-1 md:space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#ffe6b6] rounded-full"></div>
                        <span className="text-stone-700 text-xs md:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Блок индивидуального подхода */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-stone-800 md:rounded-xl rounded-[0] md:p-6 p-4 text-amber-50"
            >
              <h3 className="text-xl md:text-2xl font-light mb-3 md:mb-4 text-amber-100">
                {getText('individual_approach_title', 'Индивидуальный подход')}
              </h3>
              <p className="text-amber-100 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                {getText('individual_approach_description', 'При создании проекта загородного дома наши эксперты учитывают все пожелания клиента: от планировочных решений до инженерных систем и интерьера.')}
              </p>

              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-1 md:space-y-2">
                  <h4 className="font-semibold text-amber-200 text-sm md:text-base">
                    {getText('we_offer_title', 'Мы предлагаем:')}
                  </h4>
                  <ul className="space-y-1">
                    {offers.map((offer, index) => (
                      <li key={index} className="flex items-center space-x-1 md:space-x-2">
                        <div className="w-4 h-4 md:w-5 md:h-5 bg-[#ffe6b6] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">→</span>
                        </div>
                        <span className="text-xs md:text-sm">{offer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h4 className="font-semibold text-amber-200 text-sm md:text-base">
                    {getText('full_cycle_title', 'Полный цикл:')}
                  </h4>
                  <p className="text-amber-100 text-xs md:text-xs leading-relaxed">
                    {getText('full_cycle_description', 'От первоначальной концепции до получения всех необходимых согласований. На каждом этапе проект может быть скорректирован в соответствии с вашими пожеланиями.')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Правая часть - акценты и важные моменты */}
          <div className="lg:w-5/12 space-y-4 md:space-y-6">
            
            {/* Блок "Что важно учесть" */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="sticky top-6"
            >
              <div className="bg-white md:rounded-xl rounded-[0] md:p-6 p-4 shadow-lg border border-stone-200">
                <div className="text-center mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <span className="text-amber-600 text-lg md:text-xl">💡</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-stone-800">
                    {getText('key_points_title', 'Ключевые моменты')}
                  </h2>
                  <p className="text-stone-600 mt-1 text-xs md:text-sm">
                    {getText('key_points_subtitle', 'при проектировании')}
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {keyPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-2 md:space-x-3 p-2 md:p-3 bg-amber-50 rounded-lg border border-amber-100"
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="text-base md:text-lg">{point.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-stone-800 mb-1 text-xs md:text-sm">{point.title}</h4>
                        <p className="text-stone-600 text-xs leading-relaxed">{point.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Блок услуг */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-4 md:mt-6 bg-gradient-to-br from-stone-700 to-stone-800 md:rounded-xl rounded-[0] md:p-6 p-4 text-amber-50"
              >
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-amber-100">
                  {getText('services_title', 'Комплексные услуги')}
                </h3>
                <div className="space-y-1 md:space-y-2 mb-3 md:mb-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-1 md:space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                      <span className="text-amber-100 text-xs md:text-sm">{service}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-3 md:pt-4 border-t border-stone-600">
                  <div className="text-center">
                    <p className="text-amber-200 mb-2 md:mb-3 text-xs md:text-sm">
                      {getText('services_note', 'Два формата сотрудничества')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                      <button className="flex-1 bg-[#ffe6b6] text-stone-900 font-medium py-1.5 md:py-2 px-2 md:px-3 rounded-lg hover:bg-amber-400 transition-colors text-xs">
                        {getText('service_button_1', 'Адаптация проекта')}
                      </button>
                      <button className="flex-1 bg-transparent border border-amber-400 text-amber-400 font-medium py-1.5 md:py-2 px-2 md:px-3 rounded-lg hover:bg-amber-400 hover:text-stone-900 transition-colors text-xs">
                        {getText('service_button_2', 'Индивидуальное решение')}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="md:mt-16 mt-8 text-center"
        >
          <div className="bg-white md:rounded-xl rounded-[0] md:p-8 p-6 shadow-sm border border-stone-200 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-light text-stone-800 mb-3">
              {getText('cta_title', 'Готовы создать дом вашей мечты?')}
            </h3>
            <p className="text-stone-600 text-sm md:text-base mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
              {getText('cta_description', 'Каждый проект разрабатывается с учетом ваших потребностей и пожеланий. Начните с консультации нашего архитектора.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-stone-800 text-amber-50 font-medium py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-stone-700 transition-colors text-sm">
                <a href="/contacts" className='w-full'>
                {getText('cta_button_primary', 'Получить консультацию')}</a>
              </button>
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