import Image from 'next/image'
import React from 'react'
import logo from '@/app/assets/images/logo.png'
import Link from 'next/link'

type Props = {}

const Header = (props: Props) => {
  return (
    <section className='sticky z-40 flex flex-row w-full bg-black justify-between top-0 '>
       <Link href="/"><p className='text-4xl font-bold'>Aryan.</p> </Link>  
      <ul className=' lg:flex md:flex hidden items-center  ' >
        <li  className='flex gap-10 ' >   
            <Link href="/" className='hover:text-green-800 hover:underline transition-all duration-500 text-white text-xl font-semibold'>Home</Link>
            <Link href="/Dashboard" className='hover:text-green-800 hover:underline transition-all duration-500 text-white text-xl font-semibold'>Dashboard</Link>
            <Link href="/Login" className='hover:text-green-800 hover:underline transition-all duration-500 text-white text-xl font-semibold'>Login</Link>
            <Link href="/Register" className='hover:text-green-800 hover:underline transition-all duration-500 text-white text-xl font-semibold'>Register</Link>
            {/* <Link href="/Login" className='hover:text-green-800 hover:underline transition-all duration-500'>Login</Link> */}
            {/* <Link href="/Places" className='hover:text-green-800 hover:underline transition-all duration-500'>Places</Link>
            <Link href="/Booktic" className='hover:text-green-800 hover:underline transition-all duration-500'>Booking</Link> */}
        </li>
</ul>               
    </section>
  )
}

export default Header