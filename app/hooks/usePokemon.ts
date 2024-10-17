import axios from "axios";
import { useEffect, useState } from "react";
import { URL_POKEMON } from "../api/apiRest";
import { IPokemon } from "../interfaces/interfaces";

const Pok: any = {};

const usePokemon = (url?: string, id?: string) => {
  const [pokemon, setPokemon] = useState(Pok);

  const dataPokemon = async () => {
    if (url) {
      //let url_id = url.split("/");
      const api = await axios.get(url); //`${URL_POKEMON}/${url_id[6]}`);
      setPokemon(api.data);
    } else if (id) {
      const api = await axios.get(`${URL_POKEMON}/${id}`);
      setPokemon(api.data);
    }    
  };

  useEffect(() => {
    dataPokemon();
  }, []);

  return { pokemon };
};

export default usePokemon;
