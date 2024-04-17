import {
  getColorList,
  getManufacturerList,
  getTypeList,
} from '@/lib/schema/basic'
import { uploadDevice } from './actions'
import { useFormState } from 'react-dom'
import FormButton from '../Button'
import {
  DeviceInsertSelectColor,
  DeviceInsertSelectManuFacture,
  DeviceInsertSelectType,
} from './DeviceInsertInput'

type NameList = {
  name: string
}

export default async function DeviceInsertForm() {
  const manufacturerList: NameList[] = await getManufacturerList()
  const colorList: NameList[] = await getColorList()
  const typeList: NameList[] = await getTypeList()

  //   const handleSubmit = async (event: any) => {
  //     event.preventDefault()
  //     const formData = new FormData(event.currentTarget)
  //     try {
  //       const result = await uploadDevice(undefined, formData)
  //       console.log(result)
  //     } catch (error) {
  //       console.error('Error uploading device:', error)
  //     }
  //   }

  return (
    <div className='flex mx-auto'>
      <form className='flex mx-auto'>
        <div className='pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900 text-center'>
            Device Information
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600 text-center'>
            Need to fill the all information to insert a new device.
          </p>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
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
            {/* <DeviceInsertSelectManuFacture /> */}

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
            {/* <DeviceInsertSelectColor /> */}

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
            {/* <DeviceInsertSelectType /> */}

            <div className='sm:col-span-3'>
              <label
                htmlFor='model'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Model
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name='model'
                  id='model'
                  className='block w-full rounded-md border-0 py-1.5 focus:outline-none ring-2 focus:ring-4 transition ring-gray-200 focus:ring-amber-500 border-none placeholder:text-neutral-400 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='serial-number'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Serial Number
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name='serial-number'
                  id='serial-number'
                  className='block w-full rounded-md border-0 py-1.5 focus:outline-none ring-2 focus:ring-4 transition ring-gray-200 focus:ring-amber-500 border-none placeholder:text-neutral-400 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
          <div className='pt-7'>
            {/* <FormButton text='Submit' /> */}
            <button className='bg-amber-400 w-28 rounded-md py-2 hover:bg-amber-300 font-medium'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
