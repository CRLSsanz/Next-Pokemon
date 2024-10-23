import React from "react";
import usePokemon from "../hooks/usePokemon";
import Icons from "./Icons";
import { PokemonListType } from "../interfaces/interfaces";
import Link from "next/link";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { TbMaximize } from "react-icons/tb";

interface Props {
  url: string;
}

const Card = ({ pokemon }: any) => {
  //const { pokemon } = usePokemon(url);
  //console.log(pokemon);
  //console.log(pokemon)
  return (
    <div className=" relative my-5 ">
      <div className="Xpx-20 bg-gradient-to-b from-black/0 to-black/50 rounded-xl border border-gray-500/10">
        <img
          className="w-full -mt-8 -mb-4 hover:scale-110"
          src={pokemon.image}
          //src={pokemon?.sprites?.other["official-artwork"]?.front_default}
          alt="ima"
        />
      </div>

      <div className="px-3 X-mt-8 w-full flex flex-row justify-between items-center text-gray-400">
        <h1 className="capitalize truncate">
          {pokemon.name.replace("-mega", " ").replace("-gmax", " ").replace("-", " ")}
        </h1>

        <h1 className="hidden font-semibold">
          #{pokemon.pokedexNumber}
        </h1>
      </div>

      <Link
        href={`/${pokemon?.name?.replaceAll(" ", "-").toLowerCase()}#view`}
        className={`absolute top-0 right-0 z-50 active:animate-ping rotate-90 hover:scale-110 p-1.5`}
      >
        <TbMaximize className="w-5 h-5 text-gray-300" />
      </Link>

    </div>
  );
};

export default Card;
