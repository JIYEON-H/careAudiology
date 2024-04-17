import { getManufacturerNamesAndCounts } from '@/lib/schema/overview'

type manuFacturerData = {
  manufacturerName: string | undefined
  deviceCount: number
}

export default async function OverViewCard() {
  const deviceCounts = await getManufacturerNamesAndCounts()
  console.log('deviceCounts from useState', deviceCounts)

  return (
    <div className='p2 w-96 rounded-lg border-4 border-black'>
      <div className='flex flex-col'>
        <div className='rounded-t-md px-6 pt-4 bg-amber-300 font-bold text-lg mb-2'>
          Total Devices (available)
        </div>
        <div className='flex flex-col px-3 py-3'>
          {deviceCounts?.map((item, index) => (
            <div key={index} className='flex justify-between items-center'>
              <div className='pl-3'>{item.manufacturerName}</div>
              <div className='pr-3'>{item.deviceCount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
