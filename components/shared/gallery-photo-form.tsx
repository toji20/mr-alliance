'use client'

import { createGalleryImage, forceDeleteGalleryImage } from "@/app/api/actions"
import { adminFormSchemaPhoto, AdminFormValuesPhoto } from "@/lib/shema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { v4 as uuidv4 } from 'uuid'
import { supabase } from "@/lib/supabase"

interface GalleryPhoto {
  id: number
  name: string
  imageUrl: string
  descr: string | null
}

interface Props {
  galleryPhotos: GalleryPhoto[]
  className?: string
}

export const GalleryPhotoForm: React.FC<Props> = ({ galleryPhotos }) => {
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [avatar, setAvatar] = useState({
    file: null as File | null,
    url: ""
  })
  const router = useRouter()

  const formMethods = useForm<AdminFormValuesPhoto>({
    resolver: zodResolver(adminFormSchemaPhoto),
    defaultValues: {
      name: '',
      imageUrl: '',
      descr: '',
    },
  })

  const { 
    handleSubmit, 
    reset, 
    setValue,
    formState: { errors } 
  } = formMethods

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

  const onSubmit = async (data: AdminFormValuesPhoto) => {
    try {
      setSubmitting(true)
      
      // Проверяем, что изображение загружено
      if (!data.imageUrl) {
        toast.error("Пожалуйста, загрузите изображение")
        return
      }
      
      const result = await createGalleryImage(data)
      
      if (result?.success) {
        toast.success('Фотография успешно добавлена в галерею', {
          icon: '✅',
        })
        reset()
        setAvatar({ file: null, url: "" })
        router.refresh()
      } else {
        toast.error('Не удалось добавить фотографию', {
          icon: '❌',
        })
      }
    } catch (err) {
      console.error(err)
      toast.error('Произошла ошибка при добавлении фотографии', {
        icon: '❌',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту фотографию из галереи?')) return
    
    try {
      setDeletingId(id)
      const result = await forceDeleteGalleryImage(id)
      
      if (result?.success) {
        toast.success('Фотография успешно удалена', {
          icon: '✅',
        })
        router.refresh()
      } else {
        toast.error('Не удалось удалить фотографию', {
          icon: '❌',
        })
      }
    } catch (err) {
      console.error(err)
      toast.error('Произошла ошибка при удалении фотографии', {
        icon: '❌',
      })
    } finally {
      setDeletingId(null)
    }
  }

  const clearForm = () => {
    reset()
    setAvatar({ file: null, url: "" })
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold mb-6 text-gray-900">Добавить новую фотографию в галерею</h3>
        
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название фотографии *
                </label>
                <input
                  type="text"
                  {...formMethods.register('name')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Введите название фотографии"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание *
                </label>
                <textarea
                  {...formMethods.register('descr')}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Подробное описание фотографии..."
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
                {submitting ? 'Добавление...' : 'Добавить фотографию'}
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
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold mb-6 text-gray-900">Управление фотографиями галереи</h3>
        
        {galleryPhotos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>В галерее пока нет фотографий</p>
            <p className="text-sm mt-2">Добавьте первую фотографию используя форму выше</p>
          </div>
        ) : (
          <div className="space-y-4">
            {galleryPhotos.map((photo) => (
              <div key={photo.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={photo.imageUrl} 
                      alt={photo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{photo.name}</h4>
                    <p className="text-sm text-gray-500 truncate">{photo.descr}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-400">ID: {photo.id}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(photo.id)}
                  disabled={deletingId === photo.id}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-4"
                  title="Удалить фотографию"
                >
                  {deletingId === photo.id ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Всего фотографий: <strong>{galleryPhotos.length}</strong>
          </span>
        </div>
      </div>
    </div>
  )
}