"use client";

import React, { useContext } from "react";
import Types from "../components/Types";
import { PokemonContext } from "../context/PokemonContext";
import MiniCard from "../components/MiniCard";
import Card from "../components/Card";

const PokeTypes = () => {
  const { pokemonsFiltered } = useContext(PokemonContext);

  return (
    <div className="lg:h-[768px] w-[1280px] text-white flex flex-row rounded-3xl bg-black/50 backdrop-blur-2xl ">
      <section className="hidden lg:block p-5 border-r border-black/50">Dash Board</section>

      <section className="p-5">
        <div>search</div>
        <div>
          <Types />
        </div>

        <div className="p-5 ">{pokemonsFiltered?.length}</div>

        <div className="w-full grid grid-cols-6 gap-5">
          {pokemonsFiltered?.map((items: any, index: any) => (
            <MiniCard key={index} data={items} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PokeTypes;
