"use client";

import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import React, { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const CrearStory = () => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState("");
  const { userId } = useContext(UserContext); 
  const router = useRouter();

  const determinarTipoArchivo = (archivo: File | null) => {
    if (!archivo) return null; 
    const mimeType = archivo.type;
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("video/")) return "video";
    return null; 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!archivo) {
      setMensaje("Debes adjuntar un archivo (imagen o video).");
      return;
    }

    const tipoArchivo = determinarTipoArchivo(archivo);

    if (!tipoArchivo) {
      setMensaje("Tipo de archivo no válido.");
      return;
    }

    if (!userId) {
      setMensaje("Error: No se pudo obtener el userId.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId); 
    formData.append("file", archivo);
    formData.append("expiresIn", "86400"); 
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.alert("¡Story creada con éxito!"); 
        setArchivo(null);

        router.push("/socialfeed");
      } else {
        setMensaje("Error al crear la story.");
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
            <span className="mb-2 text-sm">Sube tu archivo (imagen o video):</span>
            <input
              type="file"
              onChange={(e) => setArchivo(e.target.files?.[0] || null)}
              className="p-1"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Subir Story
          </button>
        </form>

        {mensaje && <p className="mt-4 text-center text-sm">{mensaje}</p>}
      </div>
    </>
  );
};

export default CrearStory;