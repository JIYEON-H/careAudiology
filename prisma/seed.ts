import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newUser = await prisma.user.createMany({
    data: {
      username: 'admin',
      password: 'admin',
    },
    skipDuplicates: true,
  })

  const manufac = ['Oticon', 'Unitron', 'Signia']
  const manufacData = manufac.map((manu) => ({
    name: manu,
  }))
  await prisma.manuFacturer.createMany({
    data: manufacData,
    skipDuplicates: true,
  })

  const colors = ['Beige', 'Silver', 'Black', 'White', 'Clear']
  const colorData = colors.map((color) => ({
    name: color,
  }))
  await prisma.color.createMany({
    data: colorData,
    skipDuplicates: true,
  })

  const types = [
    'Left Hearing Aid',
    'Right Hearing Aid',
    'Remote',
    'Charger',
    'Ear Mold',
  ]
  const typeData = types.map((type) => ({
    name: type,
  }))
  await prisma.type.createMany({
    data: typeData,
    skipDuplicates: true,
  })

  const devices = [
    {
      serialNumber: 'D123456',
      manufacturerName: 'Oticon',
      modelName: 'Real 2',
      typeName: 'Left Hearing Aid',
      colorName: 'Beige',
    },
    {
      serialNumber: 'D789012',
      manufacturerName: 'Unitron',
      modelName: '5Ix',
      typeName: 'Right Hearing Aid',
      colorName: 'Silver',
    },
    {
      serialNumber: 'D345678',
      manufacturerName: 'Signia',
      modelName: 'V-R-7',
      typeName: 'Remote',
      colorName: 'Black',
    },
    {
      serialNumber: 'D901234',
      manufacturerName: 'Oticon',
      modelName: 'V-RS-7',
      typeName: 'Charger',
      colorName: 'White',
    },
    {
      serialNumber: 'D567890',
      manufacturerName: 'Signia',
      modelName: 'Real 2',
      typeName: 'Ear Mold',
      colorName: 'Clear',
    },
    {
      serialNumber: 'D234567',
      manufacturerName: 'Unitron',
      modelName: '5Ix',
      typeName: 'Left Hearing Aid',
      colorName: 'Beige',
    },
    {
      serialNumber: 'D789013',
      manufacturerName: 'Signia',
      modelName: 'V-RS-7',
      typeName: 'Right Hearing Aid',
      colorName: 'Silver',
    },
    {
      serialNumber: 'D987654',
      manufacturerName: 'Oticon',
      modelName: 'Real 2',
      typeName: 'Remote',
      colorName: 'Black',
    },
    {
      serialNumber: 'D654321',
      manufacturerName: 'Unitron',
      modelName: '5Ix',
      typeName: 'Charger',
      colorName: 'White',
    },
    {
      serialNumber: 'D876543',
      manufacturerName: 'Signia',
      modelName: 'V-RS-7',
      typeName: 'Ear Mold',
      colorName: 'Clear',
    },
    {
      serialNumber: 'D543210',
      manufacturerName: 'Oticon',
      modelName: 'V-R-7',
      typeName: 'Left Hearing Aid',
      colorName: 'Beige',
    },
    {
      serialNumber: 'D321098',
      manufacturerName: 'Unitron',
      modelName: '5Ix',
      typeName: 'Right Hearing Aid',
      colorName: 'Silver',
    },
  ]

  for (const device of devices) {
    const manuFacturer = await prisma.manuFacturer.findFirst({
      where: { name: device.manufacturerName },
    })
    const color = await prisma.color.findFirst({
      where: { name: device.colorName },
    })
    const type = await prisma.type.findFirst({
      where: { name: device.typeName },
    })

    if (!manuFacturer || !color || !type) {
      console.log(`Missing data for device ${device.serialNumber}, skipping...`)
      continue
    }
    await prisma.device.createMany({
      data: {
        serialNumber: device.serialNumber,
        manufacturerId: manuFacturer?.id,
        colorId: color.id,
        typeId: type.id,
        stockInDate: new Date(),
        sellDate: null,
      },
      skipDuplicates: true,
    })
  }

  const packages = [
    {
      company: 'Oticon',
      client: 'C987',
      leftSN: 'D987654',
      rightSN: 'D654321',
      remote: 'D345678',
      charger: 'D901234',
    },
    {
      company: 'Unitron',
      client: 'C654',
      leftSN: 'D876543',
      rightSN: 'D321098',
      remote: 'D789012',
      charger: 'D234567',
    },
    {
      company: 'Signia',
      client: 'C321',
      leftSN: 'D543210',
      rightSN: 'D987654',
      remote: 'D567890',
      charger: 'D901234',
    },
    {
      company: 'Oticon',
      client: 'C456',
      leftSN: 'D654321',
      rightSN: 'D567890',
      remote: 'D901234',
      charger: 'D789012',
    },
    {
      company: 'Signia',
      client: 'C789',
      leftSN: 'D234567',
      rightSN: 'D345678',
      remote: 'D789012',
      charger: 'D567890',
    },
    {
      company: 'Unitron',
      client: 'C123',
      leftSN: 'D321098',
      rightSN: 'D876543',
      remote: 'D234567',
      charger: 'D543210',
    },
  ]
  for (const pack of packages) {
    const leftDevice = await prisma.device.findUnique({
      where: { serialNumber: pack.leftSN },
    })
    const rightDevice = await prisma.device.findUnique({
      where: { serialNumber: pack.rightSN },
    })
    const remoteDevice = await prisma.device.findUnique({
      where: { serialNumber: pack.remote },
    })
    const chargerDevice = await prisma.device.findUnique({
      where: { serialNumber: pack.charger },
    })

    if (!leftDevice || !rightDevice || !remoteDevice || !chargerDevice) {
      console.log(
        `Missing device data for package of client ${pack.client}, skipping.`,
      )
      continue
    }

    await prisma.package.create({
      data: {
        clientId: parseInt(pack.client.substring(1)), // Assuming client ID is like 'C123', removing 'C' and parsing number
        devices: {
          connect: [
            { id: leftDevice.id },
            { id: rightDevice.id },
            { id: remoteDevice.id },
            { id: chargerDevice.id },
          ],
        },
        fittingDate: new Date(), // Example date, adjust as necessary
        warrantyExpiration: new Date(
          new Date().setFullYear(new Date().getFullYear() + 2),
        ), // Example expiration two years from now
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('Seeding complete.')
    await prisma.$disconnect()
  })
