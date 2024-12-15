"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./Searchbar";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const icons = [
    { href: "/socialfeed", src: "/home1.png", alt: "Home Icon" },
    { href: "/mensajesprivados", src: "/mensajes.png", alt: "Messages Icon" },
    { href: "/newchat", src: "/logochatsnuevos.png", alt: "Arrow Icon" },
    { href: "/notificaciones", src: "/notificaciones.png", alt: "Notifications Icon" },
    { href: "/miperfil", src: "/usuario.png", alt: "Profile Icon" },
  ];

  return (
    <nav className="bg-white text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        <Link href="/socialfeed">
          <div className="flex items-center space-x-4 flex-shrink-0">
              <Image
                src="/favicon.ico"
                alt="Left Icon"
                width={50}
                height={50}
              />
            
            <span className="text-2xl font-bold text-gray-800">SNAPPY FRIENDS</span>
            
          </div>
          </Link>

          <div className="flex-grow ml-48">
            <SearchBar />
          </div>

          <div className="hidden md:flex space-x-6">
            {icons.map(({ href, src, alt }) => (
              <Link href={href} key={href}>
                <Image src={src} alt={alt} width={32} height={32} />
              </Link>
            ))}
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
            {icons.map(({ href, src, alt }) => (
              <Link href={href} key={href} className="block">
                <Image src={src} alt={alt} width={32} height={32} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
