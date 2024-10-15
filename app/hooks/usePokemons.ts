import axios from "axios";
import { useEffect, useState } from "react";
import { URL_GENERATION, URL_IMAGE, URL_POKEMON } from "../api/apiRest";
import { IPokemons, IResults, PokemonListType } from "../interfaces/interfaces";

const usePokemons = (id: number = 7) => {
  const [pokemons, setPokemons] = useState<PokemonListType[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    `${URL_GENERATION}/${id}/?offset=0&limit=20`
  );
  const [xpage, setXpage] = useState(1);
  const countCard = 24;

  useEffect(() => {
    getPokemons();
  }, []);

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

  const getPokemons = async () => {
    if (nextUrl) {
      const api = await axios.get(`${nextUrl}`);

      if (api.data.pokemon_species) {
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
        //const array = apiPoke.data.pokemon_species.slice(xp, limit);
        //setArrayPokemon(array.slice(xp, limit));

        const listPokemon = array
          .slice(xp, limit)
          .map((item: any) => pokemonToList(item));
        setPokemons([...pokemons, ...listPokemon]);

        const url = `${URL_GENERATION}/${id}/?offset=${xp}&limit=${limit}`;
        console.log(url);
        setXpage(xpage + 1);

        if (total === limit) {
          setNextUrl(null);
        } else {
          setNextUrl(url);
        }
      }
    }
  };

  return { pokemons, getNextUrl: getPokemons, morePokemons: !!nextUrl };
};

export default usePokemons;
