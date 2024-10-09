import React from "react";
import { useEffect, useState } from "react";
import { URL_POKEMON, URL_SPECIES } from "@/app/api/apiRest";
import { CiRuler, CiDumbbell } from "react-icons/ci";
import {
  FaCircleNotch,
  FaLeaf,
  FaSkull,
  FaFistRaised,
  FaDragon,
} from "react-icons/fa";
import { AiOutlineThunderbolt, AiFillThunderbolt } from "react-icons/ai";
import { MdOutlineSevereCold, MdTerrain, MdWaterDrop } from "react-icons/md";
import { GiAlienFire, GiFluffyWing, GiHexagonalNut } from "react-icons/gi";
import { IoIosBug } from "react-icons/io";
import { ImFire } from "react-icons/im";
import { PiSpiralFill } from "react-icons/pi";
import axios from "axios";
import { FaHillRockslide } from "react-icons/fa6";
import { BiSolidGhost } from "react-icons/bi";
import Link from "next/link";

const Pok: any = [];
const Specie: any = {};

const ColorCard = [
  { name: "red", color: "to-[#983617]" },
  { name: "pink", color: "to-[#831843]" },
  { name: "green", color: "to-[#166638]" },
  { name: "blue", color: "to-[#1e3c8c]" },
  { name: "purple", color: "to-[#581c87]" },
  { name: "yellow", color: "to-[#c58c0b]" },
  { name: "brown", color: "to-[#412108]" },
  { name: "white", color: "to-[#8da6be]" },
  { name: "gray", color: "to-[#374151]" },
];

const Types = [
  { name: "normal", color: "bg-neutral-500", icon: "<FaLeaf />" },
  { name: "dragon", color: "bg-slate-500", icon: "<FaLeaf />" },
  { name: "steel", color: "bg-zinc-600", icon: "<FaLeaf />" },
  { name: "rock", color: "bg-stone-700", icon: "<FaLeaf />" },
  { name: "poison", color: "bg-purple-500", icon: "FaLeaf" },
  { name: "psychic", color: "bg-violet-500", icon: "FaLeaf" },
  { name: "ghost", color: "bg-violet-600", icon: "FaLeaf" },
  { name: "grass", color: "bg-green-600", icon: "<FaLeaf />" },
  { name: "bug", color: "bg-red-500", icon: "<FaLeaf />" },
  { name: "fighting", color: "bg-red-700", icon: "<FaLeaf />" },
  { name: "fire", color: "bg-orange-500", icon: "<FaFire />" },
  { name: "fairy", color: "bg-pink-500", icon: "<FaFire />" },
  { name: "flying", color: "bg-sky-500", icon: "<FaLeaf />" },
  { name: "ice", color: "bg-blue-500", icon: "<FaLeaf />" },
  { name: "water", color: "bg-indigo-500", icon: "<FaLeaf />" },
  { name: "electric", color: "bg-yellow-600", icon: "<FaLeaf />" },
  { name: "ground", color: "bg-yellow-900", icon: "<FaLeaf />" },
];

const Card = ( {data} :any) => {
  const [pokemon, setPokemon] = useState(Pok); // id, nombre, foto, altura, peso, habilidades(Stats)
  const [especie, setEspecie] = useState(Specie); //color de especie, total 9 colores
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  //console.log(pokemon);

  useEffect(() => {
    /*fetch(URL_POKEMON + "/" + pokemon.name)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setPokemon(data);
      }); */
    setLoading1(false);
    const dataPokemon = async () => {
      if (typeof data?.name !== "undefined") {
        const api = await axios.get(`${URL_POKEMON}/${data?.name}`);
        setPokemon(api.data);
      }
    };
    
    setLoading1(true);
    dataPokemon();
  }, [data]);

  useEffect(() => {
    setLoading2(false);
    const dataEspecie = async () => {
      let url_id = data?.url?.split("/"); // confierte a un array separando por el /
      if (typeof url_id !== "undefined") {
        const api = await axios.get(`${URL_SPECIES}/${url_id[6]}`);
        setEspecie(api.data);
      }
    };

    setLoading2(true);
    dataEspecie();
  }, [data]);
  //console.log(especie);

  if (loading1 === false) return <div>CARGANDO POKEMON...</div>;
  if (loading2 === false) return <div>cargando especies...</div>;

  const result = ColorCard.find(({ name }) => name === especie?.color?.name);

  const resultType = (type: any) => {
    const item = Types.find(({ name }) => name === type);
    //console.log(item?.color);
    return item?.color;
  };

  const resultTypeIcon = (type: any) => {
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
        return <MdTerrain />; //<FaMountain />
      case "rock":
        return <FaHillRockslide />;
      case "ice":
        return <MdOutlineSevereCold />; //<TbTopologyStar3 />
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
    <div className="flex flex-col justify-center pokemons-center py-5 bg-gray ">
      <div
        className={`w-full p-10 bg-gradient-to-b from-[#040b1d] ${result?.color} rounded-3xl border border-gray-600`}
      >
        <div className="flex justify-center px-5">
          {/** efecto de imagen minuto 107 */}
          <img
            className="w-full Xz-20 -mt-20 hover:scale-110"
            src={pokemon?.sprites?.other["official-artwork"]?.front_default}
            alt=""
          />
        </div>

        <h1 className="hidden text-sm font-semibold rounded-md text-purple border border-gray-300  px-1 mb-4">
          id: #{pokemon.id} color:{especie?.color?.name}
        </h1>
        <h1 className="capitalize text-3xl text-center text-white mb-5">
          {pokemon.name}
        </h1>

        <div className="flex flex-row justify-center gap-5">
          {pokemon?.types?.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className={`basis-1/2 flex flex-row justify-center rounded-md ${resultType(
                  item.type.name
                )} py-1.5 mb-4 gap-1`}
              >
                {resultTypeIcon(item.type.name)}
                <h1 className=" uppercase text-xs text-center font-semibold">
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

        <div className="flex justify-center w-3/4 mx-auto p-2 text-sm text-white bg-gray-900 rounded-lg gap-1">
          <AiOutlineThunderbolt className="text-lg" />
          <h1 className="">Detalles</h1>
          <Link
            href={`/${data?.name.replaceAll(" ", "-").toLowerCase()}#view`}
            //href={`/name`}
          >
            {data.name}
          </Link>
        </div>

        <div className="hidden w-full">
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
      </div>
    </div>
  );
};

export default Card;
