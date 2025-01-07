"use client";

import React, { useState, useEffect } from "react";
import { getUsers, User } from "@/helpers/users";
import Image from "next/image";

export default function Usuarios() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []); 
  
  const handleBan = (userId: string) => {
    console.log(`Usuario con ID ${userId} baneado`);
  };

  return (
<div className="flex flex-col items-center w-full ml-20">
<h1 className="text-center text-3xl font-bold mb-5">Usuarios</h1>
      <table className="w-full h-full text-sm mb-40">
        <thead>
          <tr>
            <th className="p-3 border">Foto de Perfil</th>
            <th className="p-3 border">Nombre de Usuario</th>
            <th className="p-3 border">Nombre Completo</th>
            <th className="p-3 border">Email</th> 
            <th className="p-3 border">Género</th> 
            <th className="p-3 border">Tipo</th>
            <th className="p-3 border">Acción</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-3">
                <Image
                  src={user.profile_image || "/default-profile.png"}
                  alt={user.username}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </td>
              <td className="p-3 text-center">{user.username}</td>
              <td className="p-3 text-center">{user.fullname}</td>
              <td className="p-3 text-center">{user.email}</td> 
              <td className="p-3 text-center">{user.genre}</td> 
              <td className="p-3 text-center">{user.user_type}</td> 
              <td className="p-3 text-center">
                <button
                  onClick={() => handleBan(user.id)}
                  className="bg-red-600 text-white py-1 px-4 rounded-lg"
                >
                  Bannear
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
