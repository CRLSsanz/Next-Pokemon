import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_EVOLUTION, URL_POKEMON } from "../api/apiRest";

const Evolution = ({ poke }: any) => {
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
          /**
          let url_id = data?.url?.split("/"); // confierte a un array separando por el /
          if (typeof url_id !== "undefined") {
            const api = await axios.get(`${URL_SPECIES}/${url_id[6]}`);
            setEspecie(api.data);
          } 
        */

          arrayEvoluciones.push({
            img: img1,
            name: api?.data?.chain?.species?.name,
          });
        }

        console.log(arrayEvoluciones);
      };
      obtenerEvoluciones();
    }
 }, [poke]);

  return (
    <div className="flex flex-row gap-5">
      <div className="w-20 h-10 border ">{poke.id}</div>
      <div className="w-20 h-10 border ">{poke?.evolution_chain?.url}</div>
      <div className="w-20 h-10 border ">ima3</div>
    </div>
  );
};

export default Evolution;
