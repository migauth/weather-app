import React from "react";
import { IoIosSearch } from "react-icons/io";

type Props = {};

export default function SearchBox({}: Props) {
  return (
    <form className="flex relative items-center justify-center h-10">
      <input type="text" placeholder="Seach location..."/>
      <button>
        <IoIosSearch />
      </button>
    </form>
  );
}
