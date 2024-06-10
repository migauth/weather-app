import cn from "@/utils/cn";
import React from "react";
import { IoIosSearch } from "react-icons/io";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(props: Props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn("flex relative items-center justify-center h-10", props.className)}
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Seach location..."
        className="px-4 py-4 w-[230px] border-gray-300 rounded-l-md focus:outline-none h-full"
      />
      <button className="px-4 py-[5px] bg-yellow-400 text-3xl text-white hover:text-yellow-300 cursor-pointer transition duration-300 rounded-r-md ">
        <IoIosSearch />
      </button>
    </form>
  );
}
