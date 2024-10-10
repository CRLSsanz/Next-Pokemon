import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_EVOLUTION, URL_POKEMON } from "../api/apiRest";
import Link from "next/link";

const Evo: any = [];

const Evolution = ({ poke }: any) => {
  const [evoluciones, setEvoluciones] = useState(Evo);

  useEffect(() => {
    async function getPokemonImagen(name: string) {
      const response = await axios.get(`${URL_POKEMON}/${name}`);
      return response.data.sprites?.other["official-artwork"]?.front_default;
    }

    if (poke) {
      const obtenerEvoluciones = async () => {
        const arrayEvoluciones = [];
        const url_2 = poke?.evolution_chain?.url?.split("/");
        if (typeof url_2 !== "undefined") {
          const api = await axios.get(`${URL_EVOLUTION}/${url_2[6]}`);
          const img1 = await getPokemonImagen(api?.data?.chain?.species?.name);
          arrayEvoluciones.push({
            img: img1,
            name: api?.data?.chain?.species?.name,
          });

          if (api?.data?.chain?.evolves_to?.length !== 0) {
            const DATA2 = api?.data?.chain?.evolves_to[0]?.species;
            const img2 = await getPokemonImagen(DATA2?.name);
            arrayEvoluciones.push({
              img: img2,
              name: DATA2?.name,
            });

            if (api?.data?.chain?.evolves_to[0]?.evolves_to?.length !== 0) {
              const DATA3 =
                api?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species;
              const img3 = await getPokemonImagen(DATA3?.name);
              arrayEvoluciones.push({
                img: img3,
                name: DATA3?.name,
              });
            }
          }
        }
        //console.log(arrayEvoluciones);
        setEvoluciones(arrayEvoluciones);
      };
      obtenerEvoluciones();
    }
  }, [poke]);

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {evoluciones?.map((item: any, index: any) => (
        <div key={index}>
          <div className="flex flex-row items-center lg:flex-col gap-x-3">
            <div className="w-32 lg:w-full bg-black/40 rounded-xl">
              <div className="px-5 pb-2 flex">
                <Link
                  href={`/${item.name.replaceAll(" ", "-").toLowerCase()}#view`}
                >
                  <img
                    src={item.img}
                    alt="Image"
                    className=" w-20 -mt-5 Xbg-teal-400 hover:scale-105"
                  />
                </Link>
              </div>
            </div>
            <h1 className="text-center capitalize text-sm font-semibold">
              {item.name} 
            </h1>
          </div>

          {index !== 2 ? (
            <div className="lg:hidden ml-5 w-12 h-10 border-r border-gray-300/50">
              {" "}
            </div>
          ) : (
            <h1 className="hidden"> </h1>
          )}
        </div>
      ))}
    </div>
  );
};

export default Evolution;
