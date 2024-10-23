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

  const resultColorText = (type: any) => {
    const item = TypesColor.find(({ name }) => name === type);
    //console.log(item?.color);
    return item?.colorText;
  };


  const typesList = types.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  const filterType = types.filter((item:any)=>item.name!="All" && item.name!="stellar" && item.name!="unknown")

  return (
    <div>
      <div className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-x-8 gap-y-4">
        {filterType.map((type) => (
          <div
            className="flex flex-col items-center gap-x-3 cursor-pointer"
            onClick={() => changeType(type)}
            key={type.name}
          >
            <div className={`${resultColorBg(type.name)} ${resultColorText(type.name)} rounded-full p-2.5`}>
              {Icons(type.name)}
            </div>
            <h1 className="mt-1 text-sm text-gray-400 capitalize">{type.name}</h1>
          </div>
        ))}
      </div>

      <div className="hidden Xgrid grid-cols-2 py-5 gap-5">
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
