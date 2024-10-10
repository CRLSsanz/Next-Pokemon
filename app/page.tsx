"use client";

import { useEffect, useState } from "react";
import { URL_POKEMON } from "@/app/api/apiRest";
import Card from "./components/Card";
import {
  FaFire,
  FaLeaf,
  FaChevronLeft,
  FaChevronRight,
  FaDragon,
  FaMountain,
  FaFistRaised,
  FaCircleNotch,
  FaSkull,
} from "react-icons/fa";
import Search from "./components/Search";
import axios from "axios";
import { GiAlienFire, GiFluffyWing, GiHexagonalNut } from "react-icons/gi";
import { BiSolidGhost } from "react-icons/bi";
import { TbTopologyStar3 } from "react-icons/tb";
import { MdOutlineSevereCold, MdTerrain, MdWaterDrop } from "react-icons/md";
import { FaHillRockslide } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { PiSpiralFill } from "react-icons/pi";
import { IoIosBug } from "react-icons/io";
import MiniCard from "./components/MiniCard";
import { ImFire } from "react-icons/im";

const Pok: any = [];

type Poke = {
  name: string;
  url: string;
};

const initialState: Poke[] = [];

export default function Home() {
  const [arrayPokemon, setArrayPokemon] = useState(initialState);
  const [globalPokemon, setGlobalPokemon] = useState([Pok]);
  const [search, setSearch] = useState("");
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
  };

  const filterPokemons =
    search?.length > 0
      ? arrayPokemon?.filter((pokemon) => pokemon?.name?.includes(search))
      : arrayPokemon;

  return (
    <div className="lg:h-[600px] w-[1200px] text-white flex flex-row rounded-3xl bg-black/20 backdrop-blur-2xl ">
      <section className="hidden lg:block lg:basis-1/4 h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <h1 className="text-xl font-semibold">Types</h1>
        <h1 className="text-sm">All Pokemon</h1>

        <div className=" grid grid-cols-2 py-5 gap-4">
          <div className="flex flex-row gap-2">
            <div className="bg-orange-500 rounded-full p-1.5">
              <ImFire />
            </div>
            <h1>Fire</h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-gray-800 rounded-full p-1.5">
              <FaDragon />
            </div>
            <h1>Dragon</h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-green-500 rounded-full p-1.5">
              <FaLeaf />
            </div>
            <h1>Grass</h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-blue-600 rounded-full p-1.5">
              <MdWaterDrop />
            </div>
            <h1>Water</h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-sky-400 rounded-full p-1.5">
              <GiFluffyWing />
            </div>
            <h1>Wing</h1>
          </div>

          <div className="flex flex-row gap-2">
            <div className="bg-purple-500 rounded-full p-1.5">
              <FaSkull />
            </div>
            <h1>Poison</h1>
          </div>

          <div className="flex flex-row gap-2">
            <div className="bg-red-500 rounded-full p-1.5">
              <IoIosBug />
            </div>
            <h1>Bug</h1>
          </div>

          <div className="flex flex-row gap-2">
            <div className="bg-neutral-600 rounded-full p-1.5">
              <FaCircleNotch />
            </div>
            <h1>Normal</h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-purple-500 rounded-full p-1.5">
              <PiSpiralFill />
            </div>
            <h1>Psychic</h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-red-700 rounded-full p-1.5">
              <FaFistRaised />
            </div>
            <h1>Fighting</h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-yellow-500 rounded-full p-1.5">
              <AiFillThunderbolt />
            </div>
            <h1>Electric</h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-yellow-900 rounded-full p-1.5">
              <MdTerrain />
            </div>
            <h1>Ground</h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-stone-700 rounded-full p-1.5">
              <FaHillRockslide />
            </div>
            <h1>Rock</h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-cyan-500 rounded-full p-1.5">
              <MdOutlineSevereCold />
            </div>
            <h1>Ice</h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-pink-500 rounded-full p-1.5">
              <GiAlienFire />
            </div>
            <h1>Fairy</h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-purple-900 rounded-full p-1.5">
              <BiSolidGhost />
            </div>
            <h1>Ghost</h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-zinc-500 rounded-full p-1.5">
              <GiHexagonalNut />
            </div>
            <h1>Steel</h1>
          </div>
        </div>
      </section>

      <section className="w-full lg:basis-3/4">
        <div className="p-5">
          <h1 className="text-xl font-semibold">Good morning, Charlie </h1>
          <h1 className="text-sm mb-5">List Pokemons</h1>

          <Search obtenerSearch={obtenerSearch} />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">
            {filterPokemons?.map((items, index) => (
              <MiniCard key={index} data={items} />
            ))}
          </div>

          <div className="flex flex-row items-center justify-center gap-x-4">
            <span
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
            <span>{Math.round(globalPokemon?.length / 15)}</span>
            <span
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
}
