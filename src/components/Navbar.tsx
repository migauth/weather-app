'use client'

import React, { useState, useTransition } from 'react'
import { FaSun, FaLocationCrosshairs } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import SearchBox from './SearchBox';
import axios from 'axios';
import { error } from 'console';
import { useAtom } from 'jotai';
import { loadingCityAtom, placeAtom } from '@/app/atom';


type Props = { location?: string }

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;


export default function Navbar({ location }: Props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom)
  const [_, setLoadingCity] = useAtom(loadingCityAtom)

  async function handleInputChange(value:string) {
    setCity(value)
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );

        const suggestions = response.data.list.map((item: any) => item.name );
        setSuggestions(suggestions);
        setError('')
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([])
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);

    } 
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (postiion) => {
        const { latitude, longitude } = postiion.coords;
        console.log(postiion);
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  }

  return (
    <>
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-black'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <div className='flex items-center justify-center gap-2'>    
          <h2 className='text-white text-3xl font-extrabold hover:text-yellow-300 transition duration-300'>Weather</h2>
          <FaSun className='text-3xl mt-1 text-yellow-300 animate-spin-slow'/>
          {/* <img className=' size-12 mt-1 text-yellow-300 animate-spin-slow' src="/sun.png" alt="" /> */}
        </div>
        {/*  */}
        <section className='flex gap-4 items-center'>
          <FaLocationCrosshairs 
          title='Your Current Location'
          onClick={handleCurrentLocation}
          className='text-2xl text-white hover:text-yellow-300 cursor-pointer transition duration-300'/>
          <CiLocationOn className='text-3xl text-white hover:text-yellow-300 cursor-pointer transition duration-300'/>
          <p className='text-white text-lg font-semibold'>{location}</p>
          <div className='relative hidden md:flex'>
            {/* search box */}
            <SearchBox
            value={city}
            onSubmit={handleSubmitSearch}
            onChange={(e) => handleInputChange(e.target.value)}
            
            />
            <SuggestionBox
              {...{
                showSuggestions,
                suggestions,
                handleSuggestionClick,
                error
                }}
                />
          </div>
        </section>
      </div>
    </nav>
    <section className="flex   max-w-7xl px-3 md:hidden ">
        <div className=" relative">
          {/* SearchBox */}

          <SearchBox
            value={city}
            onSubmit={handleSubmitSearch}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <SuggestionBox
            {...{
              showSuggestions,
              suggestions,
              handleSuggestionClick,
              error
            }}
          />
        </div>
      </section>
  </>
  );
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] right-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1 "> {error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded   hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}