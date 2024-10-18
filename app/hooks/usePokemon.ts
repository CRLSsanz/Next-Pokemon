import axios from "axios";
import { useEffect, useState } from "react";
import { URL_POKEMON } from "../api/apiRest";
import { IPokemon } from "../interfaces/interfaces";

const Pok: any = {};

const usePokemon = (url?: string, id?: string) => {
  const [pokemon, setPokemon] = useState(Pok);
//console.log("url:" + url +" // id: "+ id)
  const getPokemon = async () => {
    if (url) {
      //let url_id = url.split("/");
      //console.log(url)
      const url_id=url?.replace(`https://pokeapi.co/api/v2/pokemon-species/`, `${URL_POKEMON}/`)
      const api = await axios.get(url_id); //`${URL_POKEMON}/${url_id[6]}`);
      setPokemon(api.data);
    } else if (id) {
      const api = await axios.get(`${id}`);
      setPokemon(api.data);
    }
        
  };

  useEffect(() => {
    //console.log(pokemon)
    getPokemon();
  }, []);

  return { pokemon};
};

export default usePokemon;
