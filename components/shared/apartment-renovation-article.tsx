'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TextContent {
  id: string
  key: string
  content: string,
}

export default function RepairArticle() {
  const [activeTab, setActiveTab] = useState('start')
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

  const advantages = [
    getText('advantage_1', 'Опытные специалисты с соответствующим образованием и квалификацией'),
    getText('advantage_2', 'Исключительно качественные современные материалы'),
    getText('advantage_3', 'Соблюдение технологических карт и стандартов выполнения работ'),
    getText('advantage_4', 'Гарантия долговечности результата и безупречного качества')
  ]

  const documentation = [
    {
      title: getText('doc_1_title', 'Регламент работ'),
      desc: getText('doc_1_desc', 'Документированный план ремонтных работ')
    },
    {
      title: getText('doc_2_title', 'Дизайн-проект'),
      desc: getText('doc_2_desc', 'Визуализация будущего помещения')
    },
    {
      title: getText('doc_3_title', 'Договор'),
      desc: getText('doc_3_desc', 'Юридическое оформление сотрудничества')
    },
    {
      title: getText('doc_4_title', 'График работ'),
      desc: getText('doc_4_desc', 'Индивидуальный план выполнения')
    },
    {
      title: getText('doc_5_title', 'Детальная смета'),
      desc: getText('doc_5_desc', 'Поэтапный расчет стоимости')
    },
    {
      title: getText('doc_6_title', 'Ведомости материалов'),
      desc: getText('doc_6_desc', 'Список необходимых материалов')
    }
  ]

  const pricingFactors = [
    {
      title: getText('factor_1_title', 'Площадь и архитектура'),
      desc: getText('factor_1_desc', 'Площадь и архитектурные особенности помещений')
    },
    {
      title: getText('factor_2_title', 'Сложность проекта'),
      desc: getText('factor_2_desc', 'Техническая сложность и дизайнерские решения')
    },
    {
      title: getText('factor_3_title', 'Перепланировка'),
      desc: getText('factor_3_desc', 'Необходимость изменения планировки помещений')
    },
    {
      title: getText('factor_4_title', 'Материалы'),
      desc: getText('factor_4_desc', 'Качество и стоимость отделочных материалов')
    },
    {
      title: getText('factor_5_title', 'Сроки выполнения'),
      desc: getText('factor_5_desc', 'Временные рамки выполнения работ')
    }
  ]

  const calculationBenefits = [
    getText('calc_benefit_1', 'Бесплатная консультация'),
    getText('calc_benefit_2', 'Точный расчет за квадратный метр'),
    getText('calc_benefit_3', 'Анализ всех факторов стоимости'),
    getText('calc_benefit_4', 'Прозрачная смета')
  ]

  const guarantees = [
    {
      value: getText('guarantee_1_value', '100%'),
      label: getText('guarantee_1_label', 'Гарантия качества')
    },
    {
      value: getText('guarantee_2_value', '5 лет'),
      label: getText('guarantee_2_label', 'Гарантия на работы')
    },
    {
      value: getText('guarantee_3_value', '24/7'),
      label: getText('guarantee_3_label', 'Поддержка')
    }
  ]

return (
    <div className="min-h-screen bg-stone-50 md:py-16 py-8 md:px-4 lg:pl-[18%] pl-[0]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center md:mb-16 mb-8 px-5"
        >
          <h1 className="text-2xl md:text-5xl font-light text-stone-800 mb-3 md:mb-4">
            {getText('repair_article_title', 'С ЧЕГО НАЧИНАЕТСЯ РЕМОНТ')}
          </h1>
          <div className="w-20 md:w-24 h-1 bg-[#ffe6b6] mx-auto mb-4 md:mb-6"></div>
          <p className="md:text-xl text-sm text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {getText('repair_article_subtitle', 'Профессиональный подход к ремонту квартир и загородных домов')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="bg-white md:rounded-xl rounded-[0] md:p-8 p-4 shadow-sm border border-stone-200">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-stone-800 rounded-full flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-amber-400 font-bold text-base md:text-lg">1</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-stone-800">
                  {getText('first_stage_title', 'Первый этап ремонта')}
                </h2>
              </div>
              <p className="text-stone-700 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                {getText('first_stage_description', 'Определение объёма работ и составление бюджета. Грамотное планирование технологических процессов отделки позволяет выполнить все работы максимально точно, рассчитать необходимое количество материалов и привлечь квалифицированных специалистов.')}
              </p>
            </div>

            <div className="bg-stone-800 md:rounded-xl rounded-[0] md:p-8 p-4 text-amber-50">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-amber-100">
                {getText('advantages_title', 'Наши преимущества')}
              </h3>
              <div className="space-y-3 md:space-y-4">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-stone-700 rounded-lg">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-[#ffe6b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-1">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-stone-200 text-sm md:text-base">{advantage}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white md:rounded-xl rounded-[0] md:p-8 p-4 shadow-sm border border-stone-200">
              <h3 className="text-xl md:text-2xl font-bold text-stone-800 mb-4 md:mb-6 flex items-center">
                <div className="w-2 h-6 md:w-3 md:h-8 bg-amber-600 mr-3 md:mr-4 rounded-full"></div>
                {getText('documentation_title', 'Подготовка документации')}
              </h3>
              <div className="grid gap-3 md:gap-4">
                {documentation.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-700 font-bold text-sm md:text-base">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-800 text-sm md:text-base">{doc.title}</h4>
                      <p className="text-stone-600 text-xs md:text-sm">{doc.desc}</p>
                    </div>
                  </div>
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
            <div className="bg-white md:rounded-xl rounded-[0] md:p-8 p-4 shadow-sm border border-stone-200">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-600 rounded-full flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-white font-bold text-base md:text-lg">₽</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-stone-800">
                  {getText('pricing_title', 'КАК ФОРМИРУЕТСЯ СТОИМОСТЬ')}
                </h2>
              </div>
              
              <p className="text-stone-700 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                {getText('pricing_description', 'Планирование ремонта становится значительно проще, когда заранее известна его итоговая стоимость. Мы готовы помочь вам рассчитать стоимость ремонта «под ключ» за квадратный метр с учётом всех особенностей вашего объекта.')}
              </p>

              <div className="space-y-4 md:space-y-6">
                {pricingFactors.map((factor, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="group p-4 md:p-6 bg-gradient-to-r from-amber-50 to-stone-50 rounded-lg border border-amber-200 transition-all duration-300 hover:border-amber-300"
                  >
                    <h3 className="font-semibold text-stone-800 text-base md:text-lg mb-2 md:mb-3 flex items-center">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-stone-700 rounded-full flex items-center justify-center mr-2 md:mr-3 group-hover:scale-110 transition-transform">
                        <span className="text-amber-400 text-xs md:text-sm font-bold">{index + 1}</span>
                      </div>
                      {factor.title}
                    </h3>
                    <p className="text-stone-700 text-sm md:text-base">{factor.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-stone-700 to-stone-800 md:rounded-xl rounded-[0] md:p-8 p-4 text-amber-50">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-amber-100">
                {getText('individual_calc_title', 'Индивидуальный расчёт')}
              </h3>
              <p className="text-amber-100 mb-4 md:mb-6 opacity-90 text-sm md:text-base leading-relaxed">
                {getText('individual_calc_description', 'Для жителей Москвы и области мы предлагаем индивидуальный подход к определению бюджета ремонта квартиры, загородного дома или коттеджа.')}
              </p>
              
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                {calculationBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                    <span className="text-sm md:text-base">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <a href="/contacts" className='w-full'>
                <button className="w-full flex-1 bg-[#ffe6b6] text-stone-900 font-semibold py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-amber-400 transition-colors duration-300 text-sm md:text-base">
                  {getText('calc_button_primary', 'Рассчитать стоимость')}
                </button>
                </a>
                <a href="/contacts" className='w-full'>
                <button className="w-full flex-1 bg-transparent border-2 border-amber-400 text-amber-400 font-semibold py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-amber-400 hover:text-stone-900 transition-colors duration-300 text-sm md:text-base">
                  {getText('calc_button_secondary', 'Консультация')}
                </button>
                </a>
              </div>
            </div>
            <div className="bg-white md:rounded-xl rounded-[0] md:p-6 p-4 shadow-sm border border-stone-200">
              <div className="flex items-center justify-around text-center">
                {guarantees.map((guarantee, index) => (
                  <div key={index}>
                    <div className="text-lg md:text-2xl font-bold text-amber-600">{guarantee.value}</div>
                    <div className="text-xs md:text-sm text-stone-600 leading-tight">{guarantee.label}</div>
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
              {getText('cta_title', 'Готовы начать ремонт?')}
            </h3>
            <p className="text-stone-600 text-sm md:text-base mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
              {getText('cta_description', 'Оставьте заявку и получите бесплатную консультацию от нашего специалиста с детальным расчетом стоимости вашего проекта')}
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