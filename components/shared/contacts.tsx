'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TextContent {
  id: string
  key: string
  content: string
}

export default function ContactsPage() {
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
    return (
      <div className="h-screen bg-stone-50 flex items-center justify-center md:pl-[18%] pl-[0] overflow-auto">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  const contactInfo = [
    {
      icon: '📞',
      title: getText('contact_phone_title', 'Телефон'),
      details: [
        getText('contact_phone_1', '+7 (495) 123-45-67'),
        getText('contact_phone_2', '+7 (800) 123-45-68')
      ],
      description: getText('contact_phone_description', 'Ежедневно с 9:00 до 21:00')
    },
    {
      icon: '📧',
      title: getText('contact_email_title', 'Email'),
      details: [
        getText('contact_email_1', 'info@mr-alliance.ru'),
        getText('contact_email_2', 'projects@mr-alliance.ru')
      ],
      description: getText('contact_email_description', 'Ответим в течение 2 часов')
    },
    {
      icon: '📍',
      title: getText('contact_address_title', 'Адрес'),
      details: [
        getText('contact_address_line1', 'г. Москва, ул. Строителей, д. 45'),
        getText('contact_address_line2', 'БЦ "СтройПлаза", офис 305')
      ],
      description: getText('contact_address_description', 'Пн-Пт с 10:00 до 19:00')
    },
    {
      icon: '💬',
      title: getText('contact_messengers_title', 'Мессенджеры'),
      details: [
        getText('contact_messenger_1', 'WhatsApp'),
        getText('contact_messenger_2', 'Telegram'),
        getText('contact_messenger_3', 'Viber')
      ],
      description: getText('contact_messengers_description', 'Круглосуточная поддержка')
    }
  ]

  const socialLinks = [
    { 
      name: getText('social_vk_name', 'VK'), 
      icon: '👥', 
      url: getText('social_vk_url', '#') 
    },
    { 
      name: getText('social_instagram_name', 'Instagram'), 
      icon: '📷', 
      url: getText('social_instagram_url', '#') 
    },
    { 
      name: getText('social_youtube_name', 'YouTube'), 
      icon: '🎥', 
      url: getText('social_youtube_url', '#') 
    },
    { 
      name: getText('social_facebook_name', 'Facebook'), 
      icon: '👤', 
      url: getText('social_facebook_url', '#') 
    }
  ]

  const companyDetails = [
    {
      label: getText('company_name_label', 'Название:'),
      value: getText('company_name_value', 'ООО "МР АЛЬЯНС"')
    },
    {
      label: getText('company_inn_label', 'ИНН:'),
      value: getText('company_inn_value', '1234567890')
    },
    {
      label: getText('company_ogrn_label', 'ОГРН:'),
      value: getText('company_ogrn_value', '1234567890123')
    },
    {
      label: getText('company_account_label', 'Расчетный счет:'),
      value: getText('company_account_value', '40702810123456789012')
    }
  ]

const advantages = [
    {
      title: getText('advantage_1_title', 'Бесплатная консультация'),
      description: getText('advantage_1_description', 'Подробный разбор вашего проекта')
    },
    {
      title: getText('advantage_2_title', 'Индивидуальный подход'),
      description: getText('advantage_2_description', 'Учет всех ваших пожеланий')
    },
    {
      title: getText('advantage_3_title', 'Опытная команда'),
      description: getText('advantage_3_description', 'Профессионалы с многолетним опытом')
    },
    {
      title: getText('advantage_4_title', 'Гарантия качества'),
      description: getText('advantage_4_description', 'Строгий контроль на всех этапах')
    }
  ]

  const statistics = [
    {
      value: getText('stat_projects_value', '50+'),
      label: getText('stat_projects_label', 'Реализованных проектов')
    },
    {
      value: getText('stat_experience_value', '15+'),
      label: getText('stat_experience_label', 'Лет на рынке')
    },
    {
      value: getText('stat_clients_value', '100%'),
      label: getText('stat_clients_label', 'Довольных клиентов')
    },
    {
      value: getText('stat_support_value', '24/7'),
      label: getText('stat_support_label', 'Поддержка клиентов')
    }
  ]

  return (
    <div className="min-h-screen bg-stone-50 md:py-16 py-8 pt-28 md:px-4 px-[0] lg:pl-[18%] pl-[0] overflow-auto">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center md:mb-16 mb-8 px-4"
        >
          <h1 className="text-2xl md:text-5xl font-light text-stone-800 mb-3 md:mb-4">
            {getText('contacts_title', 'КОНТАКТЫ')}
          </h1>
          <div className="w-20 md:w-24 h-1 bg-[#ffe6b6] mx-auto mb-4 md:mb-6"></div>
          <p className="text-sm md:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {getText('contacts_subtitle', 'Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы и обсудить ваш проект.')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 md:mb-16 mb-8">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="bg-white md:rounded-2xl rounded-[0] md:p-8 p-4 shadow-lg border border-stone-200">
              <h2 className="text-xl md:text-2xl font-bold text-stone-800 md:mb-8 mb-6 flex items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#ffe6b6] rounded-xl flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-white text-base md:text-lg">📱</span>
                </div>
                {getText('contact_info_title', 'Контактная информация')}
              </h2>

              <div className="space-y-4 md:space-y-6">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-amber-50 rounded-xl border border-amber-100"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-lg md:text-xl">{contact.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-stone-800 text-base md:text-lg mb-2 md:mb-3">{contact.title}</h3>
                      <div className="space-y-1 md:space-y-2 mb-2 md:mb-3">
                        {contact.details.map((detail, idx) => (
                          <p key={idx} className="text-stone-700 text-sm md:text-base">{detail}</p>
                        ))}
                      </div>
                      <p className="text-stone-600 text-xs md:text-sm">{contact.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-stone-800 md:rounded-2xl rounded-[0] md:p-8 p-4 text-amber-50">
              <h3 className="text-xl md:text-2xl font-bold md:mb-6 mb-4 text-amber-100">
                {getText('company_details_title', 'Реквизиты компании')}
              </h3>
              <div className="space-y-3 md:space-y-4">
                {companyDetails.map((detail, index) => (
                  <div key={index} className="flex justify-between items-center py-2 md:py-3 border-b border-stone-700">
                    <span className="text-amber-200 text-sm md:text-base">{detail.label}</span>
                    <span className="text-amber-100 font-medium text-sm md:text-base text-right">{detail.value}</span>
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
            <div className="bg-white md:rounded-2xl rounded-[0] md:p-8 p-4 shadow-lg border border-stone-200">
              <h2 className="text-xl md:text-2xl font-bold text-stone-800 md:mb-6 mb-4 flex items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#ffe6b6] rounded-xl flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-white text-base md:text-lg">🌐</span>
                </div>
                {getText('social_title', 'Мы в социальных сетях')}
              </h2>
              
              <div className="grid gap-3 md:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-stone-50 rounded-xl border border-stone-200 hover:border-amber-300 transition-colors"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <span className="text-lg md:text-xl">{social.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-800 text-base md:text-lg">{social.name}</h3>
                      <p className="text-stone-600 text-xs md:text-sm">
                        {getText('social_description', 'Подписывайтесь на наши обновления')}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-stone-700 to-stone-800 md:rounded-2xl rounded-[0] md:p-8 p-4 text-amber-50">
              <h3 className="text-xl md:text-2xl font-bold md:mb-6 mb-4 text-amber-100">
                {getText('advantages_title', 'Почему выбирают нас')}
              </h3>
              
              <div className="space-y-3 md:space-y-4">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-stone-600 rounded-xl">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-[#ffe6b6] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs md:text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-100 text-sm md:text-base mb-1">{advantage.title}</h4>
                      <p className="text-amber-100 text-xs md:text-sm opacity-90">{advantage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white md:rounded-2xl rounded-[0] md:p-6 p-4 shadow-lg border border-stone-200">
              <h3 className="text-base md:text-lg font-bold text-stone-800 md:mb-4 mb-3 text-center">
                {getText('statistics_title', 'Наша статистика')}
              </h3>
              <div className="grid grid-cols-2 gap-4 md:gap-6 text-center">
                {statistics.map((stat, index) => (
                  <div key={index}>
                    <div className="text-xl md:text-3xl font-bold text-amber-600 mb-1">{stat.value}</div>
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-stone-800 to-stone-900 md:rounded-2xl rounded-[0] md:p-12 p-6 text-amber-50">
            <h3 className="text-xl md:text-3xl font-light md:mb-4 mb-3 text-amber-100">
              {getText('cta_title', 'Готовы обсудить ваш проект?')}
            </h3>
            <p className="text-amber-100 text-sm md:text-lg md:mb-8 mb-6 max-w-2xl mx-auto opacity-90 leading-relaxed">
              {getText('cta_description', 'Свяжитесь с нами прямо сейчас и получите бесплатную консультацию от наших специалистов')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button className="bg-[#ffe6b6] text-stone-900 font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg hover:bg-amber-400 transition-colors text-base md:text-lg">
                {getText('cta_button_phone', 'Позвонить')}
              </button>
              <button className="border-2 border-amber-400 text-amber-400 font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg hover:bg-amber-400 hover:text-stone-900 transition-colors text-base md:text-lg">
                {getText('cta_button_whatsapp', 'Написать в WhatsApp')}
              </button>
              <button className="border-2 border-amber-400 text-amber-400 font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg hover:bg-amber-400 hover:text-stone-900 transition-colors text-base md:text-lg">
                {getText('cta_button_email', 'Написать на Email')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}