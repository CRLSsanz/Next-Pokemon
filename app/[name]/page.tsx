"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosBug } from "react-icons/io";
import { URL_POKEMON, URL_SPECIES } from "../api/apiRest";
import { CiRuler } from "react-icons/ci";
import Evolution from "../components/Evolution";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { BackgroundColor, TypesColor } from "../components/Colors";
import Icons from "../components/Icons";
import Types from "../components/Types";
import { RiHomeLine, RiWeightLine } from "react-icons/ri";
import { CgRuler } from "react-icons/cg";

const Pok: any = [];

const Pokemon = ({ params }: any) => {
  const name = params.name.replaceAll("-", "-");
  //console.log(name);
  //let name2 = name.replace(/\b[a-z]/g, (c: any) => c.toUpperCase());
  //console.log(name2);
  const [pokemon, setPokemon] = useState(Pok); // id, nombre, foto, altura, peso, habilidades(Stats)
  const [especie, setEspecie] = useState(Pok); //
  const [info, setInfo] = useState(""); //
  const [loading1, setLoading1] = useState(false);

  //especie?.flavor_text_entries[26]?.flavor_text?.toLowerCase()

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
      setInfo(api?.data?.flavor_text_entries[26]?.flavor_text);
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

  return (
    <div className="relative lg:h-[600px] w-full lg:w-[1200px] text-white flex flex-col lg:flex-row rounded-3xl Xbg-black/20 ">
      <section className="hidden lg:block lg:basis-1/4 h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <h1 className="text-xl font-semibold">Types</h1>
        <h1 className="text-sm">All Pokemon</h1>

        <Types />
      </section>

      <section
        className={`Xrelative w-full lg:basis-3/4 rounded-3xl lg:rounded-l-none lg:rounded-r-3xl backdrop-blur-2xl bg-gradient-to-br from-[#040b1d33] ${bgColor?.color} text-white lg:pl-10`}
      >
        <div className="flex flex-col lg:flex-row-reverse">
          {/** IMAGEN - DERECHA */}
          <section className="basis-1/2">
            <div className="flex px-10 lg:px-0 lg:-mr-10 -mt-10 lg:-mt-10 justify-center">
              <img
                className="w-full Xz-00 hover:scale-110"
                src={pokemon?.sprites?.other["official-artwork"]?.front_default}
                alt=""
              />
            </div>
          </section>
          {/** DETALLE */}
          <section className={`lg:relative basis-1/2 lg:pt-5 lg:pr-10 `}>
            {/** NOMBRE - INFO */}
            <section className="text-center mb-5 px-5 lg:px-0">
              <div className="lg:absolute top-7 left-0 w-full flex flex-row justify-between  lg:pr-10 ">
                <div className="flex flex-row gap-2">
                  <Link href={`/`} className="bg-white/30 rounded-lg p-2">
                    <IoIosArrowBack />
                  </Link>
                  <Link href={`/`} className="bg-white/30 rounded-lg p-2">
                    <FiSearch />
                  </Link>
                </div>
                <div className=" w-20 rounded-lg bg-gradient-to-br from-red-700 to-red-500 shadow-2xl shadow-red-500 flex flex-row items-center justify-evenly p-1 gap-1">
                  <img
                    src="https://www.freeiconspng.com/uploads/pokeball-icon-4.png"
                    width="20"
                    alt="Pokeball"
                  />
                  <h1 className="font-semibold text-gray-900 text-sm">
                    0{pokemon.id}
                  </h1>
                </div>
              </div>

              <h1 className="capitalize tracking-wider text-3xl pt-4 mb-2 lg:pt-10 ">
                {pokemon.name}
              </h1>
              <h1 className="text-gray-300 text-sm mb-5">{info}</h1>
            </section>
            {/** TYPES - ICONS */}
            <section>
              <div className="flex flex-row justify-center gap-4">
                {pokemon?.types?.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className={`w-24 flex flex-row justify-center items-center rounded-lg border ${resultColorBorder(
                        item.type.name
                      )} py-1 text-xl mb-4 gap-2 ${resultColorText(
                        item.type.name
                      )} `}
                    >
                      {Icons(item.type.name)}
                      <h1 className=" capitalize text-sm text-center font-semibold">
                        {item.type.name}
                      </h1>
                    </div>
                  );
                })}
              </div>
              {/** TALLA PESO GENERACION */}
              <div className="w-full grid grid-cols-3 gap-y-4 text-white py-5 mb-5">
                <div className="text-center">
                  <h1 className="text-lg font-semibold">
                    {(Number(pokemon.height) * 0.1).toFixed(1)} M
                  </h1>
                  <div className="flex flex-row justify-center items-center text-gray-300 gap-1">
                    <CgRuler />
                    <h1 className="text-sm "> Height</h1>
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-lg font-semibold">{pokemon.weight} KG</h1>
                  <div className="flex flex-row justify-center items-center text-gray-300 gap-1">
                    <RiWeightLine />
                    <h1 className="text-sm"> Weight</h1>
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-lg font-semibold capitalize">
                    {especie?.habitat?.name} &nbsp;
                  </h1>
                  <div className="flex flex-row justify-center items-center text-gray-300 gap-1">
                    <RiHomeLine />
                    <h1 className="text-sm"> Habitat</h1>
                  </div>
                </div>

                <div className="text-center">
                  <h1 className="text-lg font-semibold capitalize">
                    {especie?.color?.name}
                  </h1>
                  <div className="flex flex-row justify-center items-center gap-1">
                    <span></span>
                    <h1 className="text-sm text-gray-300"> Color</h1>
                  </div>
                </div>

                <div className="text-center">
                  <h1 className="text-lg font-semibold capitalize">
                    {especie?.pal_park_encounters?.map(
                      (item: any) => item.area.namepal_park_encounters
                    )}
                    &nbsp;
                  </h1>
                  <div className="flex flex-row justify-center items-center gap-1">
                    <span></span>
                    <h1 className="text-sm text-gray-300"> Encounters</h1>
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-lg font-semibold uppercase">
                    {"G-"}
                    {especie?.generation?.name.substr(11)}
                  </h1>
                  <div className="flex flex-row justify-center items-center gap-1">
                    <span></span>
                    <h1 className="text-sm text-gray-300"> Generation</h1>
                  </div>
                </div>
              </div>
            </section>
            {/** STATS */}
            <section className="px-5 lg:px-0 mb-10">
              <h1 className="font-semibold mb-2">Statistics</h1>
              <div className="w-full px-5 lg:px-10 py-5 rounded-2xl bg-black/20">
                {pokemon?.stats?.map((item: any, index: any) => {
                  return (
                    <div key={index} className="mb-1">
                      <div className=" w-full flex flex-row items-center justify-between gap-x-6">
                        <h1 className="w-28 text-gray-300 capitalize Xlg:whitespace-nowrap">
                          {item.stat.name === "special-attack"
                            ? "sp. atk"
                            : item.stat.name === "special-defense"
                            ? "sp. def"
                            : item.stat.name}
                        </h1>
                        <h1 className="w-12 font-semibold text-end">
                          {item.base_stat}
                        </h1>
                        <progress
                          value={item.base_stat}
                          max={110}
                          style={{ color: "yellow" }}
                          className="w-full h-1.5 bg-gray-400/10 rounded-full "
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <h1 className="h-64 lg:h-0 "></h1>
          </section>
        </div>
      </section>

      <section className="z-20 lg:absolute bottom-10 right-5 p-5 -mt-72 lg:mt-0">
        <h1 className="lg:hidden font-semibold mb-5">Evolutions</h1>

        <Evolution poke={especie} />
      </section>
    </div>
  );
};

export default Pokemon;
