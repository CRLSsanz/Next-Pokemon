"use client";

import { useEffect, useState } from "react";
import { URL_POKEMON } from "@/app/api/apiRest";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Search from "./components/Search";
import axios from "axios";
import MiniCard from "./components/MiniCard";
import Types from "./components/Types";
import Link from "next/link";

const Pok: any = [];

type Poke = {
  name: string;
  url: string;
};

const initialState: Poke[] = [];

export default function Home() {
  const [arrayPokemon, setArrayPokemon] = useState(initialState);
  const [globalPokemon, setGlobalPokemon] = useState([Pok]);
  const [search, setSearch] = useState("mew");
  const [xpage, setXpage] = useState(1);

  useEffect(() => {
    const api = async () => {
      const limit = 12;
      const xp = (xpage - 1) * limit;
      const apiPoke = await axios.get(
        `${URL_POKEMON}/?offset=${xp}&limit=${limit}`
      );
      setArrayPokemon(apiPoke.data.results);
    };

    api();
    getGlobalPokemons();
  }, [xpage]);

  const getGlobalPokemons = async () => {
    const res = await axios.get(`${URL_POKEMON}/?offset=0&limit=1000`);
    const promises = res.data.results.map((pokemon: any) => {
      return pokemon;
    });
    const results = await Promise.all(promises);
    setGlobalPokemon(results);
  };

  //console.log(globalPokemon);

  const obtenerSearch = (e: any) => {
    const texto = e.toLowerCase();
    setSearch(texto);
    setXpage(1);
  };

  const filterPokemons =
    search?.length > 2
      ? globalPokemon?.filter((pokemon) => pokemon?.name?.includes(search))
      : [] //arrayPokemon

  return (
    <div className="lg:h-[600px] w-[1200px] text-white flex flex-row rounded-3xl bg-black/40 backdrop-blur-2xl ">
      <section className="hidden lg:block lg:basis-1/4 h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <h1 className="text-xl font-semibold">Types</h1>
        <h1 className="text-sm">All Pokemon</h1>
        <Types />
      </section>

      <section className="w-full lg:basis-3/4">
        <div className="p-5">
          <h1 className="text-xl font-semibold">Good morning, Charlie </h1>
          <h1 className="text-sm text-gray-200 mb-14">List Pokemons</h1>
          <h1 className="text-3xl font-semibold py-5">
            What Pokemon are you looking for?{" "}
          </h1>

          <Search obtenerSearch={obtenerSearch}/>


          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pt-10">
            {filterPokemons?.map((items, index) => (
              <MiniCard key={index} data={items} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 my-5">
            <Link href={`/pokedex`} className="rounded-xl px-3 py-5 bg-gradient-to-br from-green-700/70 to-green-500 font-semibold">Pokedex</Link>
            <div className="rounded-xl px-3 py-5 bg-gradient-to-br from-red-700/70 to-red-500 font-semibold">Generations</div>
            <div className="rounded-xl px-3 py-5 bg-gradient-to-br from-blue-700/70 to-blue-500 font-semibold">Types</div>
            <div className="rounded-xl px-3 py-5 bg-gradient-to-br from-yellow-700/70 to-yellow-500 font-semibold">Species</div>
          </div>


        </div>
      </section>
    </div>
  );
}
