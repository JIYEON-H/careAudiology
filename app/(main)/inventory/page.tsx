import InventoryTable from '@/components/tables/InventoryTable'
import { getInventoryByCompany } from '@/lib/schema/inventory'
import Link from 'next/link'

export default async function Page() {
  const inventory = await getInventoryByCompany()
  return (
    <div>
      <div className='flex justify-end my-2'>
        <Link href='/inventory/insert-device'>
          <button className='rounded-md bg-green-500 w-40 h-10'>+</button>
        </Link>
      </div>
      <div>
        <InventoryTable data={inventory} />
      </div>
    </div>
  )
}
