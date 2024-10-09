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
      const limit = 15;
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
    <div className="h-full flex flex-col items-center ">
      <section className="h-[50vh] flex-col items-center justify-center">
        <h1 className="text-3xl">Pokèdex</h1>
        <h2>Prototype</h2>
        <h2>v. 2.0</h2>
        <h2>
          based on <strong>PokedAPI</strong>.
        </h2>
        <h2>by CRLSCODE</h2>
      </section>

      <section className="w-full text-white flex justify-center">
        <div className="w-[1024px] min-h-screen bg-black [#1e2128] p-5">
          <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="md:basis-1/2">
              <h1 className="">Busqueda por tipo</h1>
              <div className="w-[300px] Xoverflow-scroll">
                <div className="w-full flex flex-row overflow-auto bg-gray-800 p-2 rounded-lg border border-gray-600 gap-2">
                  <div className="bg-orange-500 rounded-full p-1">
                    <FaFire />
                  </div>
                  <div className="bg-green-500 rounded-full p-1">
                    <FaLeaf />
                  </div>
                  <div className="bg-gray-500 rounded-full p-1">
                    <FaDragon />
                  </div>
                  <div className="bg-blue-500 rounded-full p-1">
                    <MdWaterDrop />
                  </div>
                  <div className="bg-sky-500 rounded-full p-1">
                    <GiFluffyWing />
                  </div>
                  <div className="bg-purple-500 rounded-full p-1">
                    <FaSkull />
                  </div>
                  <div className="bg-red-500 rounded-full p-1">
                    <IoIosBug />
                  </div>
                  <div className="bg-neutral-500 rounded-full p-1">
                    <FaCircleNotch />
                  </div>
                  <div className="bg-purple-500 rounded-full p-1">
                    <PiSpiralFill />
                  </div>
                  <div className="bg-red-700 rounded-full p-1">
                    <FaFistRaised />
                  </div>
                  <div className="bg-yellow-500 rounded-full p-1">
                    <AiFillThunderbolt />
                  </div>
                  <div className="bg-yellow-900 rounded-full p-1">
                    <MdTerrain />
                  </div>
                  <div className="bg-stone-700 rounded-full p-1">
                    <FaHillRockslide />
                  </div>
                  <div className="bg-cyan-500 rounded-full p-1">
                    <MdOutlineSevereCold />
                  </div>
                  <div className="bg-gray-500 rounded-full p-1">
                    <GiAlienFire />
                  </div>
                  <div className="bg-violet-700 rounded-full p-1">
                    <BiSolidGhost />
                  </div>
                  <div className="bg-zinc-500 rounded-full p-1">
                    <GiHexagonalNut />
                  </div>
                </div>
              </div>
            </div>

            <Search obtenerSearch={obtenerSearch} />
          </div>

          <div className="flex flex-row items-center justify-center gap-x-2 mb-5">
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
            <span>DE</span>
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

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {filterPokemons?.map((items, index) =>(
              <MiniCard key={index} data={items} />
            ))}
          </div>
        </div>
      </section>

      <section className="">
        <h1 className="p-5">FOOTER</h1>
      </section>
    </div>
  );
}
