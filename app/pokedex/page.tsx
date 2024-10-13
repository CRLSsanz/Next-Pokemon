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
  name: "generation-iv",
  alias: "Generation 4",
  initial: "387",
  count: "107",
};

const Pokedex = () => {
  const [arrayPokemon, setArrayPokemon] = useState(initialState);
  const [globalPokemon, setGlobalPokemon] = useState([Pok]);
  const [search, setSearch] = useState("");
  const [generation, setGeneration] = useState<Gen>(gene);
  const [xpage, setXpage] = useState(1);
  const countCard = 24;

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
    const obj = Generations.find((item) => item.name === e) || gene;
    //console.log(obj);
    setGeneration(obj);
    setXpage(1);
  };

  const filterPokemons =
    search?.length > 2
      ? globalPokemon?.filter((pokemon) => pokemon?.name?.includes(search))
      : arrayPokemon;

  return (
    <div className="lg:h-[600px] w-[1200px] text-white flex flex-row rounded-3xl bg-black/50 backdrop-blur-2xl ">
      <section className="hidden lg:block lg:basis-1/4 h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <h1 className="text-xl font-semibold">Types</h1>
        <h1 className="text-sm">All Pokemon</h1>
        <Types />
      </section>

      <section className="w-full lg:basis-3/4">
        <div className="p-5">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-xl font-semibold Xmb-5">Pokedex </h1>
            <Link href={`/`} className="bg-white/30 rounded-lg p-2">
              <AiOutlineClose />
            </Link>
          </div>

          <div id="up" className="flex flex-row gap-4 py-5">
            <select
              onChange={(e) => {
                obtenerGeneracion(e.target.value);
              }}
              defaultValue={generation?.name}
              name=""
              id=""
              className="w-full bg-gray-800/50 rounded-full p-2 px-6 border border-gray-500/50"
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
            <span className="hidden pl-3 pr-1">
              {"G-"}
              {generation?.alias.substr(11)}
            </span>
            <span className="pl-2 text-gray-400 text-sm">Total </span>
            <span className="flex flex-row items-center border border-gray-500 rounded-full px-4 mx-1">
              {generation?.count}
            </span>
            <span className="text-gray-400 pl-5 text-sm">Range</span>

            <h1 className="flex flex-row items-center border border-gray-500 rounded-full px-4 mx-1">
              {Number(generation?.initial) + (xpage - 1) * countCard}
              &nbsp; <TbPokeball /> &nbsp;
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pokedex;
