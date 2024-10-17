import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = ({ obtenerSearch }: any) => {
  return (
      <div className="relative hidden lg:block w-full ">
        <input
          type="search"
          className="w-full bg-gray-800/50 rounded-full p-2 pl-12 border border-gray-500/50"
          onChange={(e) => obtenerSearch(e.target.value)}
          placeholder="Input Name"
        />
        <div className="absolute top-3 left-4">
        <FiSearch />
        </div>
      </div>
    
  );
};

export default Search;
