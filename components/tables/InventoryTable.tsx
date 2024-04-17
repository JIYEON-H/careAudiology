import Link from 'next/link'

type Props = {
  data: {
    manufacturerName: string
    model: string
    amount: number
  }[]
}

export default function InventoryTable({ data }: Props) {
  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full text-sm text-left rtl:text-right  dark:text-gray-400'>
        <thead className='text-xs uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='p-3'>Company</th>
            <th className='p-3'>Model</th>
            <th className='p-3'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className='border-b border-gray-200 dark:border-gray-700'
            >
              <td className='p-3'>{item.manufacturerName}</td>
              <Link href='/inventory/[model]' as={`/inventory/${item.model}`}>
                <td className='p-3'>{item.model}</td>
              </Link>
              <td className='p-3 '>
                <span
                  className={`rounded-full py-2 px-3 ${
                    item.amount < 5 ? 'bg-red-300' : 'bg-green-300'
                  } `}
                >
                  {item.amount}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
