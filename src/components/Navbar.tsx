"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./Searchbar";
import Cookies from "js-cookie";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla el menú desplegable de usuario
  const { setToken } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth_token");
    setToken(null);
    router.push("/");
  };

  const icons = [
    { href: "/socialfeed", src: "/home1.png", alt: "Home Icon" },
    { href: "/mensajesprivados", src: "/mensajes.png", alt: "Messages Icon" },
    { href: "/newchat", src: "/logochatsnuevos.png", alt: "Arrow Icon" },
    { href: "/notificaciones", src: "/notificaciones.png", alt: "Notifications Icon" },
  ];

  return (
    <nav className="bg-white text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/socialfeed">
            <div className="flex items-center space-x-4 flex-shrink-0">
              <Image src="/favicon.ico" alt="Left Icon" width={50} height={50} />
              <span className="text-2xl font-bold text-gray-800">
                SNAPPY FRIENDS
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-grow ml-48">
            <SearchBar />
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6 relative">
            {icons.map(({ href, src, alt }) => (
              <Link href={href} key={href}>
                <Image src={src} alt={alt} width={32} height={32} />
              </Link>
            ))}

            {/* Menú desplegable de usuario */}
            <div className="relative">
              <Image
                src="/usuario.png"
                alt="Usuario"
                width={32}
                height={32}
                onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle del menú
                className="cursor-pointer hover:opacity-80"
              />

              {/* Opciones desplegables */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  {/* Configuración */}
                  <Link
                    href="/editarperfil"
                    className="flex items-center px-4 py-2 hover:bg-gray-200"
                  >
                    <Image
                      src="/rueda.png" // Ícono de configuración
                      alt="Configuración"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    <span>Configuración</span>
                  </Link>

                  {/* Cerrar sesión */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    <Image
                      src="/cerrarsesion.png" // Ícono de cerrar sesión
                      alt="Cerrar sesión"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
              aria-label="Abrir menú"
              title="Abrir menú"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {icons.map(({ href, src, alt }) => (
              <Link href={href} key={href} className="block">
                <Image src={src} alt={alt} width={32} height={32} />
              </Link>
            ))}
            {/* Menú de usuario en mobile */}
            <div
              className="flex items-center cursor-pointer hover:opacity-80"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Image src="/usuario.png" alt="Usuario" width={32} height={32} />
              <span className="ml-2"></span>
            </div>

            {isMenuOpen && (
              <div className="mt-2 bg-white border rounded-lg shadow-lg">
                <Link
                  href="/editarperfil"
                  className="flex items-center px-4 py-2 hover:bg-gray-200"
                >
                  <Image
                    src="/rueda.png"
                    alt="Configuración"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Configuración
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  <Image
                    src="/cerrarsesion.png"
                    alt="Cerrar sesión"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
