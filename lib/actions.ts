import { prisma } from './db'
import { revalidatePath } from 'next/cache'

export async function createRentCard(userId: string, data: any) {
  try {
    const rentCard = await prisma.rentCard.create({
      data: {
        userId,
        personalInfo: data.personalInfo,
        rentalHistory: data.rentalHistory,
        employment: data.employment,
        rentalPreferences: data.rentalPreferences,
        status: 'DRAFT'
      },
    })

    revalidatePath('/dashboard')
    return { success: true, data: rentCard }
  } catch (error) {
    console.error('Failed to create rent card:', error)
    return { success: false, error: 'Failed to create rent card' }
  }
}

export async function getRentCard(id: string) {
  try {
    const rentCard = await prisma.rentCard.findUnique({
      where: { id },
      include: {
        sharedWith: true
      }
    })
    return { success: true, data: rentCard }
  } catch (error) {
    console.error('Failed to get rent card:', error)
    return { success: false, error: 'Failed to get rent card' }
  }
}
