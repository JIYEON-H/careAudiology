//can be deleted

import {
  getColorList,
  getManufacturerList,
  getTypeList,
} from '@/lib/schema/basic'

type NameList = {
  name: string
}

export async function DeviceInsertSelectManuFacture() {
  const manufacturerList: NameList[] = await getManufacturerList()

  return (
    <div className='sm:col-span-3'>
      <label
        htmlFor='manufacturer'
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        Manufacturer
      </label>
      <div className='mt-2'>
        <select
          name='manufacturer'
          className='block w-full h-9 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-gray-200 placeholder:text-neutral-400 focus:ring-4 focus:ring-amber-500 sm:text-sm sm:leading-6'
        >
          {manufacturerList.map((manufacturer, index) => (
            <option key={index} value={manufacturer.name}>
              {manufacturer.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export async function DeviceInsertSelectColor() {
  const colorList: NameList[] = await getColorList()
  return (
    <div className='sm:col-span-3'>
      <label
        htmlFor='color'
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        Color
      </label>
      <div className='mt-2'>
        <select
          name='color'
          className='block w-full h-9 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-gray-200 placeholder:text-neutral-400 focus:ring-4 focus:ring-amber-500 sm:text-sm sm:leading-6'
        >
          {colorList.map((color, index) => (
            <option key={index} value={color.name}>
              {color.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export async function DeviceInsertSelectType() {
  const typeList: NameList[] = await getTypeList()

  return (
    <div className='sm:col-span-3'>
      <label
        htmlFor='type'
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        Type
      </label>
      <div className='mt-2'>
        <select
          name='type'
          className='block w-full h-9 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-gray-200 placeholder:text-neutral-400 focus:ring-4 focus:ring-amber-500 sm:text-sm sm:leading-6'
        >
          {typeList.map((type, index) => (
            <option key={index} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
