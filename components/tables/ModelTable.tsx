type Props = {
  data: {
    color: string
    deviceType: string
    serialNumber: string
  }[]
}

export default function ModelTable({ data }: Props) {
  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full text-sm text-left rtl:text-right  dark:text-gray-400'>
        <thead className='text-xs uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='p-3'>Color</th>
            <th className='p-3'>Device Type</th>
            <th className='p-3'>Serial Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className='border-b border-gray-200 dark:border-gray-700'
            >
              <td className='p-3'>{item.color}</td>
              <td className='p-3'>{item.deviceType}</td>
              <td className='p-3 '>{item.serialNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
