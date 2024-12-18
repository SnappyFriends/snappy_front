"use client";

import Conectados from "@/components/Conectados";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

const Publicacion = () => {
  const [contenido, setContenido] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState("");

  const determinarTipoArchivo = (archivo: File | null) => {
    if (!archivo) return "text"; // Si no hay archivo, es texto puro
    const mimeType = archivo.type;
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("video/")) return "video";
    return "text"; // Otro tipo no definido
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = "08968922-f677-45b4-b0ef-28cdea5c963d";
    const type = determinarTipoArchivo(archivo);

    const body = {
      userId,
      content: contenido,
      type: "text",
    };

    try {
      let response;
      if (archivo) {
        // Envío con FormData si hay archivo
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("content", contenido);
        formData.append("type", type);
        formData.append("archivo", archivo);

        response = await fetch("https://snappy-back-si83.onrender.com/posts", {
          method: "POST",
          body: formData,
        });
      } else {
        // Envío en formato JSON si no hay archivo
        response = await fetch("https://snappy-back-si83.onrender.com/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

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
    <Conectados/>
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
