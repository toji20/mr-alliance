import { z } from 'zod';

export const adminFormSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  imageUrl: z.string().min(1, 'URL обязателен'),
  price: z.number().min(0.01, 'Цена должна быть больше 0'),
  descr: z.string().min(1, 'Описание обязательно'),
  size: z.number().min(1, 'Размер должен быть больше 0'),
  features: z.array(z.string().min(1, 'Добавьте хотя бы одну особенность')),
});

export type AdminFormValues = z.infer<typeof adminFormSchema>;

export const adminFormSchemaPhoto = z.object({
  name: z.string().min(1, 'Название обязательно'),
  imageUrl: z.string().min(1, 'URL обязателен'),
  descr: z.string().min(1, 'Описание обязательно'),
  categoryId: z.number().min(1, 'Категория обязательна')
});

export type AdminFormValuesPhoto = z.infer<typeof adminFormSchemaPhoto>;

export const ReviewSchema = z.object({
  text: z.string().min(10, 'Минимум 10 символов'),
  rating: z.number().min(1,).max(5,),
  date: z.date()
});

export type ReviewSchema = z.infer<typeof ReviewSchema>;

export const passswordSchema = z.string().min(6, { message: 'Пароль должен содержать не менее 6 символов' })

export const FormLoginSchema = z.object({
    email: z.string().email({ message: 'Введите корректную почту' }),
    password: passswordSchema,
})

export const FormRegisterSchema = FormLoginSchema.merge(
    z.object({
        fullName: z.string().min(2, { message: 'Имя и фамилия должно содержать не менее 2-х символов' }),
        confirmPassword: passswordSchema,
    })
).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
})

export type TFormLoginValues = z.infer<typeof FormLoginSchema>;
export type TFormRegisterValues = z.infer<typeof FormRegisterSchema>;

export const CategorySchema = z.object({
  name: z.string().min(1,'Напишите название категории')
})

export type TCategorySchema = z.infer<typeof CategorySchema>