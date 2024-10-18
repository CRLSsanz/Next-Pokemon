import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_POKEMON, URL_SPECIES } from "../api/apiRest";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { TfiArrowsCorner } from "react-icons/tfi";
import { BackgroundColor, TypesColor } from "./Colors";
import Icons from "./Icons";

const Pok: any = [];

const MiniCard = ({ data }: any) => {
  const [pokemon, setPokemon] = useState(Pok); // id, nombre, foto, altura, peso, habilidades(Stats)
  const [especie, setEspecie] = useState(Pok); //
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    setLoading1(false);
    const dataPokemon = async () => {
      let url_id = data?.url?.split("/");
      if (typeof data?.name !== "undefined") {
        const api = await axios.get(`${URL_POKEMON}/${url_id[6]}`);
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
  }, []);

  const bgColor = BackgroundColor.find(
    ({ name }) => name === especie?.color?.name
  );

  const resultColorType = (type: any) => {
    const item = TypesColor.find(({ name }) => name === type);
    //console.log(item?.color);
    return item?.colorBg;
  };

  const gene = especie?.generation?.url?.split("/");

  return (
    <div className="flex flex-col justify-center pokemons-center mb-5 Xbg-red-400 ">
      <div
        className={`relative w-full bg-gradient-to-t from-[#040b1d11] ${bgColor?.color} rounded-xl border border-gray-500/30`}
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
          <h1 className="capitalize font-semibold mb-2">{pokemon.name}</h1>

          <div className="flex flex-row gap-2">
            {pokemon?.types?.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className={`p-1.5 rounded-full ${resultColorType(
                    item.type.name
                  )}`}
                >
                  {Icons(item.type.name)}
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-4 right-2 font-bold text-lg ">
          G.{gene ? gene[6] : null}
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Link
            href={`/${pokemon?.name?.replaceAll(" ", "-").toLowerCase()}#view`}
            className="text-sm bg-white/30 rounded-lg p-1 active:animate-ping rotate-90"
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
