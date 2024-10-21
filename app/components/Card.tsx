import React from "react";
import usePokemon from "../hooks/usePokemon";
import Icons from "./Icons";
import { PokemonListType } from "../interfaces/interfaces";
import Link from "next/link";
import { BsArrowsAngleExpand } from "react-icons/bs";

interface Props {
  url: string;
}

const Card = ({ pokemon }: any) => {
  //const { pokemon } = usePokemon(url);
  //console.log(pokemon);
  //console.log(pokemon)
  return (
    <div className=" relative my-5 ">
      <div className="px-20 bg-gradient-to-l from-black/5 to-purple-500/30 rounded-xl border border-gray-500/30">
        <img
          className="w-full -mt-8 -mb-4 hover:scale-110"
          src={pokemon.image}
          //src={pokemon?.sprites?.other["official-artwork"]?.front_default}
          alt="ima"
        />
      </div>

      <div className="px-5 -mt-8 w-full flex flex-row justify-between items-center text-lg text-gray-400">
        <h1 className="capitalize truncate">
          {pokemon.name.replace("-mega", " ").replace("-gmax", " ").replace("-", " ")}
        </h1>

        <h1 className="font-semibold">
          #{pokemon.pokedexNumber}
        </h1>
      </div>

      <Link
        href={`/${pokemon?.name?.replaceAll(" ", "-").toLowerCase()}#view`}
        className={`absolute top-0 right-0 z-50 p-3`}
      >
        <BsArrowsAngleExpand className="w-6 h-6 " />
      </Link>

    </div>
  );
};

export default Card;
