"use client";

import { URL_GENERATION, URL_POKEMON } from "@/app/api/apiRest";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Search from "../components/Search";
import axios from "axios";
import MiniCard from "../components/MiniCard";
import Types from "../components/Types";
import Link from "next/link";
import { useEffect, useState } from "react";
import MicroCard from "../components/MicroCard";
import { Generations } from "../components/Generation";
import { TbPokeball } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import usePokemons from "../hooks/usePokemons";
import Card from "../components/Card";
import { MdCatchingPokemon } from "react-icons/md";

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
  name: "generation-i",
  alias: "Generation 1",
  initial: "1",
  count: "151",
};

const Pokedex = (type: string, generacion: string) => {
  const { pokemons, getNextUrl, morePokemons } = usePokemons();
  const [generation, setGeneration] = useState<Gen>(gene);
  const [search, setSearch] = useState("");

  const obtenerGeneracion = (e: any) => {
    const obj = Generations.find((item) => item.name === e) || gene;
    //console.log(obj);
    setGeneration(obj);
  };

  const obtenerSearch = (e: any) => {
    const texto = e.toLowerCase();
    setSearch(texto);
  };

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
          <div id="up" className="w-full flex flex-row gap-4 py-5">
            <select
              onChange={(e) => {
                obtenerGeneracion(e.target.value);
              }}
              defaultValue={generation?.name}
              name=""
              id=""
              className="w-40 appearance-none bg-gray-800/50 rounded-full p-2 px-6 border border-gray-500/50"
            >
              {Generations.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.alias}
                </option>
              ))}
            </select>
            <Search obtenerSearch={obtenerSearch} />
            <Link href={`/`} className="bg-white/30 rounded-lg p-3">
              <AiOutlineClose />
            </Link>
          </div>

          <div className="flex flex-row items-center">
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
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-5 pt-10 mb-10">
            {pokemons.length > 0 ? (
              pokemons.map((item, index) => (
                <MicroCard key={index} pokemon={item}></MicroCard>
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
