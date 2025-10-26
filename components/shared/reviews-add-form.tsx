'use client'

import { reviewAdd } from "@/app/api/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Star, Send, Loader } from "lucide-react"
import { ReviewSchema } from "@/lib/shema"

export const ReviewForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ReviewSchema>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      text: '',
      rating: 0,
      date: new Date()
    }
  })

  const currentRating = watch('rating')

  const handleRatingClick = (rating: number) => {
    setValue('rating', rating, { shouldValidate: true })
  }

  const onSubmit = async (data: ReviewSchema) => {
    try {
      setSubmitting(true)
      
      const result = await reviewAdd(data)
      
      if (result?.success) {
        toast.success('Отзыв успешно добавлен', {
          icon: '✅',
          duration: 4000
        })
        reset()
        router.refresh()
      } else {
        toast.error('Не удалось добавить отзыв', {
          icon: '❌',
          duration: 4000
        })
      }
    } catch (err) {
      console.error(err)
      toast.error('Произошла ошибка при добавлении отзыва', {
        icon: '❌',
        duration: 4000
      })
    } finally {
      setSubmitting(false)
    }
  }

  const clearForm = () => {
    reset()
    setHoverRating(0)
  }

  return (
    <div className="bg-white md:rounded-2xl rounded-[0] shadow-sm border border-stone-200 md:p-6 p-4 mb-6">
      <div className="md:mb-6 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-stone-800 mb-2">Оставить отзыв</h2>
        <p className="text-stone-600 text-sm md:text-base">
          Поделитесь вашим опытом сотрудничества с нами
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="md:space-y-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-3">
            Ваша оценка *
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-full"
              >
                <Star
                  size={28}
                  className={`
                    transition-colors duration-200
                    ${star <= (hoverRating || currentRating)
                      ? "text-amber-500 fill-current"
                      : "text-stone-300"
                    }
                    ${errors.rating ? "border-red-500" : ""}
                  `}
                />
              </button>
            ))}
            <span className="ml-3 text-base md:text-lg font-semibold text-stone-700">
              {currentRating > 0 ?` ${currentRating}.0` : '0'} / 5.0
            </span>
          </div>
          {errors.rating && (
            <p className="mt-2 text-sm text-red-600">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Текст отзыва *
          </label>
          <div className="relative">
            <textarea
              {...register('text')}
              rows={4}
              className={`
                w-full p-3 md:p-4 border rounded-lg md:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors
                resize-none
                ${errors.text ? "border-red-500" : "border-stone-300"}
              `}
              placeholder="Расскажите о вашем опыте сотрудничества с нами... (минимум 10 символов)"
            />
            <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 text-xs md:text-sm text-stone-500">
              {watch('text')?.length || 0} / 500
            </div>
          </div>
          {errors.text && (
            <p className="mt-2 text-sm text-red-600">{errors.text.message}</p>
          )}
        </div>

        <div className="bg-amber-50 rounded-lg p-3 md:p-4 border border-amber-200 md:block hidden">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 md:mt-2 flex-shrink-0"></div>
            <div className="text-xs md:text-sm text-amber-800">
              <p className="font-medium">Ваши данные защищены</p>
              <p>Мы не публикуем личную информацию. Все отзывы проходят модерацию перед публикацией.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
          <button
            type="submit"
            disabled={submitting || currentRating === 0}
            className="flex items-center justify-center space-x-2 bg-amber-500 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1"
          >
            {submitting ? (
              <>
                <Loader size={18} className="animate-spin" />
                <span className="text-sm md:text-base">Отправка...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span className="text-sm md:text-base">Опубликовать отзыв</span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={clearForm}
            disabled={submitting}
            className="px-4 md:px-6 py-2.5 md:py-3 border-2 border-stone-300 text-stone-700 rounded-lg font-semibold hover:bg-stone-50 transition-colors disabled:opacity-50 text-sm md:text-base"
          >
            Очистить
          </button>
        </div>
      </form>
    </div>
  )
}