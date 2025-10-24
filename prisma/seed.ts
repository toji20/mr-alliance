import { hashSync } from 'bcrypt';
import { constructionArticleTexts, contactsPageTexts, designArticleTexts, designProjectTexts, galleryImages, headerText, houseInteriorDesignTexts, houses, repairArticleTexts } from './constant/constant'
import { prisma } from './prisma-client';


async function main() {
  await prisma.$executeRaw`TRUNCATE TABLE "TextContent" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "House" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "GalleryPhoto" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Review" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  
  console.log('🌱 Начинаем сидинг текстов для дизайн-проекта...')

  for (const textData of designProjectTexts) {
    try {
      const text = await prisma.textContent.upsert({
        where: { key: textData.key },
        update: {
          content: textData.content,
          category: textData.category
        },
        create: {
          key: textData.key,
          content: textData.content,
          category: textData.category
        }
      })
      console.log(`✅ ${text.key}`)
    } catch (error) {
      console.error(`❌ Ошибка с ${textData.key}:`, error)
    }
  }
  for (const textData of repairArticleTexts) {
    try {
      const text = await prisma.textContent.upsert({
        where: { key: textData.key },
        update: {
          content: textData.content,
          category: textData.category
        },
        create: {
          key: textData.key,
          content: textData.content,
          category: textData.category
        }
      })
      console.log(`✅ ${text.key}`)
    } catch (error) {
      console.error(`❌ Ошибка с ${textData.key}:`, error)
    }
  }

  for (const textData of constructionArticleTexts) {
    try {
      const text = await prisma.textContent.upsert({
        where: { key: textData.key },
        update: {
          content: textData.content,
          category: textData.category
        },
        create: {
          key: textData.key,
          content: textData.content,
          category: textData.category
        }
      })
      console.log(`✅ ${text.key}`)
    } catch (error) {
      console.error(`❌ Ошибка с ${textData.key}:`, error)
    }
  }
  for (const textData of houseInteriorDesignTexts) {
    try {
      const text = await prisma.textContent.upsert({
        where: { key: textData.key },
        update: {
          content: textData.content,
          category: textData.category
        },
        create: {
          key: textData.key,
          content: textData.content,
          category: textData.category
        }
      })
      console.log(`✅ ${text.key}`)
    } catch (error) {
      console.error(`❌ Ошибка с ${textData.key}:`, error)
    }
  }
  for (const textData of designArticleTexts) {
    try {
      const text = await prisma.textContent.upsert({
        where: { key: textData.key },
        update: {
          content: textData.content,
          category: textData.category
        },
        create: {
          key: textData.key,
          content: textData.content,
          category: textData.category
        }
      })
      console.log(`✅ ${text.key}`)
    } catch (error) {
      console.error(`❌ Ошибка с ${textData.key}:`, error)
    }
  }
  for (const textData of contactsPageTexts) {
    try {
      const text = await prisma.textContent.upsert({
        where: { key: textData.key },
        update: {
          content: textData.content,
          category: textData.category
        },
        create: {
          key: textData.key,
          content: textData.content,
          category: textData.category
        }
      })
      console.log(`✅ ${text.key}`)
    } catch (error) {
      console.error(`❌ Ошибка с ${textData.key}:`, error)
    }
  }

  for (const house of houses) {
    await prisma.house.create({
      data: {
        name: house.name,
        imageUrl: house.image,
        size: house.size,
        price: house.price,
        descr: house.descr,
      }
    });
  }

  for (const photo of galleryImages) {
    await prisma.galleryPhoto.create({
      data: {
        name: photo.name,
        imageUrl: photo.imageUrl,
        descr: photo.descr,
      }
    });
  }

  await prisma.user.createMany({
    data: [
    {
        fullName: "admin mrallince",
        email: String(process.env.ADMIN_EMAIL),
        password: hashSync(String(process.env.ADMIN_PASSWORD), 10),
        verified: new Date(),
        role: "ADMIN"
    }]
});

  console.log('🎯 Сидинг завершен!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })