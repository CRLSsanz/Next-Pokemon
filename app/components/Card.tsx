import React from "react";
import usePokemon from "../hooks/usePokemon";
import Icons from "./Icons";
import { PokemonListType } from "../interfaces/interfaces";

interface Props {
  url: string;
}

const Card = ( {pokemon} : any) => {
  //const { pokemon } = usePokemon(url);
  //console.log(pokemon);

  return (
    <div className="mt-5 bg-gradient-to-b from-[#040b1d11] to-purple-500/30 rounded-xl border border-gray-500/30">
      <div className="px-5">
        <img
          className="w-full -mt-5 -ml-2 hover:scale-110"
          src={pokemon.image}
          //src={pokemon?.sprites?.other["official-artwork"]?.front_default}
          alt=""
        />
      </div>
      <h1 className="capitalize truncate text-lg text-center text-white mt-2">
        {pokemon.name}
      </h1>

      <div className="w-full flex flex-row justify-between items-center mb-5">
        <h1 className="text-lg text-gray-400 font-semibold">#{pokemon.pokedexNumber}</h1>
      </div>
    </div>
  );
};

export default Card;
