import { getInventoryByModel } from '@/lib/schema/inventory'
import ModelTable from '@/components/tables/ModelTable'
import Link from 'next/link'

export default async function Page({ params }: { params: { name: string } }) {
  const modelName = params.name
  const decodedModelName = decodeURIComponent(modelName)
  console.log('Model Name:', decodedModelName)

  let modelData = await getInventoryByModel(modelName)

  return (
    <div>
      <div className='flex justify-end my-2'>
        <Link href='/inventory/insert-device'>
          <button className='rounded-md bg-green-500 w-40 h-10'>+</button>
        </Link>
      </div>
      <div>
        <ModelTable data={modelData} />
      </div>
    </div>
  )
}
