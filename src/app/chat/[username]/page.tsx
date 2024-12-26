"use client";

import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import Image from "next/image";
import {  getUsersByUsername, User } from "@/helpers/users";

const ChatWithUser = () => {
  const { username } = useParams(); // Captura el username de la URL
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!username || Array.isArray(username)) {
          console.error("Invalid username");
          return;
        }
  
        const userData = await getUsersByUsername(username);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUser();
  }, [username]);

  if (!user) {
    return <p className="text-center">Cargando usuario...</p>;
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-3/5 md:w-full mx-auto mt-12 lg:mt-32">
          <div className="flex flex-col w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center p-4 border-b bg-gray-100">
              <div className="relative w-12 h-12">
                <Image
                  src={user.profile_image || "/agregarfoto.png"}
                  alt={user.username}
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h1 className="text-lg font-semibold">{user.fullname || user.username}</h1>
                <p className="text-sm text-gray-500">Última conexión: Hace 5 min</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <p className="text-gray-400 text-center">Aquí aparecerán los mensajes...</p>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t bg-gray-100 flex items-center space-x-3">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithUser;
