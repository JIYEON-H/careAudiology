import Card from '@/components/cards/Card'
import {
  getManufactureNamesOnly,
  getManufacturerNamesAndCounts,
  getTotalPackages,
} from '@/lib/schema/overview'

export default async function Page() {
  const totalDeviceCounts = await getManufacturerNamesAndCounts()
  const manufacturerNames = await getManufactureNamesOnly()
  const totalPackages = await getTotalPackages()

  return (
    <div className='mx-auto '>
      <div className='grid grid-cols-2 gap-8 py-10 items-center justify-center'>
        <Card title='Total Devices (available)' data={totalDeviceCounts} />
        <Card title='Manufacturers' data={manufacturerNames} />
        <Card title='Total Packages' data={totalPackages} />
      </div>
    </div>
  )
}
