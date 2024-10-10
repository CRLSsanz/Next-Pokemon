import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_POKEMON, URL_SPECIES } from "../api/apiRest";
import { ImFire } from "react-icons/im";
import {
  FaCircleNotch,
  FaDragon,
  FaFistRaised,
  FaLeaf,
  FaRegHeart,
  FaSkull,
  FaStar,
} from "react-icons/fa";
import { MdOutlineSevereCold, MdTerrain, MdWaterDrop } from "react-icons/md";
import { GiAlienFire, GiFluffyWing, GiHexagonalNut } from "react-icons/gi";
import { IoIosBug } from "react-icons/io";
import { PiSpiralFill } from "react-icons/pi";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaHillRockslide } from "react-icons/fa6";
import { BiSolidGhost } from "react-icons/bi";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import Link from "next/link";
import { TfiArrowsCorner } from "react-icons/tfi";

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
  { name: "bug", color: "bg-red-500", icon: "<FaLeaf />" },
  { name: "dragon", color: "bg-gray-800", icon: "<FaLeaf />" },
  { name: "electric", color: "bg-yellow-500", icon: "<FaLeaf />" },
  { name: "fighting", color: "bg-red-700", icon: "<FaLeaf />" },
  { name: "fairy", color: "bg-pink-500", icon: "<FaFire />" },
  { name: "fire", color: "bg-orange-500", icon: "<FaFire />" },
  { name: "flying", color: "bg-sky-400", icon: "<FaLeaf />" },
  { name: "ghost", color: "bg-purple-900", icon: "FaLeaf" },
  { name: "grass", color: "bg-green-600", icon: "<FaLeaf />" },
  { name: "ground", color: "bg-yellow-900", icon: "<FaLeaf />" },
  { name: "ice", color: "bg-cyan-500", icon: "<FaLeaf />" },
  { name: "normal", color: "bg-neutral-600", icon: "<FaLeaf />" },
  { name: "poison", color: "bg-purple-500", icon: "FaLeaf" },
  { name: "psychic", color: "bg-purple-500", icon: "FaLeaf" },
  { name: "rock", color: "bg-stone-700", icon: "<FaLeaf />" },
  { name: "steel", color: "bg-zinc-500", icon: "<FaLeaf />" },
  { name: "water", color: "bg-blue-600", icon: "<FaLeaf />" },
];

const Pok: any = [];

const MiniCard = ({ data }: any) => {
  const [pokemon, setPokemon] = useState(Pok); // id, nombre, foto, altura, peso, habilidades(Stats)
  const [especie, setEspecie] = useState(Pok); //
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
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
    const dataEspecie = async () => {
      let url_id = data?.url?.split("/"); // confierte a un array separando por el /
      if (typeof url_id !== "undefined") {
        const api = await axios.get(`${URL_SPECIES}/${url_id[6]}`);
        setEspecie(api.data);
      }
    };

    dataEspecie();
  }, [data]);

  const bgColor = BackgroundColor.find(
    ({ name }) => name === especie?.color?.name
  );

  const resultColorType = (type: any) => {
    const item = TypesColor.find(({ name }) => name === type);
    //console.log(item?.color);
    return item?.color;
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
    <div className="flex flex-col justify-center pokemons-center mb-5 Xbg-red-400 ">
      <div
        className={`relative w-full bg-gradient-to-b from-[#040b1d] ${bgColor?.color} rounded-3xl border border-gray-500/50`}
      >
        <div className="pr-10 ">
          {/** efecto de imagen minuto 107 */}
          <img
            className="w-full Xz-20 -mt-5 -ml-2 hover:scale-110"
            src={pokemon?.sprites?.other["official-artwork"]?.front_default}
            alt=""
          />
        </div>

        <div className="pb-4 px-4">
          <h1 className="capitalize font-semibold mb-2">
            {pokemon.name}
          </h1>

          <div className="flex flex-row gap-2">
            {pokemon?.types?.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className={`p-1.5 rounded-full ${resultColorType(
                    item.type.name
                  )}`}
                >
                  {resultIcon(item.type.name)}
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Link
            href={`/${data?.name.replaceAll(" ", "-").toLowerCase()}#view`}
            className="text-sm bg-gray-500/30 rounded-full p-1 active:animate-ping rotate-90"
          >
            <TfiArrowsCorner />
          </Link>
          <div className="hidden text-sm text-gray-200/50 bg-gray-500/50 rounded-full p-1 active:animate-ping">
            <FaRegHeart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCard;
