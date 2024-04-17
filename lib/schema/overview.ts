import db from '@/lib/db'

// Get the count of devices by manufacturer on devices table
export async function getDevicesByCompany() {
  try {
    const devices = await db.device.groupBy({
      by: ['manufacturerId'],
      _count: {
        manufacturerId: true,
      },
    })
    if (!devices) {
      console.log('No devices found')
      return []
    }
    return devices
  } catch (error) {
    console.error(error)
  } finally {
    db.$disconnect()
  }
}

// Get the manufacturer names and device counts
export async function getManufacturerNamesAndCounts() {
  try {
    const deviceCounts = await getDevicesByCompany()
    const manufacturerIds = deviceCounts?.map((dc) => dc.manufacturerId)
    const manufacturerNames = await db.manuFacturer.findMany({
      where: {
        id: { in: manufacturerIds },
      },
    })
    const manufacturerNameMap = new Map(
      manufacturerNames.map((m) => [m.id, m.name]),
    )

    return deviceCounts?.map((dc) => ({
      manufacturerName: manufacturerNameMap.get(dc.manufacturerId),
      count: dc._count.manufacturerId,
    }))
  } catch (error) {
    console.error(error)
  } finally {
    db.$disconnect()
  }
}

// Get the manufacturer names only
export async function getManufactureNamesOnly() {
  try {
    const manufacturerNames = await db.manuFacturer.findMany({
      select: {
        name: true,
      },
      distinct: ['name'],
    })
    if (manufacturerNames) {
      const names = manufacturerNames.map((m) => ({ manufacturerName: m.name }))
      return names
    } else {
      console.log('No manufacturers found')
    }
  } catch (error) {
    console.error(error)
  } finally {
    db.$disconnect()
  }
}

type ManufacturerPackageCount = {
  manufacturerName: string
  count?: number
}
export async function getTotalPackages() {
  try {
    const data: ManufacturerPackageCount[] = await db.$queryRaw<
      ManufacturerPackageCount[]
    >`
    select m.name as "manufacturerName", count(distinct p.id) as "count"
    from manufacturer m
    join device d on d."manufacturerId" = m.id
    join package p on p.id = d."packageId"
    group by m.name`

    if (!data || data.length === 0) {
      console.log('No data found')
      return []
    }
    const convertData = data.map((data) => ({
      manufacturerName: data.manufacturerName,
      count: Number(data.count),
    }))
    return convertData
  } catch (error) {
    console.error('Error fetching total packages:', error)
    return []
  } finally {
    db.$disconnect()
  }
}
