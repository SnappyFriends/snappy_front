"use client";

import { useState, useEffect } from "react";
import { getUsers } from "@/helpers/users"; 
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Conectados from "@/components/Conectados";

interface User {
  id: string;
  username?: string;
  fullName?: string;
  imgSrc?: string;
  email?: string;
  profile_image: string;
}

const ChatRoomView = () => {
  const [members, setMembers] = useState<User[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setUsersList(users); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addMemberToRoom = (user: User) => {
    if (!members.some((m) => m.id === user.id)) {
      setMembers([...members, user]); 
      setSearchQuery(""); 
      setIsAdding(false);
    }
  };

  const filterUsers = (query: string) => {
    if (!query) {
      setFilteredUsers(usersList);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filtered = usersList.filter(
      (user) =>
        (user.username && user.username.toLowerCase().includes(lowercasedQuery)) ||
        (user.fullName && user.fullName.toLowerCase().includes(lowercasedQuery))
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    filterUsers(searchQuery);
  }, [searchQuery, usersList]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:flex flex-col w-64 bg-white p-6 space-y-10 fixed left-6 top-1/2 transform -translate-y-1/2">
          <Sidebar />
        </div>

        <div className="lg:w-3/5 md:w-full ml-0 lg:ml-80 mt-4 lg:mt-0">
          <div className="flex items-center justify-center min-h-screen relative">
            <div className="flex w-full max-w-6xl rounded-lg bg-white shadow-md">

              <div className="lg:w-1/4 sm:w-full md:w-full min-h-[400px] max-h-[600px] border-r px-4 py-6 bg-gray-100 overflow-y-auto">
                <h3 className="text-xl font-semibold mb-4">Miembros de la Sala</h3>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center space-x-2">
                      <div className="relative w-10 h-10">
                        <Image
                          src={member.imgSrc || "/agregarfoto.png"}
                          alt={`Foto de perfil de ${member.username}`}
                          layout="fill"
                          className="rounded-full object-cover"
                        />
                      </div>
                      <span className="text-sm">{member.username}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setIsAdding(true)} 
                  className="bg-green-500 text-white w-full px-4 py-2 rounded-lg text-sm mt-4 hover:bg-green-600 transition"
                >
                  Agregar Miembro
                </button>

                {isAdding && (
                  <div className="mt-4 max-h-60 overflow-y-auto bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3">Selecciona un Miembro</h4>
                    <input
                      type="text"
                      placeholder="Buscar usuario..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <div>
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                          onClick={() => addMemberToRoom(user)}
                        >
                          <div className="relative w-10 h-10">
                            <Image
                              src={user.imgSrc || "/agregarfoto.png"}
                              alt={`Foto de perfil de ${user.username}`}
                              layout="fill"
                              className="rounded-full object-cover"
                            />
                          </div>
                          <span className="text-sm">{user.username}</span>
                          <span className="text-xs text-gray-400">{user.fullName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:w-3/4 sm:w-full px-4 py-6 flex flex-col bg-gray-50 overflow-y-auto">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    <div className="relative w-12 h-12">
                      <Image
                        src="/agregarfoto.png"
                        alt="Foto de perfil de la sala"
                        layout="fill"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h1 className="text-xl font-semibold">Sala de Chat</h1>
                      <p className="text-sm text-gray-500">Sala activa</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto mt-6 px-4 py-3 bg-white rounded-lg">
                  <p className="text-center text-gray-400">Inicia tu conversación en el chat</p>
                </div>

                <div className="px-4 py-3 border-t flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-3">
                    <div className="relative w-6 h-6">
                      <Image
                        src="/microfono.png"
                        alt="Icono de micrófono"
                        layout="fill"
                        className="object-contain"
                      />
                    </div>
                    <div className="relative w-6 h-6">
                      <Image
                        src="/cara-feliz.png"
                        alt="Icono de emoji"
                        layout="fill"
                        className="object-contain"
                      />
                    </div>
                    <div className="relative w-6 h-6">
                      <Image
                        src="/galeria-de-imagenes.png"
                        alt="Icono de galería de imágenes"
                        layout="fill"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
          <Conectados />
        </div>
      </div>
    </div>
  );
};

export default ChatRoomView;
