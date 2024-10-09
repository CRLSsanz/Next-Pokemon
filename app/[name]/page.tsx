"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { BiSolidGhost } from "react-icons/bi";
import {
  FaCircleNotch,
  FaDragon,
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

const page = ({ params }: any) => {
  let name = params.name.replaceAll("-", " ");
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
    <div className="w-full min-h-screen bg-black text-white p-10">
      <div
        className={` w-full bg-gradient-to-b from-[#040b1d] ${bgColor?.color} rounded-3xl border border-gray-500/50`}
      >
        <section>
          <div className="flex -mx-5 justify-center">
            {/** efecto de imagen minuto 107 */}
            <img
              className="w-full Xz-00 hover:scale-110"
              src={pokemon?.sprites?.other["official-artwork"]?.front_default}
              alt=""
            />
          </div>
        </section>

        <section className="text-center mb-2">
          <h1 className="text-gray-500">#00{pokemon.id}</h1>
          <h1 className="capitalize text-3xl">{pokemon.name}</h1>
          <h1 className="text-gray-500 text-sm capitalize">
            {especie?.habitat?.name} Pokemon
          </h1>
        </section>

        <section>
          <div className="flex flex-row justify-center gap-2">
            {pokemon?.types?.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className={`w-28 flex flex-row justify-center rounded-md border ${resultColorBorder(
                    item.type.name
                  )} py-1.5 mb-4 gap-2 ${resultColorText(item.type.name)} `}
                >
                  {resultIcon(item.type.name)}
                  <h1 className=" capitalize text-sm text-center font-semibold">
                    {item.type.name}
                  </h1>
                </div>
              );
            })}
          </div>

          <div className="flex flex-row text-white text-center mb-5">
            <div className="w-full">
              <h1 className="text-2xl font-bold">
                {(Number(pokemon.height) * 0.1).toFixed(1)} M
              </h1>
              <div className="flex flex-row justify-center gap-x-1">
                <CiRuler />
                <h1 className="text-sm"> Altura</h1>
              </div>
            </div>
            <div className="w-full">
              <h1 className="text-2xl font-bold">{pokemon.weight} KG</h1>
              <div className="flex flex-row justify-center gap-1">
                <CiDumbbell />
                <h1 className="text-sm"> Peso</h1>
              </div>
            </div>
          </div>
        </section>

        <section className=" px-5 mb-5">
          <div className="w-full px-5 py-2 rounded-lg bg-black/20">
            {pokemon?.stats?.map((item: any, index: any) => {
              return (
                <div key={index} className="mb-2">
                  <div className=" w-full flex flex-row justify-between">
                    <h1 className="capitalize">{item.stat.name}</h1>
                    <h1>{item.base_stat}</h1>
                  </div>
                  <div className="flex items-start justify-start">
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

        <h1 className="h-28"></h1>
      </div>

      <section className="p-5 -mt-28">
        <div className="flex flex-row px-5 mb-2">
          <div className="w-32 bg-gray-700/20 rounded-lg ">
            <div className="flex justify-center px-5">
              <img
                className="w-full -mt-5 hover:scale-110"
                src={pokemon?.sprites?.other["official-artwork"]?.front_default}
                alt=""
              />
            </div>
          </div>
          <div className="pl-5">
            <h1 className="text-sm text-gray-500">#001</h1>
            <h1 className="font-semibold">Charmileon</h1>
            <h1 className="text-sm px-5 py-1 rounded-md border border-orange-500 text-orange-500 shadow-2xl shadow-orange-500">Fire</h1>
          </div>
        </div>

        <div className="ml-5 w-16 h-16 border-r border-gray-500/30 mb-5"> </div>

        <div className="flex flex-row px-5">
          <div className="w-32 bg-gray-500/10 rounded-lg ">
            <div className="flex justify-center px-5">
              <img
                className="w-full -mt-5 hover:scale-110"
                src={pokemon?.sprites?.other["official-artwork"]?.front_default}
                alt=""
              />
            </div>
          </div>
          <div className="pl-5">
            <h1 className="text-gray-500">#002</h1>
            <h1 className="font-semibold">Charizar</h1>
            <div className="bg-transparent text-sm px-5 py-1 rounded-md border border-orange-500 text-orange-500 shadow-2xl shadow-orange-500">Fire</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
