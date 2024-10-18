"use client";

import { URL_GENERATION, URL_POKEMON } from "@/app/api/apiRest";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Search from "../components/Search";
import axios from "axios";
import MiniCard from "../components/MiniCard";
import Types from "../components/Types";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import MicroCard from "../components/MicroCard";
import { TbPokeball } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import usePokemons from "../hooks/usePokemons";
import Card from "../components/Card";
import { MdCatchingPokemon } from "react-icons/md";
import { PokemonContext } from "../context/PokemonContext";
import Generation from "../components/Generation";
import usePagination from "../hooks/usePagination";

const Pok: any = [];

const initialState: Poke[] = [];
type Poke = {
  name: string;
  url: string;
};

interface Gen {
  name: string;
  initial: string;
  alias: string;
  count: string;
}
const gene: Gen = {
  name: "generation-ix",
  alias: "Generation 2",
  initial: "1",
  count: "1025",
};

const Pokedex = () => {
  const { generations, pokemonsFiltered } =
    useContext(PokemonContext);

  const { pokemons, getNextUrl, morePokemons } = usePagination();
  const [search, setSearch] = useState("");

  const obtenerSearch = (e: any) => {
    const texto = e.toLowerCase();
    setSearch(texto);
  };

  //console.log(pokemonsFiltered?.length)
  //console.log(pokemonsFiltered)

  return (
    <div className="lg:h-[600px] w-[1200px] text-white flex flex-row rounded-3xl bg-black/50 backdrop-blur-2xl ">
      <section className="hidden lg:block lg:basis-1/4 h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <h1 className="text-xl font-semibold">Types</h1>
        <h1 className="text-sm">All Pokemon</h1>
        <Types />
      </section>

      <section className="w-full lg:basis-3/4">
        <h1 className="-mt-10 flex flex-row justify-center items-center text-xl font-bold">
          <MdCatchingPokemon /> <span className="pl-3">Pokedex</span>
        </h1>

        <div className="p-5">
          <div id="up" className="w-full flex flex-row gap-x-4 pt-5">
            <Generation />
            <div className="hidden lg:block">
              <Search obtenerSearch={obtenerSearch} />
            </div>

            <Link
              href={`/`}
              className="h-10 px-3 text-lg flex justify-center items-center bg-black/20 border border-gray-600 rounded-lg"
            >
              <AiOutlineClose />
            </Link>
          </div>

          <div>
            <h1 className="px-5">
              List {" "}
              <span className="mx-2 px-2 border border-gray-500/50 rounded-md">
                {pokemonsFiltered?.length}
              </span>
              {" "} Pokemons
            </h1>
          </div>

          {/** <div className="flex flex-row items-center">
            <span className="hidden pl-3 pr-1">
              {"G-"}
              {generation?.alias.substr(11)}
            </span>
            <span className="px-2 text-gray-400 text-sm">Total </span>
            <span className="flex flex-row items-center font-semibold border border-gray-500 rounded-lg px-4">
              {generation?.count}
            </span>

            <span className="px-2 text-gray-400 pl-5 text-sm">Range</span>
            <h1 className="flex flex-row items-center font-semibold border border-gray-500 rounded-lg px-4">
              {Number(generation?.initial)}
              &nbsp; <TbPokeball className="mx-2" /> &nbsp;
              {Number(generation?.count) + Number(generation?.initial) - 1}
            </h1>
          </div>  */}

          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-5 pt-5 mb-10">
            {pokemons?.length! > 0 ? (
              pokemons?.map((item: any, index: any) => (
                <MicroCard key={index} url={item}></MicroCard>
              ))
            ) : (
              <h1>Empty</h1>
            )}
          </div>

          {/** PAGINACION NAVEGACION * /}
          <div className="flex flex-row items-center justify-center gap-x-4 ">
            <Link
              href="/pokedex#up"
              className="z-20 bg-black/40 rounded-md cursor-pointer p-2"
              onClick={() => {
                if (xpage === 1) {
                  return console.log("No pueder regresar");
                }
                setXpage(xpage - 1);
              }}
            >
              <FaChevronLeft />
            </Link>
            <span>{xpage}</span>
            <span>de </span>
            <span>{Math.ceil(Number(generation?.count) / countCard)}</span>
            <Link
              href="/pokedex#up"
              className="z-20 bg-black/40 rounded-md cursor-pointer p-2"
              onClick={() => {
                if (xpage >= Number(generation?.count) / countCard) {
                  return console.log("es el ultimo");
                }
                setXpage(xpage + 1);
              }}
            >
              <FaChevronRight />
            </Link>
          </div> {/  ** PAGINACION NAVEGACION */}

          <div>
            {morePokemons ? (
              <button
                onClick={getNextUrl}
                type="button"
                className="rounded-full text-center py-2 px-5 bg-indigo-600"
              >
                More Pokemons
              </button>
            ) : (
              <Link
                href="/pokedex#up"
                className="rounded-full text-center py-2 px-5 bg-teal-600"
              >
                <span>Total: {pokemons.length} pokemons</span>
                <span>{` - SUBIR `}</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pokedex;
