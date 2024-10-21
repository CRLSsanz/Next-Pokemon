"use client";

import Search from "../components/Search";
import Types from "../components/Types";
import Link from "next/link";
import { useContext, useState } from "react";
import MicroCard from "../components/MicroCard";
import { AiOutlineClose } from "react-icons/ai";
import { MdCatchingPokemon } from "react-icons/md";
import { PokemonContext } from "../context/PokemonContext";
import Generation from "../components/Generation";
import usePagination from "../hooks/usePagination";
import Dashboard from "../components/Dashboard";

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
  const { generations, pokemonsFiltered } = useContext(PokemonContext);

  const { pokemons, getNextUrl, morePokemons } = usePagination();
  const [search, setSearch] = useState("");

  const obtenerSearch = (e: any) => {
    const texto = e.toLowerCase();
    setSearch(texto);
  };

  //console.log(pokemonsFiltered?.length)
  //console.log(pokemonsFiltered)

  return (
    <div className="lg:h-[768px] w-[1200px] mt-10 lg:mt-0 text-white flex flex-row rounded-3xl bg-black/40 backdrop-blur-2xl ">
      <section className="hidden lg:block h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <Dashboard />
      </section>

      <section className="w-full">
        <div className="-mt-10 flex flex-row items-center justify-between">
          <h1 className="flex flex-row items-center justify-center font-bold">
            <MdCatchingPokemon className="h-6 w-6" /> <span className="text-xl pl-2">Pokedex</span>
          </h1>
          <Link href={`/`} >
            <AiOutlineClose className="h-6 w-6" />
          </Link>
        </div>

        <div className="">
          <div id="up" className="w-full mt-2 p-5 flex flex-row gap-x-4">
            <Generation />
            <div className="hidden lg:block">
              <Search obtenerSearch={obtenerSearch} />
            </div>
          </div>

          <div className="px-2 -mt-5 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-y-5 gap-x-2 mb-10">
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

          <div className="w-full px-5 mb-5 flex flex-row justify-between items-center">
            <h1 className="">
              <span className="font-semibold">{pokemonsFiltered?.length}</span>{" "}
              Pokemons
            </h1>
            <div>
              {morePokemons ? (
                <button
                  onClick={getNextUrl}
                  type="button"
                  className="rounded-full text-center py-2 px-5 bg-gradient-to-br from-blue-500 to-purple-600"
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
        </div>
      </section>
    </div>
  );
};

export default Pokedex;
