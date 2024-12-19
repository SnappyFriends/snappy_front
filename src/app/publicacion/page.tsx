"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

const Publicacion = () => {
  const [contenido, setContenido] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState("");
  const {userId} = useContext(UserContext)
 
  const determinarTipoArchivo = (archivo: File | null) => {
    if (!archivo) return "asdsd"; // Si no hay archivo, es texto puro
    const mimeType = archivo.type;
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("video/")) return "video";
    return "asdsd"; // Otro tipo no definido
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const Id = userId;
    const file = determinarTipoArchivo(archivo);

    const body = {
      userId: Id,
      content: contenido,
      fileUrl: file
    };

    try {
      let response;
      
        // Envío en formato JSON si no hay archivo
        console.log(JSON.stringify(body))
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      

      if (response.ok) {
        setMensaje("Publicación creada con éxito.");
        setContenido("");
        setArchivo(null);
      } else {
        setMensaje("Error al crear la publicación.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Ocurrió un error al enviar la información.");
    }
  };

  return (
    <>
    <Navbar/>
    <Sidebar/>
    
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Crear Publicación</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Textarea para el contenido */}
        <textarea
          className="p-2 border rounded"
          placeholder="Escribe tu publicación aquí..."
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          required
        ></textarea>

        {/* Input para adjuntar archivo */}
        <input
          type="file"
          onChange={(e) => setArchivo(e.target.files?.[0] || null)}
          className="p-2 border rounded"
        />

        {/* Botón de enviar */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Publicar
        </button>
      </form>

      {/* Mensajes */}
      {mensaje && <p className="mt-4 text-center text-sm">{mensaje}</p>}
    </div>
    </>
  );
};

export default Publicacion;
