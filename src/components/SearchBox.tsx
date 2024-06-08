import React from "react";
import { IoIosSearch } from "react-icons/io";

type Props = {};

export default function SearchBox({}: Props) {
  return (
    <form className="flex relative items-center justify-center h-10">
      <input type="text" placeholder="Seach location..." className="px-4 py-4 w-[230px] border-gray-300 rounded-l-md focus:outline-none h-full"/>
      <button>
        <IoIosSearch className="text-3xl text-white hover:text-yellow-300 cursor-pointer transition duration-300" />
      </button>
    </form>
  );
}
