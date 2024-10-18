import React, { useState, useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { FaChevronDown } from "react-icons/fa";

const Generation = () => {
  const { generations, generationChange, generationSelected } =
    useContext(PokemonContext);
  const [open, setOpen] = useState(false);

  const genx = generationSelected?.url?.split("/")!;

  return (
    <div onClick={() => setOpen(!open)} className="relative w-full lg:w-48 ">
      <div className="flex flex-row justify-between items-center py-2 px-5 border border-gray-600 rounded-full mb-5">
        <span>Gen - {genx[6]}</span>
        <span> <FaChevronDown className={` transition-all duration-200 ${open ? " rotate-180" : " rotate-0 "} `} /> </span>
      </div>
      {open && generations && (
        <div className="absolute z-30 top-14 left-0 w-full flex flex-col bg-black/90 border border-white/20 rounded-md px-2 hover:cursor-pointer">
          {generations?.map((gene) => (
            <div
              className="px-4 py-2 border-b border-white/20 hover:font-bold"
              onClick={() => generationChange(gene)}
              key={gene.name}
            >
              {gene.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Generation;
