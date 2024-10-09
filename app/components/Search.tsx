import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = ({ obtenerSearch }: any) => {
  return (
    <div className="md:basis-1/2">
      <h1 className="hidden mb-2">Busqueda por Nombre</h1>
      <div className="relative w-full ">
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
    </div>
  );
};

export default Search;
