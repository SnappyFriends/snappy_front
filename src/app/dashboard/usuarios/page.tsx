"use client";
import React, { useState, useEffect, useContext } from "react";
import { getUsers, User } from "@/helpers/users";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";

export default function Usuarios() {
  const { userData } = useContext(UserContext);
  const [users, setUsers] = useState<User[]>();
  const [filter, setFilter] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      
      const sortedUsers = fetchedUsers.sort((a, b) => a.username.localeCompare(b.username));
      setUsers(sortedUsers);
    };

    fetchUsers();
  }, []); 

  const handleBanToggle = async (userId: string, currentStatus: string) => {
    if (!userData) return;
    
    setLoading(true);

    // Toggle status between "banned" and "active"
    const newStatus = currentStatus === "banned" ? "active" : "banned";

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers?.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user
          )
        );
      } else {
        console.error("Error al actualizar el estado del usuario");
      }
    } catch (error) {
      console.error("Error al hacer el fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users?.filter(user => 
    user.username.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full lg:ml-20">
      <h1 className="text-center text-3xl font-bold mb-5">Usuarios</h1>
      
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 mb-5 rounded-md border w-auto text-center"
      />

      <table className="w-full h-full text-sm mb-40">
        <thead>
          <tr>
            <th className="p-3 border">Foto de Perfil</th>
            <th className="p-3 border">Nombre de Usuario</th>
            <th className="p-3 border hidden lg:table-cell">Nombre Completo</th>
            <th className="p-3 border hidden md:table-cell">Email</th> 
            <th className="p-3 border hidden lg:table-cell">Género</th> 
            <th className="p-3 border hidden lg:table-cell">Tipo</th>
            <th className="p-3 border">Acción</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user) => (
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
              <td className="p-3 text-center hidden lg:table-cell">{user.fullname}</td>
              <td className="p-3 text-center hidden md:table-cell">{user.email}</td> 
              <td className="p-3 text-center hidden lg:table-cell">{user.genre}</td> 
              <td className="p-3 text-center hidden lg:table-cell">{user.user_type}</td> 
              <td className="p-3 text-center">
                <button
                  onClick={() => handleBanToggle(user.id, user.status)}
                  disabled={loading}
                  className={`py-1 px-4 rounded-lg ${user.status === "banned" ? "bg-gray-400 text-white" : "bg-red-600 text-white"}`}
                >
                  {user.status === "banned" ? "Desbanear" : "Bannear"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
