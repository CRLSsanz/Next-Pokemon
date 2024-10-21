"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_IMAGE, URL_POKEMON } from "../api/apiRest";
import { PokemonListType } from "../interfaces/interfaces";
import Card from "../components/Card";
import Dashboard from "../components/Dashboard";
import Link from "next/link";
import { MdCatchingPokemon } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const Poke: any = [];

const GigantMax = () => {
  const [pokemons, setPokemons] = useState(Poke);
  const [evo, setEvo] = useState("mega");
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
        <div className="flex flex-row items-center justify-between">
          <h1 className="flex flex-row items-center justify-center font-bold">
            <MdCatchingPokemon className="hidden h-6 w-6" />{" "}
            <span className="text-xl pl-2"> </span>
          </h1>
          <Link href={`/`}>
            <AiOutlineClose className="h-6 w-6" />
          </Link>
        </div>

        <div className="px-4 flex flex-row justify-between rounded-full border border-gray-500/50 my-5">
          <h1 className={`cursor-pointer p-2 ${evo==="mega" ? " font-bold ":" font-normal"} `} onClick={()=>setEvo("mega")}>Mega Pokemons</h1>
          <h1 className={`cursor-pointer p-2 ${evo==="gmax" ? " font-bold ":" font-normal"} `} onClick={()=>setEvo("gmax")}>Pokemons Gigant</h1>
        </div>

        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
