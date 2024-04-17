import NavButton from '../NavButton'

export default function Navbar() {
  return (
    <div className='flex flex-row gap-10 ml-4 pb-1 items-center justify-center'>
      <NavButton text='Overview' link='/' />
      <NavButton text='Inventory' link='/inventory' />
      <NavButton text='Packages' link='/packages' />
      <NavButton text='Customers' link='/customers' />
      <NavButton text='Alterations' link='/alterations' />
    </div>
  )
}
