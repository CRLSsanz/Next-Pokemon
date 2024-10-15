import React from "react";
import { useEffect, useState } from "react";
import { CiRuler, CiDumbbell } from "react-icons/ci";
import { AiOutlineThunderbolt } from "react-icons/ai";
import Link from "next/link";
import { IResults, PokemonListType } from "../interfaces/interfaces";

interface PokemonCard {
  pokemon: PokemonListType;
}

const Card = ( {pokemon}: PokemonCard) => {
  return (
    <div className="flex flex-col justify-center pokemons-center pt-5">
      <div
        className={`w-full rounded-3xl shadow-xl from-white/50 `}
      >
        <div className="flex justify-center p-2">
          <img
            className="w-full -mt-10 hover:scale-110"
            src={pokemon.image}
            alt=""
          />
        </div>

        <h1 className="text-sm font-semibold rounded-md px-1">
          id: #{pokemon.pokedexNumber}
        </h1>
        <h1 className="capitalize text-lg text-center text-white mb-2">
          {pokemon.name}
        </h1>
      </div>
    </div>
  );
};

export default Card;
