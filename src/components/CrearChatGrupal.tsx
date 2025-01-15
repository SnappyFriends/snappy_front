import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import React, { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";
/* import { useState } from "react"; */

const CreateChatGroupForm = () => {
  /* const [groupChats, setGroupChats] = useState<[]>([]); */
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { userData, setGroupId } = useContext(UserContext);

  const router = useRouter();

  const createGroupChat = async (e: FormEvent) => {
    e.preventDefault();
    if (!userData) return;

    try {
      const responseObject = { name, description, creator_id: userData.id };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat-groups`,
        {
          method: "POST",
          body: JSON.stringify(responseObject),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.json();
        alert(errorText.message);
      }
      const parsedResponse = await response.json();

      setGroupId(parsedResponse.group_id);

      setTimeout(() => {
        router.push(`/chatgrupal?group_id=${parsedResponse.group_id}`);
      }, 3000);
    } catch (error) {
      console.error("Error creating chatGroup", error);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center mt-5">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
        <div className="mb-6">
          <Image
            src="/mas-crear-chat-grupal.png"
            alt="Crear Chat Grupal"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4">Crear Chat Grupal</h1>
        <p className="text-gray-600 mb-6">
          Completa el formulario para crear un nuevo chat grupal y conectar con
          tu comunidad.
        </p>
        <form onSubmit={createGroupChat} className="space-y-4">
          {/* Nombre del Grupo */}
          <div>
            <label
              htmlFor="groupName"
              className="block text-left text-gray-700 font-semibold mb-2"
            >
              Nombre del Grupo
            </label>
            <input
              id="groupName"
              type="text"
              placeholder="Ingresa el nombre del grupo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Descripción del Grupo */}
          <div>
            <label
              htmlFor="groupDescription"
              className="block text-left text-gray-700 font-semibold mb-2"
            >
              Descripción del Grupo
            </label>
            <textarea
              id="groupDescription"
              placeholder="Describe el propósito del grupo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {/* Botón de Crear */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition w-full"
          >
            Crear Chat Grupal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChatGroupForm;
