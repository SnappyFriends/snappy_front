"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/socialfeed">
              <Image
                src="/favicon.ico"
                alt="Left Icon"
                width={50}
                height={50}
              />
            </Link>
            <span className="text-2xl font-bold text-gray-800">
              SNAPPY FRIENDS
            </span>
          </div>

          <div className="hidden md:flex flex-grow justify-center">
            <form className="w-2/4 relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full h-10 border border-gray-300 rounded-md px-10 placeholder-gray-500 bg-gray-200 focus:outline-none"
              />
              <div className="absolute left-3 top-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm14 14l-4.35-4.35"
                  />
                </svg>
              </div>
            </form>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link href="/socialfeed">
              <Image
                src="/home1.png"
                alt="Home Icon"
                width={32}
                height={32}
              />
            </Link>
            <Link href="/mensajesprivados">
              <Image
                src="/mensajes.png"
                alt="Messages Icon"
                width={32}
                height={32}
              />
            </Link>
            <Link href="/newchat">
              <Image
                src="/flecha.png"
                alt="Arrow Icon"
                width={32}
                height={32}
              />
            </Link>
            <Link href="/notificaciones">
              <Image
                src="/notificaciones.png"
                alt="Notifications Icon"
                width={32}
                height={32}
              />
            </Link>
            <Link href="/miperfil">
              <Image
                src="/usuario.png"
                alt="Profile Icon"
                width={32}
                height={32}
              />
            </Link>
          </div>

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

        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <form className="w-full relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full h-10 border border-gray-300 rounded-md px-10 placeholder-gray-500 bg-gray-200 focus:outline-none"
              />
              <div className="absolute left-3 top-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm14 14l-4.35-4.35"
                  />
                </svg>
              </div>
            </form>
            <Link href="/socialfeed" className="block">
              <Image
                src="/home1.png"
                alt="Home Icon"
                width={32}
                height={32}
              />
            </Link>
            <Link href="/mensajesprivados" className="block">
              <Image
                src="/mensajes.png"
                alt="Messages Icon"
                width={32}
                height={32}
              />
            </Link>
            <Link href="/newchat" className="block">
              <Image
                src="/flecha.png"
                alt="Arrow Icon"
                width={32}
                height={32}
              />
            </Link>
            <Link href="/notificaciones" className="block">
              <Image
                src="/notificaciones.png"
                alt="Notifications Icon"
                width={32}
                height={32}
              />
            </Link>
            <Link href="/miperfil" className="block">
              <Image
                src="/usuario.png"
                alt="Profile Icon"
                width={32}
                height={32}
              />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;