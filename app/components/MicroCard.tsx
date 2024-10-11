import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_POKEMON } from "../api/apiRest";
import { BsArrowsAngleExpand } from "react-icons/bs";
import Link from "next/link";
import { MdCatchingPokemon } from "react-icons/md";
import { TbPokeball } from "react-icons/tb";
import { CgPokemon } from "react-icons/cg";

const Pok: any = [];

const MicroCard = ({ data }: any) => {
  const [pokemon, setPokemon] = useState(Pok); // id, nombre, foto, altura, peso, habilidades(Stats)
  const [show, setShow] = useState(true);
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
    if (show === true) {
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [show]);

  return (
    <div className="relative select-none flex flex-col items-center justify-center Xbg-white/5 mb-5">
      <div className="z-20 px-2">
        <img
          onClick={() => setShow(true)}
          className=" cursor-pointer w-full hover:scale-110"
          src={pokemon?.sprites?.other["official-artwork"]?.front_default}
          alt=""
        />
      </div>
      <div
        className={`z-0 w-full flex flex-col xbg-black/30 bg-gray-800/50  -mt-6 rounded-md transform transition-all duration-300 ${
          show
            ? " h-[70px] p-2 Xborder Xborder-gray-500/50 "
            : " h-0 text-transparent "
        } `}
      >
        <div className="w-full pt-3">
          <div className="flex flex-row justify-center items-center">
            <TbPokeball /> <span className="pl-1 -mt-0.5"> {pokemon.id}</span>
          </div>
        </div>
        <h1 className="text-center capitalize whitespace-nowrap -mt-1 ">
          {pokemon.name}
        </h1>
      </div>
      <Link
        href={`/${data?.name.replaceAll(" ", "-").toLowerCase()}#view`}
        className={`absolute top-0 right-0 z-50 bg-gray-800/50 border border-gray-500/50 rounded-md p-2 ${
          show ? " block " : " hidden "
        } `}
      >
        <BsArrowsAngleExpand />
      </Link>
    </div>
  );
};

export default MicroCard;
