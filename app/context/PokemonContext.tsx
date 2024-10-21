"use client";

import { createContext, useEffect, useState } from "react";
import { IPokeGeneration, PokemonType } from "../interfaces/types";
import axios from "axios";
import { URL_GENERATION, URL_POKEMON, URL_TYPE } from "../api/apiRest";
import { IPokemonByType } from "../interfaces/interfaces";

interface ContextProps {
  pokemonsFiltered: string[] | null;

  types: PokemonType[];
  filterSelected: PokemonType;
  changeTypeSelected: (type: PokemonType) => void;

  generations: IPokeGeneration[] | null;
  generationSelected: IPokeGeneration;
  generationChange: (gene: IPokeGeneration) => void;
}

export const PokemonContext = createContext<ContextProps>({} as ContextProps);

const PokemonProvider = ({ children }: any) => {
  const allPokemonUrl = `${URL_POKEMON}/?offset=20&limit=10}`;

  const defaultState: PokemonType = {
    name: "All",
    url: allPokemonUrl,
  };

  const defaultGeneration: IPokeGeneration = {
    name: "generation-ix",
    url: `${URL_GENERATION}/9`,
  };

  const [types, setTypes] = useState([defaultState]);
  const [filterSelected, setFilterSelected] = useState(defaultState);

  const [allPokemons, setAllPokemons] = useState(null);
  const [pokemonsFiltered, setPokemonsFiltered] = useState(null);

  const [generations, setGenerations] = useState(null);
  const [generationSelected, setGenerationSelected] =
    useState(defaultGeneration);

  const generationChange = async (gene: IPokeGeneration) => {
    setPokemonsFiltered(null);
    setGenerationSelected(gene);
    //const url_id = gene?.url?.split("/");

    const { data } = await axios.get(gene?.url!); //`${URL_POKEMON}/${url_id![6]}`);
    let pokemons = data?.pokemon_species?.map((pokemon: any) => pokemon.url.replace(`https://pokeapi.co/api/v2/pokemon-species/`, `${URL_POKEMON}/`));
    
    //console.log(pokemons);
    setPokemonsFiltered(pokemons);
  };

  const getGenerations = async () => {
    const { data } = await axios.get(URL_GENERATION);
    setGenerations(data?.results);
  };

  const changeTypeSelected = async (type: PokemonType) => {
    setPokemonsFiltered(null);
    setFilterSelected(type);
    
    const { data } = await axios.get(type?.url!);
    let pokemons = data?.pokemon?.map(
      ({ pokemon }: IPokemonByType) => pokemon.url
    );

    type.name !== "All"
      ? setPokemonsFiltered(pokemons)
      : setPokemonsFiltered(allPokemons);
  };

  const getTypes = async () => {
    const api = await axios.get(URL_TYPE);
    setTypes([...types, ...api.data?.results]);
  };

  const getPokemons = async () => {
    const api = await axios.get(allPokemonUrl);
    let pokemons = api.data?.results?.map((pokemon: any) => pokemon.url);
    setAllPokemons(pokemons);
    setPokemonsFiltered(pokemons);
  };

  useEffect(() => {
    getGenerations();
    getTypes();
    getPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemonsFiltered,
        types,
        filterSelected,
        changeTypeSelected,
        generations,
        generationSelected,
        generationChange,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
