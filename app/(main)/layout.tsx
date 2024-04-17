import LayoutAppbar from '@/components/layouts/Appbar'
import Navbar from '@/components/layouts/Navbar'

interface Props {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <div className='max-w-screen-xl mx-auto'>
      <LayoutAppbar />
      <Navbar />
      {children}
    </div>
  )
}
