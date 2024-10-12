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

const Pokedex = () => {
  const [arrayPokemon, setArrayPokemon] = useState(initialState);
  const [globalPokemon, setGlobalPokemon] = useState([Pok]);
  const [search, setSearch] = useState("");
  //const [generation, setGeneration] = useState({ name: "generation-iv", alias: "Generation 4", initial:"387",count: "107" });
  const [generation, setGeneration] = useState<Gen>();
  const [xpage, setXpage] = useState(1);
  const countCard = 24;
  //console.log(generation);

  useEffect(() => {
    /*const api = async () => {
      const limit = countCard;
      const xp = (xpage - 1) * limit;
      const apiPoke = await axios.get(
        `${URL_POKEMON}/?offset=${xp}&limit=${limit}`
        
      );
      setArrayPokemon(apiPoke.data.results);
    }; */

    const api = async () => {
      const apiPoke = await axios.get(`${URL_GENERATION}/${generation?.name}`); //  ${generation?.name}
      let limit = countCard;
      const xp = (xpage - 1) * countCard;

      let total = apiPoke.data.pokemon_species.length;

      if (total - xp < limit) limit = total;
      else {
        limit = xpage * countCard;
      }
      //console.log(limit);
      const array = apiPoke.data.pokemon_species.sort((a: any, b: any) => {
        const au = a.url.split("/");
        const bu = b.url.split("/");
        if (Number(au[6]) > Number(bu[6])) {
          return 1;
        }
        if (Number(au[6]) < Number(bu[6])) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      //const array = apiPoke.data.pokemon_species.slice(xp, limit);
      setArrayPokemon(array.slice(xp, limit));
    };
    //const gener=Generations.find((gen)=>gen.alias==="Generacion 2")
    //setGeneration(Generations.find((gen)=>gen.alias==="Generation 6")); //{ name: "generation-iv", alias: "Generation 4", initial:"387",count: "107" })

    api();
    getGlobalPokemons();
  }, [xpage, generation]);

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

  const obtenerGeneracion = (e: any) => {
    const obj=Generations.find((item) => item.name === e);
    //console.log(obj);
    setGeneration(obj);
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
              onChange={(e) => {
                obtenerGeneracion(e.target.value);
              }}
              defaultValue={generation?.name}
              name=""
              id=""
              className="w-full bg-gray-800/50 rounded-full p-2 pl-12 border border-gray-500/50"
            >
              {Generations.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.alias}
                </option>
              ))}
            </select>
            <Search obtenerSearch={obtenerSearch} />
          </div>

          <div className="flex flex-row items-center">
            <h1 className="px-3">List Pokemon </h1>
            <TbPokeball />
            <h1 className="pl-2 font-semibold">
              {Number(generation?.initial) + (xpage - 1) * countCard} {" - "}{" "}
              {Number(generation?.initial) +
                (xpage - 1) * countCard +
                filterPokemons.length -
                1}
            </h1>
          </div>

          <div className=" Xbg-red-300 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-x-2 gap-y-5 py-5 Xborder border-gray-200/40 rounded-3xl">
            {filterPokemons?.map((items, index) => (
              <MicroCard key={index} data={items} />
            ))}
          </div>

          {/** PAGINACION NAVEGACION */}
          <div className="flex flex-row items-center justify-center gap-x-4 ">
            <span
              className="z-20 bg-black/40 rounded-md cursor-pointer p-2"
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
            <span>de </span>
            <span>{Math.ceil(Number(generation?.count) / countCard)}</span>
            <span
              className="z-20 bg-black/40 rounded-md cursor-pointer p-2"
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
