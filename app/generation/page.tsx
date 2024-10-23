"use client"

import Link from 'next/link'
import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext';
import { URL_GENERATION } from '../api/apiRest';
import Dashboard from '../components/Dashboard';
import { AiOutlineClose, AiOutlineSwapLeft } from 'react-icons/ai';
import { MdCatchingPokemon } from 'react-icons/md';
import { TbPokeball } from 'react-icons/tb';

const Generation = () => {
    const { generations, generationChange } =
    useContext(PokemonContext);
 
  return (
    
    <div className="lg:h-[768px] w-[1200px] mt-10 lg:mt-0 text-white flex flex-row rounded-3xl bg-black/40 backdrop-blur-2xl ">
      <section className="hidden lg:block h-full flex-col bg-black/40 rounded-l-3xl backdrop-blur-2xl p-5">
        <Dashboard />
      </section>

      <section className="w-full">
        <div className="-mt-10 flex flex-row items-center justify-between">
          <Link href={`/`}>
            <AiOutlineSwapLeft className="text-gray-300 active:animate-ping h-6 w-6" />
          </Link>
          <h1 className="text-xl">Generations</h1>
          <Link href={`/pokedex`}>
            <TbPokeball className="hidden text-transparent active:animate-ping h-6 w-6" />
          </Link>
        </div>
        
        <div className='w-full h-full p-5 pt-8 grid grid-cols-2 lg:grid-cols-4 gap-5'>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-1", url:`${URL_GENERATION}/1`} )} className="w-full h-36 lg:h-full rounded-lg bg-cover Xbg-[50%] bg-bottom bg-[url('https://www.serebii.net/pokemon/generation1.png')]"><h1>{" "}</h1></Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-2", url:`${URL_GENERATION}/2`} )} className="w-full h-36 lg:h-full rounded-lg bg-cover Xbg-[50%] bg-bottom bg-[url('https://www.serebii.net/pokemon/generation2.png')]"><h1>{" "}</h1></Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-3", url:`${URL_GENERATION}/3`} )} className="w-full h-36 lg:h-full rounded-lg bg-cover Xbg-[50%] bg-bottom bg-[url('https://www.serebii.net/pokemon/generation3.png')]"><h1>{" "}</h1></Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-4", url:`${URL_GENERATION}/4`} )} className="w-full h-36 lg:h-full rounded-lg bg-cover Xbg-[50%] bg-bottom bg-[url('https://www.serebii.net/pokemon/generation4.png')]"><h1>{" "}</h1></Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-5", url:`${URL_GENERATION}/5`} )} className="w-full h-36 lg:h-full rounded-lg bg-cover Xbg-[50%] bg-bottom bg-[url('https://www.serebii.net/pokemon/generation5.png')]"><h1>{" "}</h1></Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-6", url:`${URL_GENERATION}/6`} )} className="w-full h-36 lg:h-full rounded-lg bg-cover Xbg-[50%] bg-bottom bg-[url('https://www.serebii.net/pokemon/generation6.png')]"><h1>{" "}</h1></Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-7", url:`${URL_GENERATION}/7`} )} className="w-full h-36 lg:h-full rounded-lg bg-cover Xbg-[50%] bg-bottom bg-[url('https://www.serebii.net/pokemon/generation7.png')]"><h1>{" "}</h1></Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-8", url:`${URL_GENERATION}/8`} )} className="w-full h-36 lg:h-full rounded-lg bg-cover Xbg-[50%] bg-bottom bg-[url('https://www.serebii.net/pokemon/generation8.png')]"><h1>{" "}</h1></Link>
          <Link href={`/pokedex`}  onClick={() => generationChange({name:"G-9", url:`${URL_GENERATION}/9`} )} className="w-full h-36 lg:h-full rounded-lg bg-cover Xbg-[50%] bg-bottom bg-[url('https://www.serebii.net/pokemon/generation9.png')]"><h1>{" "}</h1></Link>
        </div>
      </section>
      
    </div>
  )
}

export default Generation