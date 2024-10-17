import React, { useContext, useState } from "react";
import { PokemonContext } from "../context/PokemonContext";

const Generation = () => {
  const { generations, generationChange, generationSelected } =
    useContext(PokemonContext);
  const [open, setOpen] = useState(false);

  const genx = generationSelected?.url?.split("/")!;

  return (
    <div onClick={() => setOpen(!open)} className="w-full lg:w-48 ">
      <div className="flex flex-row justify-between py-2 px-5 border border-gray-600 rounded-full mb-5">
        <span>Gen - {genx[6]}</span>
        <span> v </span>
      </div>
      {open && generations && (
        <div className="w-full flex flex-col border border-white/20 rounded-md px-2 hover:cursor-pointer">
          {generations?.map((gene) => (
            <div
              className="px-4 py-1.5 border-b border-white/20 hover:font-bold"
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
