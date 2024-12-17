'use client';

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function NavBarResponsive() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <header>
      <nav className="flex items-center px-10 shadow-md h-20 justify-between">
        {/* Logo y nombre */}
        <div id="logoynombre" className="flex items-center">
          <Image src="/favicon.ico" width={60} height={60} alt="snappy logo" />
          <h1 className="font-bold text-2xl">SNAPPY</h1>
        </div>

        {/* Barra de búsqueda */}
        <div id="barradebusqueda">
          <form className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-64 sm:w-80 pl-4 pr-10 py-2 text-sm text-gray-700 bg-white border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-300"
              >
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Barra de navegación */}
        <div id="barradenavegacion" className="relative">
          <ul className="flex justify-center items-center">
            <li className="mr-5">
              <Link href="/">
                <Image src="/home.png" width={40} height={40} alt="home" />
              </Link>
            </li>
            <li className="mr-5">
              <Link href="/mensajesprivados">
                <Image
                  src="/chatsprivados.png"
                  width={40}
                  height={40}
                  alt="chats privados"
                />
              </Link>
            </li>
            <li className="mr-5">
              <Link href="/newchat">
                <Image
                  src="/logochatsnuevos.png"
                  width={50}
                  height={40}
                  alt="snappear"
                />
              </Link>
            </li>
            <li className="mr-5">
              <Link href="/notificaciones">
                <Image
                  src="/bell.png"
                  width={40}
                  height={40}
                  alt="notificaciones"
                />
              </Link>
            </li>
            {/* Botón del usuario */}
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="focus:outline-none"
                aria-label="Toggle dropdown"
              >
                <Image
                  src="/user.png"
                  width={40}
                  height={40}
                  alt="foto de perfil"
                />
              </button>
              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-1">
                    <li>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Image
                          src="/user.png"
                          alt="Mi perfil"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        Mi perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/createpost"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Image
                          src="/add.png"
                          alt="Crear publicación"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        Crear publicación
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Image
                          src="/settings.png"
                          alt="Configuración"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        Configuración
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => alert("Cerrar sesión")}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Image
                          src="/logout.png"
                          alt="Cerrar sesión"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
