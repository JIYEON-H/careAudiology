'use server'

import db from '@/lib/db'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const deviceSchema = z.object({
  manufacturerName: z.string({ required_error: 'Manufacturer is required' }),
  colorName: z.string({ required_error: 'Color is required' }),
  typeName: z.string({ required_error: 'Type is required' }),
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
          console.log('Device uploaded:', device)
          redirect('/inventory')
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
