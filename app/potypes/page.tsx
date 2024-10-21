"use client";

import React, { useContext } from "react";
import Types from "../components/Types";
import { PokemonContext } from "../context/PokemonContext";
import MiniCard from "../components/MiniCard";
import Card from "../components/Card";
import MicroCard from "../components/MicroCard";
import Dashboard from "../components/Dashboard";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

const PokeTypes = () => {
  const { pokemonsFiltered } = useContext(PokemonContext);

  //console.log(pokemonsFiltered)

  return (
    <div className="lg:h-[768px] w-[1200px] mt-10 lg:mt-0 text-white flex flex-row rounded-3xl bg-black/40 backdrop-blur-2xl ">
      <section className="hidden lg:block h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <Dashboard />
      </section>

      <section className="w-full">
        <div className="-mt-10 flex flex-row items-center justify-between">
          <h1 className="flex flex-row items-center justify-center font-bold">
             <span className="text-xl pl-2">Pokemons Types</span>
          </h1>
          <Link href={`/`} >
            <AiOutlineClose className="h-6 w-6" />
          </Link>
        </div>

        <div className="mt-2 p-5">
          <Types />
        </div>

        <div className="p-5 ">{pokemonsFiltered?.length}</div>

        <div className="w-full grid grid-cols-3 lg:grid-cols-6 gap-5">
          {pokemonsFiltered?.map((items: any, index: any) => (
            <MicroCard key={index} url={items} />
          ))} 
        </div>
      </section>
    </div>
  );
};

export default PokeTypes;
