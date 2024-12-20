"use client";

import React, { useState, useEffect } from "react";
import { getUsersByUsername } from "@/helpers/users";
import Image from "next/image";
import Link from "next/link";

interface SearchUser {
  id: string;
  username: string;
  profile_image: string;
}

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [filteredUsers, setFilteredUsers] = useState<SearchUser[]>([]); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fetchFilteredUsers = async () => {
      if (!searchQuery) {
        setFilteredUsers([]); 
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const users = await getUsersByUsername(searchQuery);
        setFilteredUsers(
          users.map((user) => ({
            id: user.id,
            username: user.username,
            profile_image: "/agregarfoto.png", 
          }))
        ); 
      } catch (err) {
        console.error(err);
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchFilteredUsers();
    }, 500); 

    return () => clearTimeout(delayDebounce); 
  }, [searchQuery]);

  return (
    <div className="relative container mx-auto px-4 md:px-6 py-4 md:py-6">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-3/5 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
          aria-label="Buscar usuarios"
        />

        <div className="w-full md:w-1/3">
          <select
            id="interests"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
            defaultValue=""
            aria-label="Seleccionar interés"
          >
            <option value="" disabled>
              Interés
            </option>
            <option value="Interest 1">Programación</option>
            <option value="Interest 2">Tecnología</option>
            <option value="Interest 3">Música</option>
            <option value="Interest 4">Literatura</option>
            <option value="Interest 5">Cultura</option>
            <option value="Interest 6">Filosofía</option>
            <option value="Interest 7">Viajes</option>
            <option value="Interest 8">Deportes</option>
            <option value="Interest 9">Naturaleza</option>
          </select>
        </div>

        <button
          className="w-full md:w-auto p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          onClick={() => console.log("Botón de buscar presionado")}
        >
          Buscar
        </button>
      </div>

      <div className="relative mt-6 w-full md:w-3/5">
        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="absolute z-10 top-0 w-full max-h-60 overflow-y-auto mt-2 bg-white shadow-lg">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-3 p-2 border-b border-gray-200 hover:bg-gray-50 transition duration-300"
              >
                <Link href={`../perfil/${user.username}`} className="flex items-center">
                  <div className="relative w-8 h-8">
                    <Image
                      src={user.profile_image}
                      alt={`Profile picture of ${user.username}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 ml-3">
                    {user.username}
                  </span>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center"></p> 
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;