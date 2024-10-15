import axios from "axios";
import { useEffect, useState } from "react";
import { URL_GENERATION, URL_IMAGE, URL_POKEMON } from "../api/apiRest";
import { IPokemons, IResults, PokemonListType } from "../interfaces/interfaces";
import { syncBuiltinESMExports } from "module";
import next from "next";

const usePokemons = (id: string) => {
  const [pokemons, setPokemons] = useState<PokemonListType[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    `${URL_GENERATION}/${id}`
  ); //` ${URL_GENERATION}/${id}`);
  const [xpage, setXpage] = useState(1);
  const [generacionActual, setGeneracionActual] = useState(id);
  const countCard = 24;

  useEffect(() => {
    //console.log("generacionActual:" + generacionActual + " - id:" + id);
    if (generacionActual === id) {
      //console.log("igual, cargar mas");
      getPokemons();
    } else {
      //console.log("diferentes, nueva generacion"+ xpage);
      getGeneration();
    }
  }, [id]);

  const pokemonToList = (item: PokemonListType) => {
    //const pokedexNumber = item.url.replace(`${URL_POKEMON}/`, "").replace("/", "");
    const pokedexNumber = item.url.split("/");

    const listPokemon: PokemonListType = {
      name: item.name,
      url: item.url,
      image: `${URL_IMAGE}/${pokedexNumber[6]}.png`,
      pokedexNumber: pokedexNumber[6],
    };
    return listPokemon;
  };

  const getGeneration = async () => {
    //console.log("change Grneration: de" + nextUrl);
    //console.log(`a esto: + ${URL_GENERATION}/${id}`);
    //if (nextUrl) {
    setPokemons(pokemons.slice(0, pokemons.length));
    const api = await axios.get(`${URL_GENERATION}/${id}`);

    if (api.data.pokemon_species) {
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

      const listPokemon = array
        .slice(xp, limit)
        .map((item: any) => pokemonToList(item));
      setPokemons([...listPokemon]);

      const url = `${URL_GENERATION}/${id}/?offset=${xp}&limit=${limit}`;
      
      if (total === limit) {
        Number;
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

        const listPokemon = array
          .slice(xp, limit)
          .map((item: any) => pokemonToList(item));
        setPokemons([...pokemons, ...listPokemon]);

        const url = `${URL_GENERATION}/${id}/?offset=${xp}&limit=${limit}`;
        //console.log(url);
        setXpage(xpage + 1);
        setGeneracionActual(id);

        if (total === limit) {
          Number;
          setNextUrl(null);
        } else {
          setNextUrl(url);
        }
      }
    }
  };
  getPokemons;

  return { pokemons, getNextUrl: getPokemons, morePokemons: !!nextUrl };
};

export default usePokemons;
