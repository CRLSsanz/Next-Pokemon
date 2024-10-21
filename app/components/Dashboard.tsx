import React from "react";
import { FcCopyleft, FcRadarPlot } from "react-icons/fc";
import { GoHome } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineSpoke } from "react-icons/md";
import { RiSettings4Line, RiUser6Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbPokeball } from "react-icons/tb";

const Dashboard = () => {
  return (
    <div className="h-full w-16 text-gray-200 flex flex-col items-center justify-between text-xl">
      <div className="">
        <div className="py-10"><FcCopyleft className="h-10 w-10" /></div>
        <div className="flex flex-col gap-y-5 items-center ">
          <h1><GoHome /></h1>
          <h1><MdOutlineSpoke /></h1>
          <h1><TbPokeball /></h1>
          <h1><RxDashboard /></h1>
          <h1><RiUser6Line /></h1>
          <h1><RiSettings4Line /></h1>
        </div>
      </div>
      <div><IoExitOutline /></div>
    </div>
  );
};

export default Dashboard;
