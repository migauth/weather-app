import React from 'react'
import { FaSun, FaLocationCrosshairs } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import SearchBox from './SearchBox';

type Props = {}

export default function Navbar({}: Props) {
  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <p className='flex items-center justify-center gap-2'>    
          <h2 className='text-white text-3xl font-extrabold hover:text-blue-300 transition duration-300'>Weather</h2>
          <FaSun className='text-3xl mt-1 text-yellow-300 animate-spin-slow'/>
        </p>
        {/*  */}
        <section className='flex gap-4 items-center'>
          <FaLocationCrosshairs className='text-2xl text-white hover:text-blue-300 cursor-pointer transition duration-300'/>
          <CiLocationOn className='text-3xl text-white hover:text-blue-300 cursor-pointer transition duration-300'/>
          <p className='text-white text-lg font-semibold'>Canada</p>
          <div>
            {/* search box */}
            <SearchBox />
          </div>
        </section>
      </div>
    </nav>
  )
}
