"use client";

import React, { useState } from "react";

const Publicacion = () => {
  const [contenido, setContenido] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState("");

  const determinarTipoArchivo = (archivo: File | null) => {
    if (!archivo) return "text"; 
    const mimeType = archivo.type;
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("video/")) return "video";
    return "text"; 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = "08968922-f677-45b4-b0ef-28cdea5c963d";
    const type = determinarTipoArchivo(archivo);

    const body = {
      userId,
      content: contenido,
      type,
    };

    try {
      let response;
      if (archivo) {
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
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Crear Publicación</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="contenido" className="text-sm font-medium text-gray-700">
          Escribe tu publicación aquí
        </label>
        <textarea
          id="contenido"
          className="p-2 border rounded"
          placeholder="Escribe tu publicación aquí..."
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          required
        ></textarea>

        <label htmlFor="archivo" className="text-sm font-medium text-gray-700">
          Adjuntar archivo (opcional)
        </label>
        <input
          id="archivo"
          type="file"
          onChange={(e) => setArchivo(e.target.files?.[0] || null)}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Publicar
        </button>
      </form>

      {mensaje && <p className="mt-4 text-center text-sm">{mensaje}</p>}
    </div>
  );
};

export default Publicacion;
