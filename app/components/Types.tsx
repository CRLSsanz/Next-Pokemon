import React from "react";
import { ImFire } from "react-icons/im";
import { TypesColor } from "./Colors";
import Icons from "./Icons";

const Types = () => {
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

  return (
    <div className=" grid grid-cols-2 py-5 gap-4">
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
  );
};

export default Types;
