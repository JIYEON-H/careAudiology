import { getManufacturerNamesAndCounts } from '@/lib/schema/overview'

type MnuFacturerData = {
  manufacturerName: string | undefined
  count?: number
}

type CardProps = {
  title: string
  data?: MnuFacturerData[]
}

export default async function Card({ title, data }: CardProps) {
  return (
    <div className='p2 w-96 rounded-lg border-4 border-black justify-self-center'>
      <div className='flex flex-col'>
        <div className='rounded-t-md px-6 pt-4 bg-amber-300 font-bold text-lg mb-2'>
          {title}
        </div>
        <div className='flex flex-col px-3 py-3'>
          {data?.map((item, index) => (
            <div key={index} className='flex justify-between items-center'>
              <div className='pl-3'>{item.manufacturerName}</div>
              <div className='pr-3'>{item.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
