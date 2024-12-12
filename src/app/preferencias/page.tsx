"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Preferences = () => {
  const [search, setSearch] = useState("");
  const preferences = [
    "Deportes",
    "Tecnología",
    "Arte",
    "Ciencia",
    "Viajes",
    "Música",
    "Cine",
  ];

  const filteredPreferences = preferences.filter((preference) =>
    preference.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <div className="mb-6">
        <Image
          src="/favicon.ico" 
          alt="Logo"
          width={120} 
          height={120}
          className="object-contain"
        />
      </div>

      <div className="w-80 mb-6">
        <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.42-1.42l4.39 4.39z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar"
            className="flex-1 outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-80 mb-6">
        <ul className="space-y-3">
          {filteredPreferences.map((preference, index) => (
            <li key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`preference-${index}`}
                className="mr-2"
              />
              <label htmlFor={`preference-${index}`} className="text-sm"> 
                {preference}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <Link href="/home">
        <div className="w-80">
          <button className="w-full bg-black text-white py-3 rounded-lg shadow-md hover:bg-gray-800 transition">
            Siguiente
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Preferences;
