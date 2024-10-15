import React from "react";
import { Generations } from "../../components/Generation";
import { BsArrowsAngleExpand } from "react-icons/bs";
import Link from "next/link";
import { FaGuilded } from "react-icons/fa";
const Generation = () => {
  return (
    <div className="lg:h-[600px] w-[1200px] text-white flex flex-col rounded-3xl bg-black/50 backdrop-blur-2xl ">
      <h1 className="-mt-5 flex flex-row justify-center items-center text-xl font-bold">
        <FaGuilded /> <span className="pl-3">Generations</span>
      </h1>

      <div className="w-full p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Generations.map((item, index) => (
          <div className="relative flex flex-col " key={index}>
            <div className="">
              <img src={item.image} alt={item.alias} className="h-32 w-full" />
            </div>

            <div className="-mt-8 py-1 px-3 bg-black/50 font-semibold">
              <Link href="../pokedex">{item.alias}</Link>
            </div>

            <Link
              href="../pokedex"
              className="absolute top-3 right-3 rounded-lg bg-black/50 border border-white/50 p-2 text-lg"
            >
              <BsArrowsAngleExpand />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Generation;
