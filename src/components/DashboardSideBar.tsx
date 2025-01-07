"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashboardSidebar = () => {
  const sideBarList = ["Usuarios", "Publicaciones", "Comentarios", "Reportes", "Estadisticas"];

  return (
    <div className="bg-black h-full w-1/5 fixed z-50 ">
      <div className="m-auto mt-4 sm:flex items-center justify-center sm:justify-start sm:col-span-1">
        <Image src="/favicon.ico" alt="Snappy" width={150} height={150} />
        <h1 className="font-extrabold text-3xl ml-2 text-white">SNAPPY FRIENDS</h1>
      </div> 
    
      <div className="mt-20 h-full">
      <ul>
        <Link href="/dashboard">
        <li className="text-white font-bold p-2 text-center text-2xl mb-7">Dashboard</li>
        </Link>
        {sideBarList.map((item, index) => (
          <li key={index} className="text-white font-bold p-2 text-center text-2xl mb-7">
            <Link href={`dashboard/${item.toLowerCase()}`} className="hover:underline">
              {item}
            </Link>
          </li>
        ))}
        <Link href="/socialfeed">
        <li className="text-white font-bold p-2 text-center text-2xl mb-7">Social Feed</li>
        </Link>
      </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
