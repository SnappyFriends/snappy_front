"use client";
import React, { useState, useEffect, useContext } from "react";
import { User } from "@/helpers/users";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import UsersDashboard from "@/components/UsersDashboard";
import Link from "next/link";

export default function Usuarios() {
  const { userData, token } = useContext(UserContext);
  const [users, setUsers] = useState<User[]>();
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }

        const fetchedUsers: User[] = await response.json();
        const sortedUsers = fetchedUsers.sort((a, b) =>
          a.username.localeCompare(b.username)
        );
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleBanToggle = async (userId: string, currentStatus: string) => {
    if (!userData) return;

    setSelectedUser({ id: userId, status: currentStatus });
    setShowModal(true);
  };

  const confirmBanAction = async () => {
    if (!selectedUser) return;

    setLoading(true);
    const newStatus = selectedUser.status === "banned" ? "active" : "banned";

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${selectedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers?.map((user) =>
            user.id === selectedUser.id ? { ...user, status: newStatus } : user
          )
        );
      } else {
        console.error("Error al actualizar el estado del usuario");
      }
    } catch (error) {
      console.error("Error al hacer el fetch:", error);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const cancelBanAction = () => {
    setShowModal(false);
  };

  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-center w-[73rem]">
        <div className="flex flex-col items-center w-full">
          <h1 className="text-center text-3xl font-bold mb-5">Usuarios</h1>

          <input
            type="text"
            placeholder="Nombre de usuario"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 mb-5 rounded-md border w-full text-center"
          />

          <table className="w-full h-full text-sm mb-40">
            <thead>
              <tr>
                <th className="p-3 border">Nombre de Usuario</th>
                <th className="p-3 border hidden lg:table-cell">
                  Nombre Completo
                </th>
                <th className="p-3 border hidden md:table-cell">Email</th>
                <th className="p-3 border hidden lg:table-cell">Género</th>
                <th className="p-3 border hidden lg:table-cell">Tipo</th>
                <th className="p-3 border">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2 ml-8 flex flex-start border-gray-200 text-center">
                    <Link href={`../perfil/${user.username}`}>
                      <Image
                        src={user.profile_image}
                        alt={user.username}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full mx-auto inline mr-2"
                      />
                      {user.username}
                    </Link>
                  </td>
                  
                  <td className="p-3 text-center hidden lg:table-cell">
                  <Link href= {`/perfil/${user.username}`}>
                    {user.fullname}
                    </Link>
                  </td>
                  <td className="p-3 text-center hidden md:table-cell">
                    {user.email}
                  </td>
                  <td className="p-3 text-center hidden lg:table-cell">
                    {user.genre?.toLocaleLowerCase()}
                  </td>
                  <td className="p-3 text-center hidden lg:table-cell">
                    {user.user_type}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleBanToggle(user.id, user.status)}
                      disabled={loading}
                      className={`py-1 px-4 rounded-lg ${
                        user.status === "banned"
                          ? "bg-gray-400 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {user.status === "banned" ? "Desbanear" : "Bannear"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-center text-xl font-semibold mb-4">
                  ¿Estás seguro?
                </h2>
                <p className="text-center mb-6">
                  ¿Seguro que deseas{" "}
                  {selectedUser?.status === "banned" ? "desbanear" : "banear"} a
                  este usuario?
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={cancelBanAction}
                    className="py-2 px-4 bg-gray-500 text-white rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmBanAction}
                    disabled={loading}
                    className="py-2 px-4 bg-red-600 text-white rounded-lg"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <UsersDashboard />
    </>
  );
}
