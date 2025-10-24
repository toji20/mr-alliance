'use server'

import { AdminFormValues, AdminFormValuesPhoto, ReviewSchema } from "@/lib/shema";
import { prisma } from "@/prisma/prisma-client";
import { success } from "zod";

export async function createProduct(formData: AdminFormValues) {
    try {
        const house = await prisma.house.create({
            data: {
            name: formData.name,
            price: formData.price,
            size: formData.size,
            imageUrl: formData.imageUrl,
            features: formData.features as any,
            descr: formData.descr
            }
        })
        return { 
            success: true, 
            data: { house } 
          };
    } catch (err) {
        console.log(err)
    }
}   

export async function forceDeleteProduct(id: number) {
    try {
        await prisma.house.delete({
            where: {id: id}
        })
    } catch (err) {
        console.log(err)
    }

    return { success: true };
}

export async function toogleFavorite(id:number) {
   try {
    const house = await prisma.house.findUnique({
        where: {
            id: id
        }
    });

    const favoriteHouse = await prisma.house.update({
        where: {
            id: id
        },
        data: {
            favorite: !house?.favorite
        }
    })
    return favoriteHouse
   } catch (err) {
    console.log(err)
   }
}

export async function createGalleryImage(formData: AdminFormValuesPhoto) {
    try {
        const galleryImage = await prisma.galleryPhoto.create({
            data: {
            name: formData.name,
            imageUrl: formData.imageUrl,
            descr: formData.descr
            }
        })
        return { 
            success: true, 
            data: { galleryImage } 
          };
    } catch (err) {
        console.log(err)
    }
}   

export async function forceDeleteGalleryImage(id: number) {
    try {
        await prisma.galleryPhoto.delete({
            where: {id: id}
        })
    } catch (err) {
        console.log(err)
    }

    return { success: true };
}

export async function reviewAdd(data: ReviewSchema) {
    try {
        const review = await prisma.review.create({
            data: {
                text: data.text,
                rating: data.rating,
                date: data.date
            }
        })
        return {
            success: true,
            data: {review}
        }
    } catch (err) {
        console.log(err)
    }
}