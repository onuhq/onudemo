import Image from 'next/image'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className='bg-gray-300 w-72 flex flex-col pt-6'>
      <Link href={'/'}><Image className='self-center cursor-pointer' src="/logo.png" alt="Onu Logo" width={150} height={50} /></Link>
      <Link href="/scenarios"><div className='self-center mt-20 hover:bg-gray-400 w-full py-3 px-5 cursor-pointer'>
        <p>My Scenarios</p>
      </div></Link>
      <Link href="/tasks"><div className='self-center mt- hover:bg-gray-400 w-full py-3 px-5 cursor-pointer'>
        <p>Tasks</p>
      </div></Link>

    </div>
  )
}

export default Sidebar
