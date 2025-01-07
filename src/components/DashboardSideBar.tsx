"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const DashboardSidebar = () => {
  const sideBarList = ["Usuarios", "Publicaciones", "Comentarios", "Reportes", "Estadisticas"];
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="bg-black h-full w-1/5 fixed z-50 lg:block hidden">
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

      <div className="lg:hidden fixed z-50 w-full bg-black">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Image src="/favicon.ico" alt="Snappy" width={40} height={40} />
            <h1 className="font-extrabold text-xl ml-2 text-white">SNAPPY FRIENDS</h1>
          </div>
          <button onClick={toggleMenu} className="text-white text-3xl">
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {isOpen && (
          <div className="bg-black text-white p-4 h-[calc(100vh-80px)] overflow-y-auto">
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
        )}
      </div>
    </>
  );
};

export default DashboardSidebar;
