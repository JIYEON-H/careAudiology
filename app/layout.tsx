import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LayoutAppbar from '@/components/layouts/Appbar'
import Navbar from '@/components/layouts/Navbar'
import Sidebar from '@/components/layouts/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        {/* <LayoutAppbar />
        <div className='flex flex-row'>
          {/* <Sidebar /> */}
        {/* <Navbar /> */}
        {/* </div> */}
        {children}
      </body>
    </html>
  )
}
