import React from 'react'
import { FaSun, FaLocationCrosshairs  } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import SearchBox from './SearchBox';

type Props = {}

export default function Navbar({}: Props) {
  return (
    <nav className='shadow-sm  sticky top-0 left-0 z-50 bg-white'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <p className='flex items-center justify-center gap-2'>    
          <h2 className='text-gray-500 text-3xl'>Weather</h2>
          <FaSun className='text-3xl mt-1 text-yellow-400'/>
        </p>
        {/*  */}
        <section className='flex gap-2 items-center'>
        <FaLocationCrosshairs className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer'/>
        <CiLocationOn className='text-3xl text-gray-800 hover:opacity-80 cursor-pointer'/>
        <p className='text-slate-900/80 text-sm'> Canada </p>
        <div>
          {/* search box */}
          <SearchBox />
        </div>
        </section>
      </div>
   </nav>
  )
}