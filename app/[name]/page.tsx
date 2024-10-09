"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { BiSolidGhost } from "react-icons/bi";
import {
  FaCircleNotch,
  FaDragon,
  FaFire,
  FaFistRaised,
  FaLeaf,
  FaSkull,
} from "react-icons/fa";
import { FaHillRockslide } from "react-icons/fa6";
import { GiAlienFire, GiFluffyWing, GiHexagonalNut } from "react-icons/gi";
import { ImFire } from "react-icons/im";
import { IoIosBug } from "react-icons/io";
import { MdOutlineSevereCold, MdTerrain, MdWaterDrop } from "react-icons/md";
import { PiSpiralFill } from "react-icons/pi";
import { URL_POKEMON, URL_SPECIES } from "../api/apiRest";
import { CiDumbbell, CiRuler } from "react-icons/ci";

const BackgroundColor = [
  { name: "red", color: "to-red-500/20" },
  { name: "pink", color: "to-pink-500/20" },
  { name: "green", color: "to-green-500/20" },
  { name: "blue", color: "to-sky-500/20" },
  { name: "purple", color: "to-purple-500/20" },
  { name: "yellow", color: "to-yellow-500/20" },
  { name: "brown", color: "to-yellow-900" },
  { name: "white", color: "to-white/50" },
  { name: "gray", color: "to-gray-500/20" },
];

const TypesColor = [
  {
    name: "normal",
    colorText: "text-neutral-500",
    colorBorder: "border-neutral-500",
  },
  {
    name: "dragon",
    colorText: "text-slate-500",
    colorBorder: "border-slate-500",
  },
  { name: "steel", colorText: "text-zinc-600", colorBorder: "border-zinc-600" },
  {
    name: "rock",
    colorText: "text-stone-700",
    colorBorder: "border-stone-700",
  },
  {
    name: "poison",
    colorText: "text-purple-500",
    colorBorder: "border-purple-500",
  },
  {
    name: "psychic",
    colorText: "text-violet-500",
    colorBorder: "border-violet-500",
  },
  {
    name: "ghost",
    colorText: "text-violet-600",
    colorBorder: "border-violet-600",
  },
  {
    name: "grass",
    colorText: "text-green-600",
    colorBorder: "border-green-600",
  },
  { name: "bug", colorText: "text-red-500", colorBorder: "border-red-500" },
  {
    name: "fighting",
    colorText: "text-red-700",
    colorBorder: "border-red-700",
  },
  {
    name: "fire",
    colorText: "text-orange-500",
    colorBorder: "border-orange-500",
  },
  { name: "fairy", colorText: "text-pink-500", colorBorder: "border-pink-500" },
  { name: "flying", colorText: "text-sky-500", colorBorder: "border-sky-500" },
  { name: "ice", colorText: "text-blue-500", colorBorder: "border-blue-500" },
  {
    name: "water",
    colorText: "text-indigo-500",
    colorBorder: "border-indigo-500",
  },
  {
    name: "electric",
    colorText: "text-yellow-600",
    colorBorder: "border-yellow-600",
  },
  {
    name: "ground",
    colorText: "text-yellow-900",
    colorBorder: "border-yellow-900",
  },
];

const Pok: any = [];

