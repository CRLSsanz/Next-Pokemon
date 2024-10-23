"use client";

import { useEffect, useState } from "react";
import { URL_POKEMON } from "@/app/api/apiRest";
import Search from "./components/Search";
import axios from "axios";
import Types from "./components/Types";
import Link from "next/link";
import MiniCard from "./components/MiniCard";
import Card from "./components/Card";
import { GrDashboard } from "react-icons/gr";
import Dashboard from "./components/Dashboard";

const Pok: any = [];

type Poke = {
  name: string;
  url: string;
};

const initialState: Poke[] = [];

export default function Home() {
  const [globalPokemon, setGlobalPokemon] = useState([Pok]);
  const [search, setSearch] = useState("mew"); //mew
  //console.log(pokemonsFiltered);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  const getGlobalPokemons = async () => {
    const res = await axios.get(`${URL_POKEMON}/?offset=0&limit=1025`);
    //const promises = res.data.results.map((pokemon: any) => {
    //  return pokemon;
    //});
    //const results = await Promise.all(promises);

    setGlobalPokemon(res?.data?.results);
  };

  //console.log(globalPokemon);

  const obtenerSearch = (e: any) => {
    const texto = e.toLowerCase();
    setSearch(texto);
  };

  const filterPokemons =
    search?.length > 2
      ? globalPokemon?.filter((pokemon) => pokemon?.name?.includes(search))
      : []; //arrayPokemon;

  return (
    <div className="lg:h-[768px] w-[1200px] text-white flex flex-row rounded-3xl bg-black/40 backdrop-blur-2xl ">
      <section className="hidden lg:block h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <Dashboard />
      </section>

      <section className="w-full">
        <div className="p-5">
          <h1 className="text-xl font-semibold">Good morning, Charlie </h1>
          <h1 className="text-sm text-gray-400 mb-14">Wellcome to Pokedex Pototype v. 2.0</h1>
          <h1 className="text-3xl font-semibold py-5">
            What Pokemon are you looking for?{" "}
          </h1>

          <Search obtenerSearch={obtenerSearch} />

          <div>
            <h1 className="hidden">Pokemons encontrados {filterPokemons?.length}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pt-10">
              {filterPokemons?.map((items: any, index: any) => (
                <MiniCard key={index} data={items} />
              ))}
            </div>
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-5">
            <Link
              href={`/pokedex`}
              className="rounded-xl px-3 py-5 bg-gradient-to-br from-green-700/70 to-green-500 font-semibold"
            >
              Pokedex
            </Link>
            <Link
              href={`/generation`}
              className="rounded-xl px-3 py-5 bg-gradient-to-br from-red-700/70 to-red-500 font-semibold"
            >
              Generations
            </Link>

            <Link
              href={`/potypes`}
            className="rounded-xl px-3 py-5 bg-gradient-to-br from-blue-700/70 to-blue-500 font-semibold">
              Types
            </Link>

            <Link
              href={`/gigantmax`}
              className="rounded-xl px-3 py-5 bg-gradient-to-br from-yellow-700/70 to-yellow-500 font-semibold">
              Mega & Gmax
            </Link>
            <div className="rounded-xl px-3 py-5 bg-gradient-to-br from-purple-700/70 to-purple-500 font-semibold">
              Items
            </div>
            <div className="hidden rounded-xl px-3 py-5 bg-gradient-to-br from-yellow-900/70 to-yellow-700 font-semibold">
              marron
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
