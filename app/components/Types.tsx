import React, { useContext, useState } from "react";
import { ImFire } from "react-icons/im";
import { TypesColor } from "./Colors";
import Icons from "./Icons";
import { PokemonContext } from "../context/PokemonContext";

const Types = () => {
  const {
    types,
    filterSelected,
    changeTypeSelected,
    generations,
    generationSelected,
    generationChange,
  } = useContext(PokemonContext);
  const [open, setOpen] = useState(true);

  const changeType = (type: any) => {
    changeTypeSelected(type);
  };

  const resultColorBg = (type: any) => {
    const item = TypesColor.find(({ name }) => name === type);
    //console.log(item?.color);
    return item?.colorBg;
  };

  const typesList = TypesColor.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  const obtenerGeneracion = (e: any) => {
    const texto = e.toLowerCase();
    generationChange(texto);
  };

  const genx = generationSelected?.url?.split("/")!;

  return (
    <div>
      <div onClick={() => setOpen(!open)} className="hidden w-48 lg:w-full">
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
      <div className="w-full flex flex-row flex-wrap gap-3">
        {types.map((type) => (
          <div
            className="px-4 py-2 border rounded-md"
            onClick={() => changeType(type)}
            key={type.name}
          >
            {type.name}
          </div>
        ))}
      </div>

      <div className="hidden Xgrid grid-cols-2 py-5 gap-4">
        {typesList.sort().map((item, index) => (
          <div key={index}>
            <div className="flex flex-row gap-2">
              <div className={`${resultColorBg(item.name)} rounded-full p-1.5`}>
                {Icons(item.name)}
              </div>
              <h1 className="capitalize">{item.name}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Types;
