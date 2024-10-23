"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_IMAGE, URL_POKEMON } from "../api/apiRest";
import { PokemonListType } from "../interfaces/interfaces";
import Card from "../components/Card";
import Dashboard from "../components/Dashboard";
import Link from "next/link";
import { MdCatchingPokemon } from "react-icons/md";
import { AiOutlineClose, AiOutlineSwapLeft } from "react-icons/ai";
import { CgPokemon } from "react-icons/cg";
import { TbPokeball } from "react-icons/tb";

const Poke: any = [];

const GigantMax = () => {
  const [pokemons, setPokemons] = useState(Poke);
  const [evo, setEvo] = useState("gmax");
  const search = "mega";

  useEffect(() => {
    getPokemons();
  }, [evo]);

  const getPokemons = async () => {
    //let url_id = data?.url?.split("/"); // confierte a un array separando por el /
    //if (typeof url_id !== "undefined") {
    const api = await axios.get(`${URL_POKEMON}/?offset=1025&limit=278`);
    let pokemons = api.data?.results?.map((pokemon: any) =>
      pokemonToList(pokemon)
    );

    setPokemons(pokemons);
    //}
  };

  const pokemonToList = (item: PokemonListType) => {
    //const pokedexNumber = item.url.replace(`${URL_POKEMON}/`, "").replace("/", "");
    const pokedexNumber = item.url.split("/");

    const listPokemon: PokemonListType = {
      name: item.name,
      url: item.url,
      image: `${URL_IMAGE}/${pokedexNumber[6]}.png`,
      pokedexNumber: pokedexNumber[6],
    };
    return listPokemon;
  };

  const filterPokemons = pokemons?.filter((pokemon: any) =>
    pokemon?.name?.includes(evo)
  );
  // search === "pika"
  // ? globalPokemon?.filter((pokemon) => pokemon?.name?.includes(search))
  //  : []; //arrayPokemon;

  return (
    <div className="lg:h-[768px] w-[1200px] -m-5 text-white flex flex-row Xrounded-3xl bg-black/40 backdrop-blur-2xl ">
      <section className="hidden lg:block h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <Dashboard />
      </section>

      <section className="w-full p-5">
        <div className="flex flex-row items-center justify-between mb-5">
          <Link href={`/`}>
            <AiOutlineSwapLeft  className="text-gray-300 active:animate-ping h-6 w-6" />
          </Link>
          <h1 className="text-xl">
              Mega vs G-Max
          </h1>
          <Link href={`/pokedex`}>
            <TbPokeball className="text-gray-300 active:animate-ping h-6 w-6" />
          </Link>
        </div>

        <div className="px-4 flex flex-row justify-between rounded-full border border-gray-500/50 bg-gradient-to-br from-indigo-600 to-purple-600 mb-10">
          <h1 className={`active:animate-ping cursor-pointer p-2 ${evo==="mega" ? " font-bold text-white ":" font-normal text-gray-300 "} `} onClick={()=>setEvo("mega")}>Mega-Poke</h1>
          <h1 className={`active:animate-ping cursor-pointer p-2 ${evo==="gmax" ? " font-bold text-white ":" font-normal text-gray-300 "} `} onClick={()=>setEvo("gmax")}>Pokemons G-Max</h1>
        </div>

        <div className="">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filterPokemons?.map((item: any, index: any) => (
              <Card key={index} pokemon={item} />
            ))}
          </div>{" "}
        </div>
      </section>
    </div>
  );
};

export default GigantMax;
