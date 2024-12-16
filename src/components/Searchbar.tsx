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
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [filteredUsers, setFilteredUsers] = useState<SearchUser[]>([]); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fetchFilteredUsers = async () => {
      if (!searchQuery) {
        setFilteredUsers([]); 
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const users = await getUsersByUsername(searchQuery);
        setFilteredUsers(users.map((user) => ({ 
          id: user.id, 
          username: user.username, 
          profile_image: "/agregarfoto.png",
        }))); 
      } catch (err) {
        console.error(err);
        setError('Error fetching users');
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
      <input
  type="text"
  placeholder="Search users..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full md:w-3/5 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
/>

      {loading && <p className="mt-3 text-gray-500"></p>}
      {error && <p className="mt-3 text-red-500">{error}</p>}

      {!loading && filteredUsers.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto z-10">
          {filteredUsers.map((user) => (
            <Link
              href={`perfil/${user.username}`}
              key={user.id}
              className="flex items-center space-x-4 p-4 hover:bg-gray-100 rounded-lg transition duration-300"
            >
              <div className="relative w-12 h-12 md:w-14 md:h-14">
                <Image
                  src={user.profile_image}
                  alt={`Profile picture of ${user.username}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <span className="text-sm md:text-lg font-semibold text-gray-800">{user.username}</span>
            </Link>
          ))}
        </div>
      )}

      {!loading && !filteredUsers.length && searchQuery && (
        <p className="mt-3 text-gray-500"></p>
      )}
    </div>
  );
};

export default SearchBar;

