"use client";

import React, { useState } from "react";
import Image from "next/image";
import CreateChatGroupForm from "@/components/CrearChatGrupal";

const CreateChat = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm ? (
        <CreateChatGroupForm />
      ) : (
        <div className="flex-1 flex items-center justify-center mt-32">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
            <div className="mb-6">
              <Image
                src="/mas-crear-chat-grupal.png"
                alt="Crear Chat"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <h1 className="text-2xl font-bold mb-4">Crear Chat</h1>
            <p className="text-gray-600 mb-6">
              Aquí puedes crear un nuevo chat y empezar a chatear con tus
              amigos.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
              onClick={() => setShowForm(true)}
            >
              Crear Chat
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateChat;
