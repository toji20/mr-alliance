'use client'

import { createProduct } from "@/app/api/actions"
import { adminFormSchema, AdminFormValues } from "@/lib/shema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { AdminGroupCard } from "./admin-catalog-group-card"

interface Props {
    className?: string;
}

export const ProductForm:React.FC<Props> = ({
}) => {
    const [submitting, setSubmitting] = useState(false)
      const router = useRouter()
    const formMethods = useForm<AdminFormValues>({
        resolver: zodResolver(adminFormSchema),
        defaultValues: {
          name: '',
          imageUrl: '',
          price: 0,
          descr: '',
          size: 0,
          features: [''],
        },
      })
    
      const { 
        handleSubmit, 
        reset, 
        control, 
        formState: { errors } 
      } = formMethods
    
      const { fields, append, remove } = useFieldArray({
        control: control as any,
        name: "features",
        keyName: "id",
      })
    
      const addFeature = () => {
        append('')
      }
    
      const removeFeature = (index: number) => {
        if (fields.length > 1) {
          remove(index)
        }
      }
    
      const onSubmit = async (data: AdminFormValues) => {
        try {
          setSubmitting(true)
          
          // Фильтруем пустые особенности
          const filteredFeatures = data.features.filter(feature => feature.trim() !== '')
          
          const productData = {
            ...data,
            features: filteredFeatures,
          }
    
          const result = await createProduct(productData)
          
          if (result?.success) {
            toast.success('карточка успешно создана', {
              icon: '✅',
            })
            // Полный сброс формы
            reset()
            // Сбрасываем features к одному пустому полю
            remove()
            append('')
            router.refresh()
          } else {
            toast.error('Не удалось создать карточка', {
              icon: '❌',
            })
          }
        } catch (err) {
          console.error(err)
          toast.error('Произошла ошибка при создании карточкаа', {
            icon: '❌',
          })
        } finally {
          setSubmitting(false)
        }
      }
    return (
        <>
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Название карточкаа */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название карточки *
            </label>
            <input
              type="text"
              {...formMethods.register('name')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Введите название карточки"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Цена */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Цена *
            </label>
            <input
              type="number"
              step="0.01"
              {...formMethods.register('price', { valueAsNumber: true })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="0.00"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          {/* Ссылка на изображение */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ссылка на изображение *
            </label>
            <input
              type="url"
              {...formMethods.register('imageUrl')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
            )}
          </div>

          {/* Размер */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Размер *
            </label>
            <input
              type="number"
              {...formMethods.register('size', { valueAsNumber: true })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Введите размер"
            />
            {errors.size && (
              <p className="mt-1 text-sm text-red-600">{errors.size.message}</p>
            )}
          </div>

          {/* Особенности */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">

Особенности *
              </label>
              <span className="text-sm text-gray-500">
                {fields.length} {fields.length === 1 ? 'особенность' : 'особенностей'}
              </span>
            </div>
            
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      {...formMethods.register(`features.${index}` as const)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder={`Особенность ${index + 1}`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    disabled={fields.length === 1}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-red-200"
                    title="Удалить особенность"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-dashed border-blue-300 hover:border-blue-400 w-full justify-center"
              >
                <Plus size={18} />
                Добавить особенность
              </button>
              
              {errors.features && (
                <p className="mt-1 text-sm text-red-600">{errors.features.message}</p>
              )}
            </div>
          </div>

          {/* Описание */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание *
            </label>
            <textarea
              {...formMethods.register('descr')}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Подробное описание карточки..."
            />
            {errors.descr && (
              <p className="mt-1 text-sm text-red-600">{errors.descr.message}</p>
            )}
          </div>
        </div>

        {/* Кнопки формы */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {submitting ? 'Создание...' : 'Создать карточку'}
          </button>
          <button
            type="button"
            onClick={() => {
              reset()
              remove()
              append('')
            }}
            disabled={submitting}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 font-medium"
          >
            Очистить форму
          </button>
        </div>
      </form>
    </FormProvider>
    <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-8 text-gray-900">Удаление карточки</h2>
            <AdminGroupCard/>
          </div>
    </>)
}