const Pokemon = ({ params }: any) => {
  const name = params.name.replaceAll("-", " ");
  //console.log(name);
  //let name2 = name.replace(/\b[a-z]/g, (c: any) => c.toUpperCase());
  //console.log(name2);

  const [pokemon, setPokemon] = useState(Pok); // id, nombre, foto, altura, peso, habilidades(Stats)
  const [especie, setEspecie] = useState(Pok); //
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    setLoading1(false);
    const dataPokemon = async () => {
      const api = await axios.get(`${URL_POKEMON}/${name}`);
      setPokemon(api.data);
    };

    setLoading1(true);
    dataPokemon();
  }, []);

  useEffect(() => {
    const dataEspecie = async () => {
      const api = await axios.get(`${URL_SPECIES}/${name}`);
      setEspecie(api.data);
    };

    dataEspecie();
  }, []);

  const bgColor = BackgroundColor.find(
    ({ name }) => name === especie?.color?.name
  );

  const resultColorText = (type: any) => {
    const item = TypesColor.find(({ name }) => name === type);
    //console.log(item?.color);
    return item?.colorText;
  };

  const resultColorBorder = (type: any) => {
    const item = TypesColor.find(({ name }) => name === type);
    //console.log(item?.color);
    return item?.colorBorder;
  };

  const resultIcon = (type: any) => {
    switch (type) {
      case "fire":
        return <ImFire />;
      case "grass":
        return <FaLeaf />;
      case "water":
        return <MdWaterDrop />;
      case "flying":
        return <GiFluffyWing />;
      case "poison":
        return <FaSkull />;
      case "bug":
        return <IoIosBug />;
      case "normal":
        return <FaCircleNotch />;
      case "psychic":
        return <PiSpiralFill />;
      case "fighting":
        return <FaFistRaised />;
      case "electric":
        return <AiFillThunderbolt />;
      case "ground":
        return <MdTerrain />;
      case "rock":
        return <FaHillRockslide />;
      case "ice":
        return <MdOutlineSevereCold />;
      case "fairy":
        return <GiAlienFire />;
      case "ghost":
        return <BiSolidGhost />;
      case "steel":
        return <GiHexagonalNut />;
      case "dragon":
        return <FaDragon />;

      default:
        break;
    }
  };

  return (
    <div className="h-[600px] w-full lg:w-[1200px] m-10 lg:m-0 text-white flex flex-row rounded-3xl bg-black/20 backdrop-blur-2xl ">
      <section className="hidden lg:block lg:basis-1/4 h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <h1 className="text-xl font-semibold">Types</h1>
        <h1 className="text-sm">All Pokemon</h1>

        <div className=" grid grid-cols-2 py-5 gap-3">
          <div className="flex flex-row gap-1">
            <div className="bg-orange-500 rounded-full p-1.5">
              <FaFire />
            </div>
            <h1>Fire</h1>
          </div>
          <div className="flex flex-row gap-1">
            <div className="bg-gray-500 rounded-full p-1.5">
              <FaDragon />
            </div>
            <h1>Dragon</h1>
          </div>
          <div className="flex flex-row gap-1">
            <div className="bg-green-500 rounded-full p-1.5">
              <FaLeaf />
            </div>
            <h1>Grass</h1>
          </div>
          <div className="flex flex-row gap-1">
            <div className="bg-blue-500 rounded-full p-1.5">
              <MdWaterDrop />
            </div>
            <h1>Water</h1>
          </div>
          <div className="flex flex-row gap-1">
            <div className="bg-sky-400 rounded-full p-1.5">
              <GiFluffyWing />
            </div>
            <h1>Wing</h1>
          </div>

          <div className="flex flex-row gap-1">
            <div className="bg-purple-700 rounded-full p-1.5">
              <FaSkull />
            </div>
            <h1>Poison</h1>
          </div>

          <div className="flex flex-row gap-1">
            <div className="bg-red-500 rounded-full p-1.5">
              <IoIosBug />
            </div>
            <h1>Bug</h1>
          </div>

          <div className="flex flex-row gap-1">
            <div className="bg-neutral-500 rounded-full p-1.5">
              <FaCircleNotch />
            </div>
            <h1>Normal</h1>
          </div>
          <div className="flex flex-row gap-1">
            <div className="bg-purple-500 rounded-full p-1.5">
              <PiSpiralFill />
            </div>
            <h1>Grass</h1>
          </div>
          <div className="flex flex-row gap-1">
            <div className="bg-red-500 rounded-full p-1.5">
              <FaFistRaised />
            </div>
            <h1>Grass</h1>
          </div>
          <div className="flex flex-row gap-1">
            <div className="bg-yellow-500 rounded-full p-1.5">
              <AiFillThunderbolt />
            </div>
            <h1>Grass</h1>
          </div>
          <div className="flex flex-row gap-1">
            <div className="bg-yellow-900 rounded-full p-1.5">
              <MdTerrain />
            </div>
            <h1>Grass</h1>
          </div>
          <div className="flex flex-row gap-1">
            <div className="bg-stone-700 rounded-full p-1.5">
              <FaHillRockslide />
            </div>
            <h1>Grass</h1>
          </div>
          <div className="flex flex-row gap-1">
            <div className="bg-cyan-500 rounded-full p-1.5">
              <MdOutlineSevereCold />
            </div>
            <h1>Grass</h1>
          </div>
          <div className="flex flex-row gap-1">
            <div className="bg-gray-500 rounded-full p-1.5">
              <GiAlienFire />
            </div>
            <h1>Grass</h1>
          </div>
          <div className="flex flex-row gap-1">
            <div className="bg-violet-700 rounded-full p-1.5">
              <BiSolidGhost />
            </div>
            <h1>Grass</h1>
          </div>
          <div className="flex flex-row gap-1">
            <div className="bg-zinc-500 rounded-full p-1.5">
              <GiHexagonalNut />
            </div>
            <h1>Steel</h1>
          </div>
        </div>
      </section>

      <div
        className={`relative w-full lg:basis-3/4 rounded-r-3xl lg:bg-gradient-to-b from-[#040b1dbb] ${bgColor?.color} text-white lg:pl-10`}
      >
        <div className="flex flex-col lg:flex-row-reverse">
          <section className="basis-1/2">
            <div className="flex pl-10 lg:pl-0 lg:-mx-10 -mt-10 justify-center">
              {/** efecto de imagen minuto 107 */}
              <img
                className="w-full Xz-00 hover:scale-110"
                src={pokemon?.sprites?.other["official-artwork"]?.front_default}
                alt=""
              />
            </div>
          </section>

          <section className={` basis-1/2 lg:pt-5 lg:pr-10 `}>
            <section className="text-center mb-5">
              <div className="absolute top-5 left-5 w-16 rounded-lg text-gray-200 bg-red-700 flex flex-row items-center p-1 gap-1 mb-4">
                <img
                  src="https://www.freeiconspng.com/uploads/pokeball-icon-4.png"
                  width="20"
                  alt="Pokeball"
                />
                <h1 className="font-semibold">0{pokemon.id}</h1>
              </div>

              <h1 className="capitalize tracking-wider text-3xl mb-2">
                {pokemon.name}
              </h1>
              <h1 className="text-gray-300 text-sm capitalize">
                {especie?.habitat?.name} Pokemon
              </h1>
            </section>

            <section>
              <div className="flex flex-row justify-center gap-4">
                {pokemon?.types?.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className={`w-24 flex flex-row justify-center items-center rounded-lg border ${resultColorBorder(
                        item.type.name
                      )} py-1 text-xl mb-4 gap-2 ${resultColorText(item.type.name)} `}
                    >
                      {resultIcon(item.type.name)}
                      <h1 className=" capitalize text-sm text-center font-semibold">
                        {item.type.name}
                      </h1>
                    </div>
                  );
                })}
              </div>

              <div className="w-full flex flex-row justify-evenly text-white mb-5">
                <div className="text-center">
                  <h1 className="text-xl font-semibold">
                    {(Number(pokemon.height) * 0.1).toFixed(1)} M
                  </h1>
                  <div className="flex flex-row justify-center items-center gap-x-1">
                    <CiRuler />
                    <h1 className="text-sm"> Altura</h1>
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-xl font-semibold">{pokemon.weight} KG</h1>
                  <div className="flex flex-row justify-center items-center gap-1">
                    <CiDumbbell />
                    <h1 className="text-sm"> Peso</h1>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-5 lg:px-0 mb-5">
              <div className="w-full px-10 py-5 rounded-2xl bg-black/20">
                {pokemon?.stats?.map((item: any, index: any) => {
                  return (
                    <div key={index} className="mb-2">
                      <div className=" w-full flex flex-row items-center justify-between gap-3">
                        <h1 className="w-56 text-gray-200 capitalize">
                          {item.stat.name}
                        </h1>
                        <h1 className="w-12 font-semibold text-end">
                          {item.base_stat}
                        </h1>
                        <progress
                          value={item.base_stat}
                          max={110}
                          className="w-full h-2"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <h1 className="h-28 lg:h-0"></h1>
          </section>
        </div>

        <section className="hidden p-5 -mt-28 lg:mt-0">
          <div className="flex flex-row px-5 mb-2">
            <div className="w-32 bg-gray-700/20 rounded-lg ">
              <div className="flex justify-center px-5">
                <img
                  className="w-full -mt-5 hover:scale-110"
                  src={
                    pokemon?.sprites?.other["official-artwork"]?.front_default
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="pl-5">
              <h1 className="text-sm text-gray-500">#001</h1>
              <h1 className="font-semibold">Charmileon</h1>
              <h1 className="text-sm px-5 py-1 rounded-md border border-orange-500 text-orange-500 shadow-2xl shadow-orange-500">
                Fire
              </h1>
            </div>
          </div>

          <div className="ml-5 w-16 h-16 border-r border-gray-500/30 mb-5">
            {" "}
          </div>

          <div className="flex flex-row px-5">
            <div className="w-32 bg-gray-500/10 rounded-lg ">
              <div className="flex justify-center px-5">
                <img
                  className="w-full -mt-5 hover:scale-110"
                  src={
                    pokemon?.sprites?.other["official-artwork"]?.front_default
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="pl-5">
              <h1 className="text-gray-500">#002</h1>
              <h1 className="font-semibold">Charizar</h1>
              <div className="bg-transparent text-sm px-5 py-1 rounded-md border border-orange-500 text-orange-500 shadow-2xl shadow-orange-500">
                Fire
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pokemon;
