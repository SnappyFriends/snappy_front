"use client";
import React, { useState, useEffect } from "react";
import { getUsersSearchbar } from "@/helpers/users";
import Image from "next/image";
import Link from "next/link";

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
        const response = await fetch("http://localhost:3000/interests");
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

  const handleSearchClick = async () => {
    setSearched(true);
    setLoading(true);

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
    <div className="relative container mx-auto px-4 md:px-6 py-4">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-3/5 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
        />

        <div className="relative w-full md:w-1/3">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white flex justify-between items-center"
          >
            <span className="text-gray-500">
              {selectedInterests.length > 0
                ? `${selectedInterests.length} Intereses`
                : "Intereses"}
            </span>
            <span className="text-gray-400">▼</span>
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 w-full max-h-60 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 overflow-y-auto">
              <ul className="space-y-2 p-2">
                {interests.map((interest) => (
                  <li key={interest.interest_id}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedInterests.includes(interest.name)}
                        onChange={() => toggleInterest(interest.name)}
                        className="form-checkbox h-4 w-4 text-blue-500"
                      />
                      <span className="text-gray-700">{interest.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          className="w-full md:w-auto p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
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

        <div className="absolute z-10 top-0 w-full max-h-60 overflow-y-auto mt-2 bg-white shadow-lg">
          {filteredUsers.map((user) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
