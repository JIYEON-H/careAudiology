import db from '@/lib/db'

type InventoryData = {
  manufacturerName: string
  model: string
  count?: number
}
export async function getInventoryByCompany() {
  try {
    const data: InventoryData[] = await db.$queryRaw<InventoryData[]>`
    SELECT m.name AS "manufacturerName", d.model, COUNT(d.id) AS count
    FROM device AS d
    JOIN manufacturer AS m ON m.id = d."manufacturerId"
    GROUP BY m.name, d.model
    ORDER BY m.name, d.model`

    if (!data || data.length === 0) {
      console.log('No data found')
      return []
    }
    const convertData = data.map((data) => ({
      manufacturerName: data.manufacturerName,
      model: data.model,
      amount: Number(data.count),
    }))
    return convertData
  } catch (error) {
    console.error('Error retrieving inventory by company:', error)
    throw error
  } finally {
    db.$disconnect()
  }
}

type InventoryModelData = {
  color: string
  deviceType: string
  serialNumber: string
}

export async function getInventoryByModel(model: string) {
  if (model === 'Rear 2') {
    model = 'Rear 2'
  }
  try {
    const data: InventoryModelData[] = await db.$queryRaw<InventoryModelData[]>`
    SELECT c.name as "color", t.name as "deviceType", d."serialNumber"
    FROM device AS d
    JOIN color AS c ON c.id = d."colorId"
    JOIN type AS t ON t.id = d."typeId"
    WHERE d.model = ${model}`

    if (!data || data.length === 0) {
      console.log('No data found')
      return []
    }
    console.log('Model Data:', data)
    return data
  } catch (error) {
    console.error('Error retrieving inventory by model:', error)
    throw error
  } finally {
    db.$disconnect()
  }
}
