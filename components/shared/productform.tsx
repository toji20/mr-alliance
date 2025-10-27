'use client'

import { createProduct } from "@/app/api/actions"
import { adminFormSchema, AdminFormValues } from "@/lib/shema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { AdminGroupCard } from "./admin-catalog-group-card"
import { v4 as uuidv4 } from 'uuid'
import { supabase } from "@/lib/supabase"

interface Props {
    className?: string;
}

export const ProductForm: React.FC<Props> = ({
}) => {
    const [submitting, setSubmitting] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [avatar, setAvatar] = useState({
        file: null as File | null,
        url: ""
    })
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
        setValue,
        watch,
        formState: { errors } 
    } = formMethods

    const { fields, append, remove } = useFieldArray({
        control: control as any,
        name: "features",
        keyName: "id",
    })

    const uploadImage = async (file: File): Promise<string | null> => {
        if (!file) return null;
        
        const fileName = `${Date.now()}_${uuidv4()}_${file.name}`;
        
        try {
            setImageUploading(true)
            
            const { data, error: uploadError } = await supabase
                .storage
                .from('mr-alliance')
                .upload(fileName, file)
            
            if (uploadError) throw uploadError
            
            const { data: { publicUrl } } = supabase
                .storage
                .from('mr-alliance')
                .getPublicUrl(data.path)
            
            toast.success("Изображение успешно загружено")
            return publicUrl
            
        } catch (error) {
            console.error("Upload error:", error)
            toast.error("Ошибка при загрузке изображения")
            return null
        } finally {
            setImageUploading(false)
        }
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error("Пожалуйста, выберите файл изображения")
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Размер файла не должен превышать 5MB")
            return
        }

        setAvatar({
            file: file,
            url: URL.createObjectURL(file)
        })

        const imageUrl = await uploadImage(file)
        if (imageUrl) {
            setValue('imageUrl', imageUrl)
        }
    }

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
          
          // Проверяем, что изображение загружено
          if (!data.imageUrl) {
            toast.error("Пожалуйста, загрузите изображение")
            return
          }

const filteredFeatures = data.features.filter(feature => feature.trim() !== '')
          
          const productData = {
            ...data,
            features: filteredFeatures,
          }

          const result = await createProduct(productData)
          
          if (result?.success) {
            toast.success('Карточка успешно создана', {
              icon: '✅',
            })
            // Сбрасываем форму и состояние изображения
            reset()
            setAvatar({ file: null, url: "" })
            remove()
            append('')
            router.refresh()
          } else {
            toast.error('Не удалось создать карточку', {
              icon: '❌',
            })
          }
        } catch (err) {
          console.error(err)
          toast.error('Произошла ошибка при создании карточки', {
            icon: '❌',
          })
        } finally {
          setSubmitting(false)
        }
    }

    const clearForm = () => {
        reset()
        setAvatar({ file: null, url: "" })
        remove()
        append('')
    }

    return (
        <>
            <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-[30px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                        {/* Поле для загрузки изображения */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Изображение *
                            </label>
                            
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Превью изображения */}
                                <div className="flex-shrink-0">
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors">

{avatar.url ? (
                                                <img 
                                                    src={avatar.url} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div className="text-center p-4">
                                                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                                                    <span className="text-sm text-gray-500">Загрузить</span>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        id="image-upload"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        disabled={imageUploading || submitting}
                                        className="hidden"
                                    />
                                </div>

                                <div className="flex-1">
                                    <input
                                        type="url"
                                        {...formMethods.register('imageUrl')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="URL изображения или загрузите файл"
                                        readOnly
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        {imageUploading ? "Загрузка изображения..." : "Загрузите изображение или введите URL"}
                                    </p>
                                    {errors.imageUrl && (
                                        <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

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

                    <div className="flex gap-4 pt-4 border-t border-gray-200">
                        <button

type="submit"
                            disabled={submitting || imageUploading}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            {submitting ? 'Создание...' : 'Создать карточку'}
                        </button>
                        <button
                            type="button"
                            onClick={clearForm}
                            disabled={submitting || imageUploading}
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
        </>
    )
}