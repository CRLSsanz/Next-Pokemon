import React from "react";
import usePokemon from "../hooks/usePokemon";
import Icons from "./Icons";

interface Props {
  url: string;
}

const Card = ({ url }: Props) => {
  const { pokemon } = usePokemon(url);
  //console.log(pokemon);

  return (
    <div className="relative select-none flex flex-col items-center justify-around Xbg-white/5 Xmb-5">
      <div className="z-20 px-2">
        <img
          className="-mt-10 cursor-pointer w-full hover:scale-110 pt-5"
          //src={pokemon?.sprites?.other?.showdown?.front_default}
          src={pokemon?.sprites?.other["official-artwork"]?.front_default}
          alt=""
        />
      </div>
      <h1 className="capitalize text-lg text-center text-white mt-2">
        {pokemon.name}
      </h1>

      <div className="w-full flex flex-row justify-between items-center mb-5">
        <div className="flex flex-row gap-2">
          {pokemon?.types?.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className={`p-1 rounded-full bg-black/30 `}
              >
                {Icons(item.type.name)}
              </div>
            );
          })}
        </div>

        <h1 className="text-lg text-gray-400 font-semibold">#{pokemon.id}</h1>
      </div>
    </div>
  );
};

export default Card;
