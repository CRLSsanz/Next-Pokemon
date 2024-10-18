"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_IMAGE, URL_POKEMON } from "../api/apiRest";
import { PokemonListType } from "../interfaces/interfaces";
import Card from "../components/Card";

const Poke: any = [];

const Pikachu = () => {
  const [pokemons, setPokemons] = useState(Poke);

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

  const CardXX = ({poke}: any) => {
    console.log(poke);
    return (
      <div className="w-full">
        <h1>{poke.pokedexNumber}</h1>
        <div> {poke.name}</div>
        <img
          className="-mt-5 cursor-pointer w-full hover:scale-110 px-2"
          //src={pokemon?.sprites?.other?.showdown?.front_default}
          src={poke.image}
          alt=""
        />
      </div>
    );
  };

  return (
    <div className="lg:h-[800px] w-[1400px] text-white flex flex-col rounded-3xl bg-black/40 backdrop-blur-2xl p-5">
      <h1 className="mb-5">POKEMONS PIKACHU</h1>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-5">
        {pokemons?.map((item: any, index: any) => (
          <Card key={index} pokemon={item} />
        ))}
      </div>
    </div>
  );
};

export default Pikachu;
