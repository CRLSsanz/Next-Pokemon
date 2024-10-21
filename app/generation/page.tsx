"use client"

import Link from 'next/link'
import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext';
import { URL_GENERATION } from '../api/apiRest';
import Dashboard from '../components/Dashboard';

const Generation = () => {
    const { generations, generationChange } =
    useContext(PokemonContext);
 
  return (
    
    <div className="lg:h-[768px] w-[1200px] text-white flex flex-row rounded-3xl bg-black/40 backdrop-blur-2xl ">
      <section className="hidden lg:block h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <Dashboard />
      </section>
      
      <section className="w-full h-full p-10">
        <div className='w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-5'>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-1", url:`${URL_GENERATION}/1`} )} className="w-full h-32 lg:h-full bg-black/20 flex items-center justify-center">Generation 1</Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-2", url:`${URL_GENERATION}/2`} )} className="w-full h-32 lg:h-full bg-black/20 flex items-center justify-center">Generation 2</Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-3", url:`${URL_GENERATION}/3`} )} className="w-full h-32 lg:h-full bg-black/20 flex items-center justify-center">Generation 3</Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-4", url:`${URL_GENERATION}/4`} )} className="w-full h-32 lg:h-full bg-black/20 flex items-center justify-center">Generation 4</Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-5", url:`${URL_GENERATION}/5`} )} className="w-full h-32 lg:h-full bg-black/20 flex items-center justify-center">Generation 5</Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-6", url:`${URL_GENERATION}/6`} )} className="w-full h-32 lg:h-full bg-black/20 flex items-center justify-center">Generation 6</Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-7", url:`${URL_GENERATION}/7`} )} className="w-full h-32 lg:h-full bg-black/20 flex items-center justify-center">Generation 7</Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-8", url:`${URL_GENERATION}/8`} )} className="w-full h-32 lg:h-full bg-black/20 flex items-center justify-center">Generation 8</Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-9", url:`${URL_GENERATION}/9`} )} className="w-full h-32 lg:h-full bg-black/20 flex items-center justify-center">Generation 9</Link>
        </div>
      </section>
      
    </div>
  )
}

export default Generation