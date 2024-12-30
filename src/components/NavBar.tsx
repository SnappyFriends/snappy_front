"use client";

import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { showCustomToast } from "./Notificacion";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setToken, setUserId } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("users");
    setToken(null);
    setUserId(null);
    showCustomToast("Snappy", "Cerraste sesión correctamente", "success");
    router.push("/");
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <header className="shadow-md">
      <nav className="px-4 sm:px-10 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div
          id="logoynombre"
          className="hidden sm:flex items-center justify-center sm:justify-start sm:col-span-1"
        >
          <Link href="/socialfeed" className="flex items-center">
            <Image
              src="/favicon.ico"
              width={60}
              height={60}
              alt="snappy logo"
            />
            <h1 className="font-bold text-2xl ml-2">SNAPPY FRIENDS</h1>
          </Link>
        </div>

        {/* <div
          id="barradebusqueda"
          className="flex justify-center sm:justify-center sm:col-span-1"
        >
          <form className="flex items-center w-full sm:w-auto">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-4 pr-10 py-2 text-sm text-gray-700 bg-white border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
        </div> */}

        <SearchBar />

        <div
          id="barradenavegacion"
          className="flex justify-center sm:justify-end sm:col-span-1"
        >
          <ul className="flex space-x-4 sm:space-x-5 items-center">
            <li>
              <Link href="/socialfeed">
                <Image src="/home.png" width={40} height={40} alt="home" />
              </Link>
            </li>
            <li>
              <Link href="/mensajesprivados">
                <Image
                  src="/mensajes.png"
                  width={40}
                  height={40}
                  alt="chats privados"
                />
              </Link>
            </li>
            <li>
              <Link href="/newchat">
                <Image
                  src="/snappear.png"
                  width={50}
                  height={40}
                  alt="snappear"
                />
              </Link>
            </li>
            <li>
              <Link href="/notificaciones">
                <Image
                  src="/bell.png"
                  width={40}
                  height={40}
                  alt="notificaciones"
                />
              </Link>
            </li>
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
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-1">
                    <li>
                      <Link
                        href="/miperfil"
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
                        href="/crearpublicacion"
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
                        href="/editarperfil"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Image
                          src="/editarperfil.png"
                          alt="Editar perfil"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        Editar perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/configuracion"
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
                        onClick={handleLogout}
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