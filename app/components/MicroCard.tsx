import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_POKEMON, URL_SPECIES } from "../api/apiRest";
import { BsArrowsAngleExpand } from "react-icons/bs";
import Link from "next/link";
import { MdCatchingPokemon } from "react-icons/md";
import { TbPokeball } from "react-icons/tb";
import { CgPokemon } from "react-icons/cg";
import { BackgroundColor } from "./Colors";
import { PokemonListType } from "../interfaces/interfaces";
import usePokemon from "../hooks/usePokemon";

const Pok: any = [];

type PokemonType = {
  pokemon: PokemonListType;
};
interface Props {
  url: string;
}

const MicroCard  =({ url }: Props) => {
  const { pokemon } = usePokemon(url);

  const [especie, setEspecie] = useState(Pok); //

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show === true) {
      setTimeout(() => {
        setShow(false);
      }, 6000);
    }
  }, [show]);

  useEffect(() => {
    setLoading(false);
    const dataEspecie = async () => {
      //const api = await axios.get(`${URL_SPECIES}/${pokemon.}`);
      //setEspecie(api.data);
    };

    dataEspecie();
    setLoading(true);
  }, []);

  const bgColor = BackgroundColor.find(
    ({ name }) => name === especie?.color?.name
  );

  if (loading !== true)
    return (
      <div className="w-full h-12 flex items-center justify-center">
        <span className=" ">
          {" "}
          <MdCatchingPokemon />{" "}
        </span>
      </div>
    );

  return (
    <div className="relative select-none flex flex-col items-center justify-around Xbg-white/5 Xmb-5">
      <div className="z-20 px-2">
        <img
          onClick={() => setShow(true)}
          className=" cursor-pointer w-full hover:scale-110 pt-5"
          src={pokemon?.sprites?.other["showdown"]?.front_default || pokemon?.sprites?.other["official-artwork"]?.front_default} //  official-artwork/front_default
          //src={pokemon.image}
          alt=""
        />
      </div>
      <div
        className={`z-0 w-full flex flex-col xbg-black/30 bg-gradient-to-b from-white/0 ${
          bgColor?.color
        }  -mt-6 rounded-md transform transition-all duration-300 ${
          show
            ? " h-20 p-2 Xborder Xborder-gray-500/50 "
            : " h-0 text-transparent mb-5"
        } `}
      >
        <div className="w-full pt-6">
          <div className="flex flex-row justify-center items-center font-semibold">
            <TbPokeball />{" "}
            <span className="pl-1 -mt-0.5"> {pokemon.id }</span>
          </div>
        </div>
        <h1 className="text-center text-sm capitalize whitespace-nowrap -mt-1 ">
          {pokemon.name}
        </h1>
      </div>
      <Link
        href={`/${pokemon?.name?.replaceAll(" ", "-").toLowerCase()}#view`}
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
