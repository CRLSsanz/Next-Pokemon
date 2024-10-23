import React, { useState, useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { FaChevronDown } from "react-icons/fa";
import { BsChevronCompactDown } from "react-icons/bs";

const Generation = () => {
  const { generations, generationChange, generationSelected } =
    useContext(PokemonContext);
  const [open, setOpen] = useState(false);

  const genx = generationSelected?.url?.split("/")!;

  return (
    <div onClick={() => setOpen(!open)} className="relative w-full lg:w-48 ">
      <div className="flex flex-row justify-between items-center py-2 px-5 border border-gray-600 bg-gradient-to-br from-teal-600 to-indigo-600 rounded-full mb-5">
        <span>Gen - {genx[6]}</span>
        <span> <BsChevronCompactDown className={` transition-all duration-200 ${open ? " rotate-180" : " rotate-0 "} `} /> </span>
      </div>
      {open && generations && (
        <div className="absolute z-40 top-14 left-0 w-full flex flex-col bg-gradient-to-tl from-teal-600 to-indigo-600 border border-white/20 rounded-md px-2 hover:cursor-pointer">
          {generations?.map((gene) => (
            <div
              className="flex z-50 px-4 py-3 hover:font-bold hover:ml-2 hover:bg-black/30 border-b border-white/20 cursor-pointer"
              onClick={() => generationChange(gene)}
              key={gene.name}
            >
              <span className="uppercase text-xs tracking-widest">
              {gene.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Generation;
