"use client";
import React, { useState, useEffect } from "react";
import { getUsersSearchbar } from "@/helpers/users";
import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface SearchUser {
  id: string;
  username: string;
  profile_image: string;
}

interface Interest {
  interest_id: string;
  name: string;
}

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await fetch(`${API_URL}/interests`);
        const data = await response.json();
        setInterests(data);
      } catch (err) {
        console.error("Error fetching interests:", err);
      }
    };
    fetchInterests();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers([]);
      return;
    }

    const fetchFilteredUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const users = await getUsersSearchbar(searchQuery);
        setFilteredUsers(
          users.map((user) => ({
            id: user.id,
            username: user.username,
            profile_image: user.profile_image || "/agregarfoto.png",
          }))
        );
      } catch (err) {
        console.error(err);
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredUsers();
    setSearched(true);
  }, [searchQuery]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".dropdown");
      const searchResults = document.querySelector(".search-results");
      if (
        dropdown &&
        !dropdown.contains(event.target as Node) &&
        searchResults &&
        !searchResults.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchClick = async () => {
    setSearched(false);
    setShowDropdown(false);
    setSearchQuery("");

    try {
      const queryParams = new URLSearchParams();
      selectedInterests.forEach((interest) =>
        queryParams.append("interests", interest)
      );

      const users = await getUsersSearchbar(
        searchQuery,
        queryParams.toString()
      );
      setFilteredUsers(
        users.map((user) => ({
          id: user.id,
          username: user.username,
          profile_image: user.profile_image || "/agregarfoto.png",
        }))
      );
    } catch (err) {
      console.error(err);
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="relative container mx-auto px-4 md:px-6 pt-8 h-20">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/3">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full h-8 p-1 border border-gray-300 rounded-lg shadow-sm bg-white flex justify-between items-center"
          >
            <span className="text-gray-500 text-sm">
              {selectedInterests.length > 0
                ? `${selectedInterests.length} Intereses`
                : "Intereses"}
            </span>
            <span className="text-gray-400">▼</span>
          </button>

          
          {showDropdown && (
  <div className="absolute top-full left-0 w-full md:w-[104%] max-h-60 mt-6 bg-white border border-gray-300 rounded-lg shadow-lg z-10 overflow-y-auto">
    <ul className="space-y-2 p-2 w-15">
      {interests.map((interest) => (
        <li key={interest.interest_id}>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedInterests.includes(interest.name)}
              onChange={() => toggleInterest(interest.name)}
              className="form-checkbox h-4 w-4 text-blue-500"
            />
            <span className="text-gray-700 text-sm">{interest.name}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
)}

        </div>
        <input
  type="text"
  placeholder="Buscar usuarios..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full md:w-auto py-1 h-8 px-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm"
/>



<button
  className="w-full md:w-auto h-7 p-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
  onClick={handleSearchClick}
>
  Buscar
</button>

      </div>

      <div className="relative mt-6 w-full md:w-3/5">
        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && searched && filteredUsers.length === 0 && (
          <p className="text-gray-500 text-center">No hay resultados.</p>
        )}
 <div className="relative mt-4">
        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && searched && filteredUsers.length === 0 && (
          <p className="text-gray-500 text-center">No hay resultados.</p>
        )}
        {filteredUsers.length > 0 && (
          <div className="absolute w-full ml-36 bg-white shadow-md border border-gray-300 rounded-lg max-h-60 overflow-y-auto ">
            {filteredUsers.map((user) => (
                 <Link
                 key={user.id}
                 href={`/perfil/${user.username}`}
                 className="flex items-center gap-3 p-2 hover:bg-gray-100 transition duration-300"
                 onClick={() => setFilteredUsers([])}  // Cierra los resultados al hacer clic en un resultado
               >
                 <Image
                   src={user.profile_image}
                   alt={user.username}
                   width={40}
                   height={40}
                   className="rounded-full"
                 />
                 <span className="text-gray-800 text-sm">{user.username}</span>
               </Link>
            ))}
          </div>
        )}

</div>

      </div>
    </div>
  );
};

export default SearchBar;
