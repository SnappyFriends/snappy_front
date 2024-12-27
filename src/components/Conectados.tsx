"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUsers } from "@/helpers/users"; 
import Link from "next/link"; 

interface User {
  id: string;
  username: string;
  profile_image: string;
}

const Conectados: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        try {
          const fetchedUsers: User[] = await getUsers();
          setUsers(fetchedUsers);

          localStorage.setItem("users", JSON.stringify(fetchedUsers));
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();
  }, []);

  const firstSixUsers = users.slice(0, 6);

  return (
    <div className="space-y-4 p-4 rounded-lg ml-24">
      {firstSixUsers.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay usuarios disponibles en este momento.</p>
      ) : (
        firstSixUsers.map(user => (
          <Link key={user.id} href={`/chat/${user.username}`}>
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12">
                  <Image
                    src={user.profile_image}
                    alt={user.username}
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold">{user.username}</h3>
              </div>
              <div>
                <span className="w-3 h-3 bg-green-500 rounded-full block"></span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Conectados;
