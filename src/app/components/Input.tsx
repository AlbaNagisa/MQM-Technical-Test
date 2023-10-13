import React from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  placeholder: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

//input for search bar
export default function Input({ onChange, value, placeholder }: Props) {
  return (
    <div className="flex w-[50%] justify-center">
      <input
        className="rounded-l-lg border-none text-black w-[50%]"
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        value={value}
      />
      <button className="text-black font-bold py-2 px-4 w-auto h-auto text-lg rounded-r-lg  bg-white">
        <FaSearch />
      </button>
    </div>
  );
}
