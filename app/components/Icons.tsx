import React from "react";

import { AiFillThunderbolt } from "react-icons/ai";
import { BiSolidGhost } from "react-icons/bi";
import {
  FaCircleNotch,
  FaDragon,
  FaFistRaised,
  FaLeaf,
  FaSkull,
} from "react-icons/fa";
import { FaHillRockslide } from "react-icons/fa6";
import { GiAlienFire, GiFluffyWing, GiHexagonalNut } from "react-icons/gi";
import { ImFire } from "react-icons/im";
import { IoIosBug } from "react-icons/io";
import {
  MdDarkMode,
  MdOutlineSevereCold,
  MdTerrain,
  MdWaterDrop,
} from "react-icons/md";
import { PiSpiralFill } from "react-icons/pi";

const Icons = (type: any) => {
  switch (type) {
    case "fire":
      return <ImFire />;
    case "grass":
      return <FaLeaf />;
    case "water":
      return <MdWaterDrop />;
    case "flying":
      return <GiFluffyWing />;
    case "poison":
      return <FaSkull />;
    case "bug":
      return <IoIosBug />;
    case "normal":
      return <FaCircleNotch />;
    case "psychic":
      return <PiSpiralFill />;
    case "fighting":
      return <FaFistRaised />;
    case "electric":
      return <AiFillThunderbolt />;
    case "ground":
      return <MdTerrain />;
    case "rock":
      return <FaHillRockslide />;
    case "ice":
      return <MdOutlineSevereCold />;
    case "fairy":
      return <GiAlienFire />;
    case "ghost":
      return <BiSolidGhost />;
    case "steel":
      return <GiHexagonalNut />;
    case "dragon":
      return <FaDragon />;
    case "dark":
      return <MdDarkMode />;

    default:
      break;
  }
};

export default Icons;
