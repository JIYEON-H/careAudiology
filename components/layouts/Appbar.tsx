import Image from 'next/image'
import Link from 'next/link'
import db from '@/lib/db'
import getSession from '@/lib/session'
import { notFound, redirect } from 'next/navigation'

async function getUser() {
  try {
    const session = await getSession()
    if (session.id) {
      const user = await db.user.findUnique({
        where: {
          id: session.id,
        },
      })
      return user
    } else {
      notFound()
      return null
    }
  } catch (error) {
    console.error(error)
  } finally {
    db.$disconnect()
  }
}

export default async function LayoutAppbar() {
  const user = await getUser()
  const logOut = async () => {
    'use server'
    try {
      const session = await getSession()
      await session.destroy()
      redirect('/auth/login')
    } catch (error) {
      console.error(error)
    } finally {
      db.$disconnect()
      redirect('/auth/login')
    }
  }

  return (
    <header className='flex items-center justify-between bg-gray-900 p-5'>
      <div className='flex flex-row gap-5 justify-between items-center w-full mx-5'>
        <div className='w-[15%] relative'>
          <Link href={'/'}>
            <Image
              src='/logos/logo_small_294X89px.png'
              layout='responsive'
              width={294}
              height={89}
              alt='logo'
            />
          </Link>
        </div>
        <div className='flex flex-col items-center justify-center w-[45%] gap-2'>
          <h2 className='text-white text-2xl text-center w-full tracking-wider'>
            INVENTORY MANAGEMENT SYSTEM
          </h2>
          <input
            type='search'
            className='focus:ring-0 focus:ring-blue-600 focus:outline-none rounded-xl border-black w-[90%]'
          />
        </div>
        <form action={logOut} className='self-end'>
          <button className='text-white text-xl'>Log out</button>
        </form>
      </div>
    </header>
  )
}
