import React from 'react'
import { FaSearch } from "react-icons/fa";

const Search = ({obtenerSearch}:any) => {
  return (
    <div className="md:basis-1/2">
              <h1 className="">Busqueda por Nombre</h1>
              <div className="w-full flex flex-row  rounded-lg border border-gray-600">
                <input
                  type="search"
                  className="w-full bg-gray-800 rounded-l-lg p-1 px-3"
                  onChange={(e=>obtenerSearch(e.target.value))}
                />

                <div className="w-20 text-sm flex justify-center items-center bg-gradient-to-br from-purple-600 to-cyan-700 rounded-r-lg">
                  <FaSearch />
                </div>
              </div>
            </div>
  )
}

export default Search