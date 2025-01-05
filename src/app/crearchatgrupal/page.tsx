"use client";

import React from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import Conectados from "@/components/Conectados";

const CreateChat = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
            <div className="mb-6">
              {/* Icono que puedes agregar */}
              <Image
                src="/mas-crear-chat-grupal.png" // Cambia esta ruta al ícono que deseas
                alt="Crear Chat"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <h1 className="text-2xl font-bold mb-4">Crear Chat</h1>
            <p className="text-gray-600 mb-6">
              Aquí puedes crear un nuevo chat y empezar a chatear con tus amigos.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
              onClick={() => console.log("Crear chat")}
            >
              Crear Chat
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
				<Conectados />
			</div>
    </>
  );
};

export default CreateChat;
