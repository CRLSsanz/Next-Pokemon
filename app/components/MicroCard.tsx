import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_POKEMON, URL_SPECIES } from "../api/apiRest";
import { BsArrowsAngleExpand } from "react-icons/bs";
import Link from "next/link";
import { MdCatchingPokemon } from "react-icons/md";
import { TbPokeball } from "react-icons/tb";
import { CgPokemon } from "react-icons/cg";
import { BackgroundColor } from "./Colors";

const Pok: any = [];

const MicroCard = ({ data }: any) => {
  const [pokemon, setPokemon] = useState(Pok); // id, nombre, foto, altura, peso, habilidades(Stats)
  const [especie, setEspecie] = useState(Pok); // 
  
  const [show, setShow] = useState(false);
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
      }, 6000);
    }
  }, [show]);

  useEffect(() => {
    const dataEspecie = async () => {
      let url_id = data?.url?.split("/"); // confierte a un array separando por el /
      if (typeof url_id !== "undefined") {
        const api = await axios.get(`${URL_SPECIES}/${data.name}`);
        setEspecie(api.data);
      }
    };

    dataEspecie();
  }, [data]);

  const bgColor = BackgroundColor.find(
    ({ name }) => name === especie?.color?.name
  );

  return (
    <div className="relative select-none flex flex-col items-center justify-around Xbg-white/5 Xmb-5">
      <div className="z-20 px-2">
        <img
          onClick={() => setShow(true)}
          className=" cursor-pointer w-full hover:scale-110 pt-5"
          src={pokemon?.sprites?.other["official-artwork"]?.front_default }//front_default
          alt=""
        />
      </div>
      <div
        className={`z-0 w-full flex flex-col xbg-black/30 bg-gradient-to-b from-white/0 ${bgColor?.color}  -mt-6 rounded-md transform transition-all duration-300 ${
          show
            ? " h-20 p-2 Xborder Xborder-gray-500/50 "
            : " h-0 text-transparent mb-5"
        } `}
      >
        <div className="w-full pt-6">
          <div className="flex flex-row justify-center items-center font-semibold">
            <TbPokeball /> <span className="pl-1 -mt-0.5"> {pokemon.id}</span>
          </div>
        </div>
        <h1 className="text-center text-sm capitalize whitespace-nowrap -mt-1 ">
          {pokemon.name}
        </h1>
      </div>
      <Link
        href={`/${data?.name.replaceAll(" ", "-").toLowerCase()}#view`}
        className={`absolute top-0 right-0 z-50 bg-white/20 border border-gray-500/50 rounded-md p-2 ${
          show ? " block " : " hidden "
        } `}
      >
        <BsArrowsAngleExpand />
      </Link>
    </div>
  );
};

export default MicroCard;
