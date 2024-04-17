'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavButtonProps {
  text: string
  link: string
}

export default function NavButton({ text, link }: NavButtonProps) {
  const pathName = usePathname()
  const isActive =
    link === '/'
      ? pathName === '/'
      : pathName === link || pathName.startsWith(`${link}/`)

  return (
    <div className='pt-4'>
      <Link
        href={link}
        className={`rounded-md px-4 py-2 font-medium ${
          isActive ? 'bg-amber-400' : 'bg-white'
        }`}
      >
        {text}
      </Link>
    </div>
  )
}
