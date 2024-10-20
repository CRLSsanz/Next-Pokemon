"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_IMAGE, URL_POKEMON } from "../api/apiRest";
import { PokemonListType } from "../interfaces/interfaces";
import Card from "../components/Card";
import Dashboard from "../components/Dashboard";

const Poke: any = [];

const GigantMax = () => {
  const [pokemons, setPokemons] = useState(Poke);
  const search = "mega";

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    //let url_id = data?.url?.split("/"); // confierte a un array separando por el /
    //if (typeof url_id !== "undefined") {
    const api = await axios.get(`${URL_POKEMON}/?offset=1025&limit=278`);
    let pokemons = api.data?.results?.map((pokemon: any) =>
      pokemonToList(pokemon)
    );

    setPokemons(pokemons);
    //}
  };

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

  const filterPokemons = pokemons?.filter((pokemon: any) =>
    pokemon?.name?.includes(search)
  );
  // search === "pika"
  // ? globalPokemon?.filter((pokemon) => pokemon?.name?.includes(search))
  //  : []; //arrayPokemon;

  return (
    <div className="lg:h-[768px] w-[1200px] text-white flex flex-row rounded-3xl bg-black/40 backdrop-blur-2xl ">
      <section className="hidden lg:block h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <Dashboard />
      </section>

      <section>
        <h1 className="mb-5">POKEMONS PIKACHU</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {filterPokemons?.map((item: any, index: any) => (
            <Card key={index} pokemon={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default GigantMax;
