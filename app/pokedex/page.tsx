"use client";

import { URL_POKEMON } from "@/app/api/apiRest";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Search from "../components/Search";
import axios from "axios";
import MiniCard from "../components/MiniCard";
import Types from "../components/Types";
import Link from "next/link";
import { useEffect, useState } from "react";
import MicroCard from "../components/MicroCard";
const Pok: any = [];

type Poke = {
  name: string;
  url: string;
};

const initialState: Poke[] = [];

const Pokedex = () => {
  const [arrayPokemon, setArrayPokemon] = useState(initialState);
  const [globalPokemon, setGlobalPokemon] = useState([Pok]);
  const [search, setSearch] = useState("");
  const [xpage, setXpage] = useState(2);

  useEffect(() => {
    const api = async () => {
      const limit = 32;
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
      : arrayPokemon;

  return (
    <div className="lg:h-[600px] w-[1200px] text-white flex flex-row rounded-3xl bg-black/40 backdrop-blur-2xl ">
      <section className="hidden lg:block lg:basis-1/4 h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <h1 className="text-xl font-semibold">Types</h1>
        <h1 className="text-sm">All Pokemon</h1>
        <Types />
      </section>

      <section className="w-full lg:basis-3/4">
        <div className="p-5">
          <h1 className="text-xl font-semibold mb-5">Pokedex </h1>

          <div className="flex flex-row gap-4 mb-5">
            <select
              name=""
              id=""
              className="w-full bg-gray-800/50 rounded-full p-2 pl-12 border border-gray-500/50"
            >
              <option value="">Gen 1</option>
              <option value="">Gen 2</option>
              <option value="">Gen 3</option>
              <option value="">Gen 4</option>
              <option value="">Gen 5</option>
            </select>
            <Search obtenerSearch={obtenerSearch} />
          </div>

          <div className=" Xbg-red-300 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-x-2 gap-y-5 py-5 Xborder border-gray-200/40 rounded-3xl">
            {filterPokemons?.map((items, index) => (
              <MicroCard key={index} data={items} />
            ))}
          </div>

          {/** PAGINACION NAVEGACION */}
          <div className="flex flex-row items-center justify-center gap-x-4 ">
            <span className="z-20 bg-black/40 rounded-md cursor-pointer p-2"
              onClick={() => {
                if (xpage === 1) {
                  return console.log("No pueder regresar");
                }
                setXpage(xpage - 1);
              }}
            >
              <FaChevronLeft />
            </span>
            <span>{xpage}</span>
            <span>de</span>
            <span>{Math.round(globalPokemon?.length / 32)}</span>
            <span className="z-20 bg-black/40 rounded-md cursor-pointer p-2"
              onClick={() => {
                if (xpage === 67) {
                  return console.log("es el ultimo");
                }
                setXpage(xpage + 1);
              }}
            >
              <FaChevronRight />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pokedex;
