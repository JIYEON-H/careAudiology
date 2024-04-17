'use server'

import db from '@/lib/db'
import { z } from 'zod'

const deviceSchema = z.object({
  manufacturer: z.string().min(1, { message: 'Manufacturer is required' }),
  color: z.string().min(1, { message: 'Color is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
  model: z.string({ required_error: 'Model is required' }),
  serialNumber: z.string({ required_error: 'Serial number is required' }),
})

export async function uploadDevice(_: any, formData: FormData) {
  const data = {
    manufacturerName: formData.get('manufacturer'),
    colorName: formData.get('color'),
    typeName: formData.get('type'),
    model: formData.get('model'),
    serialNumber: formData.get('serial-number'),
    stockInDate: new Date(),
  }
  const result = deviceSchema.safeParse(data)
  if (!result.success) {
    return result.error.flatten()
  } else {
    try {
      if (
        typeof data.manufacturerName === 'string' &&
        typeof data.colorName === 'string' &&
        typeof data.typeName === 'string' &&
        typeof data.model === 'string' &&
        typeof data.serialNumber === 'string'
      ) {
        const manufacturer = await db.manuFacturer.findFirst({
          where: {
            name: data.manufacturerName,
          },
          select: {
            id: true,
          },
        })
        const color = await db.color.findFirst({
          where: {
            name: data.colorName,
          },
          select: {
            id: true,
          },
        })
        const type = await db.type.findFirst({
          where: {
            name: data.typeName,
          },
          select: {
            id: true,
          },
        })

        if (!manufacturer || !color || !type) {
          console.log('Manufacturer, color, or type not found')
          return
        } else {
          const device = await db.device.create({
            data: {
              manufacturerId: manufacturer.id,
              colorId: color.id,
              typeId: type.id,
              model: data.model,
              serialNumber: data.serialNumber,
              stockInDate: data.stockInDate,
            },
          })
        }
      }
    } catch (error) {
      console.error('Error uploading device:', error)
      throw error
    } finally {
      db.$disconnect()
    }
  }
}
