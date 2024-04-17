'use client'

import FormButton from '@/components/Button'
import FormInput from '@/components/Input'
import Image from 'next/image'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { loginAccount } from './actions'
import { PASSWORD_MIN_LENGTH } from '@/lib/constrants'

export default function Page() {
  const [state, action] = useFormState(loginAccount, null)
  return (
    <div className='flex flex-col items-center justify-between bg-gray-900 min-h-screen'>
      <div className='my-auto flex flex-col items-center'>
        <div className='mb-8 '>
          <Image
            src={'/logos/logo_big_661X200px.png'}
            layout='responsive'
            width={400}
            height={120}
            alt='logo_big'
          />
        </div>
        <div className='mb-11'>
          <span className='text-white text-4xl font-normal'>
            INVENTORY MANAGEMENT SYSTEM
          </span>
        </div>
        <form action={action} className='flex flex-col gap-3 w-96'>
          <FormInput
            name='username'
            label='Username * :'
            type='text'
            placeholder='Username'
            required
            errors={state?.fieldErrors.username}
          />
          <FormInput
            name='password'
            label='Password * :'
            type='password'
            placeholder='Password'
            required
            errors={state?.fieldErrors.password}
            minLength={PASSWORD_MIN_LENGTH}
          />
          <Link href='/auth/password-reset'>
            <div className='link text-gray-300'>Forgot Password?</div>
          </Link>

          {/* <div className=''> */}
          <FormButton text='Login' />
          {/* </div> */}
        </form>
      </div>
    </div>
  )
}
