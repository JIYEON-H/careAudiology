import db from '@/lib/db'

type Manufacturer = {
  name: string
}
export async function getManufacturerList() {
  try {
    const data = await db.manuFacturer.findMany({
      select: { name: true },
    })
    if (!data || data.length === 0) {
      console.log('No data found')
      return []
    }
    return data
  } catch (error) {
    console.error('Error retrieving manufacturer list:', error)
    throw error
  } finally {
    db.$disconnect()
  }
}

export async function getColorList() {
  try {
    const data = await db.color.findMany({
      select: { name: true },
    })
    if (!data || data.length === 0) {
      console.log('No data found')
      return []
    }
    return data
  } catch (error) {
    console.error('Error retrieving color list:', error)
    throw error
  } finally {
    db.$disconnect()
  }
}

export async function getTypeList() {
  try {
    const data = await db.type.findMany({
      select: { name: true },
    })
    if (!data || data.length === 0) {
      console.log('No data found')
      return []
    }
    return data
  } catch (error) {
    console.error('Error retrieving type list:', error)
    throw error
  } finally {
    db.$disconnect()
  }
}
