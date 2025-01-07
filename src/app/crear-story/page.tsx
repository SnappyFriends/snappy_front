"use client";

import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import React, { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Conectados from "@/components/Conectados";
import { showCustomToast } from "@/components/Notificacion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CrearStory = () => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [content, setContent] = useState("");
  const { userId } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!archivo) {
      setMensaje("Debes adjuntar un archivo (imagen o video).");
      return;
    }

    if (!content.trim()) {
      setMensaje("El contenido no puede estar vacío.");
      return;
    }

    if (!userId) {
      setMensaje("Error: No se pudo obtener el userId.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("content", content);
    formData.append("fileImg", archivo);

    try {
      const response = await fetch(`${API_URL}/stories`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        showCustomToast("Snappy", "Story creada correctamente", "success");
        setArchivo(null);
        setContent("");
        router.push("/miperfil");
      } else {
        setMensaje("Error al crear la story.");
        console.log("Error en la API:", responseData);
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Ocurrió un error al enviar la información.");
    }
  };

  return (
    <>
      <NavBar />
      <Sidebar />

      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Crear Story</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="p-2 border rounded flex flex-col items-start">
            <span className="mb-2 text-sm">
              Sube tu archivo (imagen o video):
            </span>
            <input
              type="file"
              onChange={(e) => setArchivo(e.target.files?.[0] || null)}
              className="p-1"
              required
            />
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-2 border rounded"
            placeholder="Escribe algo sobre tu día..."
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Subir Story
          </button>
        </form>

        {mensaje && (
          <p className="mt-4 text-center text-sm text-red-500">{mensaje}</p>
        )}
        <div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
          <Conectados />
        </div>
      </div>
    </>
  );
};

export default CrearStory;
