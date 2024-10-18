import React, { useContext, useEffect, useState } from "react";
import { PokemonListType } from "../interfaces/interfaces";
import { PokemonContext } from "../context/PokemonContext";
import { URL_GENERATION } from "../api/apiRest";
import axios from "axios";

const Pok: any = {};

interface Props {
  url: string;
}

const usePagination = () => {
  const {
    generationSelected: { url: URL_GENE },
  } = useContext(PokemonContext);
  //console.log("url: "+URL_GENE);

  const [pokemons, setPokemons] = useState(Pok);
  const [generacionActual, setGeneracionActual] = useState("");

  const [nextUrl, setNextUrl] = useState<string | null>(`${URL_GENE}`);
  const [xpage, setXpage] = useState(1);
  const countCard = 24;
  //console.log("nexturl: "+nextUrl);

  useEffect(() => {
    getPokeByGeneration();
    //setPokemons(pokemons.slice(0, pokemons.length));
  }, [URL_GENE]);

  const getPokeByGeneration = async () => {
    //if (pokemons.length != null) setPokemons(pokemons.slice(0, pokemons.length));
    setPokemons([]);
    const api = await axios.get(`${URL_GENE}`);
    if (api?.data?.pokemon_species) {
      // PAGINACION
      let limit = countCard;
      const xp = 0;
      let total = api.data.pokemon_species.length;
      if (total - xp < limit) limit = total;
      else {
        limit = countCard;
      }
      const array = api.data.pokemon_species.sort((a: any, b: any) => {
        const au = a.url.split("/");
        const bu = b.url.split("/");
        if (Number(au[6]) > Number(bu[6])) {
          return 1;
        }
        if (Number(au[6]) < Number(bu[6])) {
          return -1;
        }
        return 0;
      });

      const listPokemon = array.slice(xp, limit).map((item: any) => item.url);
      setPokemons(listPokemon);

      const url = `${URL_GENE}/?offset=${xp}&limit=${limit}`;
      setGeneracionActual(URL_GENE!);

      if (total === limit) {
        setNextUrl(null);
      } else {
        setXpage(2);
        setNextUrl(url);
      }
      //console.log(xpage)
    }
    //}
  };

  const getPokemons = async () => {
    if (nextUrl) {
      //console.log("YES: getPoke - cargar mas : " + nextUrl);
      const api = await axios.get(`${nextUrl}`);

      if (api.data.pokemon_species && xpage != null) {
        // PAGINACION
        let limit = countCard;
        const xp = (xpage - 1) * countCard;
        let total = api.data.pokemon_species.length;
        if (total - xp < limit) limit = total;
        else {
          limit = xpage * countCard;
        }
        const array = api.data.pokemon_species.sort((a: any, b: any) => {
          const au = a.url.split("/");
          const bu = b.url.split("/");
          if (Number(au[6]) > Number(bu[6])) {
            return 1;
          }
          if (Number(au[6]) < Number(bu[6])) {
            return -1;
          }
          return 0;
        });

        const listPokemon = array.slice(xp, limit).map((item: any) => item.url);
        setPokemons([...pokemons, ...listPokemon]);

        const url = `${URL_GENE}/?offset=${xp}&limit=${limit}`;
        //console.log(url);
        setXpage(xpage + 1);
        setGeneracionActual(URL_GENE!);

        if (total === limit) {
          Number;
          setNextUrl(null);
        } else {
          setNextUrl(url);
        }
      }
    }
  };

  return { pokemons, getNextUrl: getPokemons, morePokemons: !!nextUrl };
};

export default usePagination;
