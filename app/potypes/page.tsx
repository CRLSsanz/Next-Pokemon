"use client";

import React, { useContext } from "react";
import Types from "../components/Types";
import { PokemonContext } from "../context/PokemonContext";
import MiniCard from "../components/MiniCard";
import Card from "../components/Card";
import MicroCard from "../components/MicroCard";
import Dashboard from "../components/Dashboard";
import Link from "next/link";
import { AiOutlineClose, AiOutlineSwapLeft } from "react-icons/ai";
import { TbPokeball } from "react-icons/tb";

const PokeTypes = () => {
  const { pokemonsFiltered, filterSelected } = useContext(PokemonContext);

  //console.log(pokemonsFiltered)

  return (
    <div className="lg:h-[768px] w-[1200px] mt-10 lg:mt-0 text-white flex flex-row rounded-3xl bg-black/40 backdrop-blur-2xl ">
      <section className="hidden lg:block h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <Dashboard />
      </section>

      <section className="w-full">
        <div className="-mt-10 flex flex-row items-center justify-between mb-5">
          <Link href={`/`}>
            <AiOutlineSwapLeft className="text-gray-300 active:animate-ping h-6 w-6" />
          </Link>
          <h1 className="text-xl">Pokemons Types</h1>
          <Link href={`/pokedex`}>
            <TbPokeball className="text-gray-300 active:animate-ping h-6 w-6" />
          </Link>
        </div>

        <div className="mt-2 p-5">
          <Types />
        </div>

        <div className="p-5">
          <div className="capitalize text-center font-semibold p-2 bg-gradient-to-br from-teal-600 to-indigo-600 rounded-full">
            <span className="uppercase">{filterSelected.name}</span> ={" "}
            {pokemonsFiltered?.length} pokemons
          </div>
        </div>

        <div className="px-2 w-full grid grid-cols-3 lg:grid-cols-6 gap-2">
          {pokemonsFiltered?.slice(0, 24).map((items: any, index: any) => (
            <MicroCard key={index} url={items} />
          ))}
        </div>

        <h1 className="h-5"> </h1>
      </section>
    </div>
  );
};

export default PokeTypes;
