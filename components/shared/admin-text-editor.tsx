'use client'

import { House, TextContent, GalleryPhoto } from "@prisma/client"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { ProductForm } from "./productform"
import { GalleryPhotoForm } from "./gallery-photo-form"
import { CatalogProvider } from "@/contexts/catalog-context"

interface Props {
  className?: string;
  items: House[]
  galleryPhotos: GalleryPhoto[]
}

export const TextEditor: React.FC<React.PropsWithChildren<Props>> = ({ items, galleryPhotos }) => {
  const [texts, setTexts] = useState<TextContent[]>([])
  const [filteredTexts, setFilteredTexts] = useState<TextContent[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [activeTab, setActiveTab] = useState<'texts' | 'products' | 'gallery'>('texts')

  const loadTexts = async () => {
    try {
      const response = await fetch('/api/texts')
      const data = await response.json()
      setTexts(data)
      setFilteredTexts(data)
    } catch (error) {
      console.error('Ошибка загрузки текстов:', error)
      toast.error('Ошибка загрузки текстов')
    }
  }

  useEffect(() => {
    loadTexts()
  }, [])

  useEffect(() => {
    let filtered = texts

    if (searchTerm) {
      filtered = filtered.filter(text => 
        text.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        text.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(text => text.category === selectedCategory)
    }

    setFilteredTexts(filtered)
  }, [searchTerm, selectedCategory, texts])

  const updateText = async (id: string) => {
    try {
      await fetch(`/api/texts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent })
      })

      setEditingId(null)
      setEditContent('')
      loadTexts()
      toast.success('Текст успешно обновлен')
    } catch (error) {
      console.error('Ошибка обновления текста:', error)
      toast.error('Ошибка при обновлении текста')
    }
  }

  const deleteText = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот текст?')) return
    
    try {
      await fetch(`/api/texts/${id}`, { method: 'DELETE' })
      loadTexts()
      toast.success('Текст успешно удален')
    } catch (error) {
      console.error('Ошибка удаления текста:', error)
      toast.error('Ошибка при удалении текста')
    }
  }

  const startEdit = (text: TextContent) => {
    setEditingId(text.id)
    setEditContent(text.content)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditContent('')
  }

  const categories = [...new Set(texts.map(text => text.category || 'без категории'))].sort()

  return ( 
    <CatalogProvider items={items}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Панель администратора</h1>
          
          <div className="mb-8 bg-white rounded-lg shadow-sm border">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('texts')}
                className={`flex-1 py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'texts'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Редактирование текстов
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`flex-1 py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'products'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Управление домами
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex-1 py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'gallery'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Галерея фотографий
              </button>
            </nav>
          </div>

          {activeTab === 'texts' ? (
            <>
              <div className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Поиск и фильтрация текстов</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Поиск по ключу или содержанию
                    </label>
                    <input
                      type="text"
                      placeholder="Введите ключ или текст для поиска..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Фильтр по категориям
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                    >
                      <option value="">Все категории</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Всего текстов: <strong>{texts.length}</strong>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Найдено: <strong>{filteredTexts.length}</strong>
                  </span>
                  {selectedCategory && (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Категория: <strong>{selectedCategory}</strong>
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {filteredTexts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 bg-white rounded-lg border">
                    {texts.length === 0 ? 'Тексты не загружены' : 'Тексты не найдены по вашему запросу'}
                  </div>
                ) : (
                  filteredTexts.map((text) => (
                    <div key={text.id} className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-2">
                          <div className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg border">
                            {text.key}
                          </div>
                          {text.category && (
                            <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                              {text.category}
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          {editingId === text.id ? (
                            <>
                              <button
                                onClick={() => updateText(text.id)}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors font-medium"
                              >
                                Сохранить
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors font-medium"
                              >
                                Отмена
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(text)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition-colors font-medium"
                              >
                                Редактировать
                              </button>
                              <button
                                onClick={() => deleteText(text.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors font-medium"
                              >
                                Удалить
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {editingId === text.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors h-32"
                            placeholder="Введите текст..."
                          />
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>Длина текста: {editContent.length} символов</span>
                            <span className={editContent.length > 1000 ? 'text-red-500' : ''}>
                              {editContent.length}/1000
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{text.content}</p>
                          <div className="mt-3 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                            Длина: {text.content.length} символов
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 p-6 border rounded-lg bg-white">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Быстрые действия</h3>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('')
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    Сбросить фильтры
                  </button>
                  <button
                    onClick={loadTexts}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    Обновить список
                  </button>
                </div>
              </div>
            </>
          ) : activeTab === 'products' ? (
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold mb-8 text-gray-900">Добавление карточек домов</h2>
              <ProductForm />
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold mb-8 text-gray-900">Управление галереей фотографий</h2>
              <GalleryPhotoForm galleryPhotos={galleryPhotos} />
            </div>
          )}
        </div>
      </div>
    </CatalogProvider>
  )
}