"use client";

import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import React, { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { showCustomToast } from "@/components/Notificacion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CrearStory = () => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); 
  const [mensaje, setMensaje] = useState("");
  const [content, setContent] = useState("");
  const { userId } = useContext(UserContext);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setArchivo(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string); 
      };
      reader.readAsDataURL(file); 
    } else {
      setPreview(null);
    }
  };

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
        setPreview(null); // Resetea la previsualización
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

      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Crear Snappy Moment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="p-2 border rounded flex flex-col items-start">
            <span className="mb-2 text-sm">
              Sube tu archivo (imagen o video):
            </span>
            <input
              type="file"
              accept="image/*,video/*" 
              onChange={handleFileChange}
              className="p-1"
              required
            />
          </label>

          {preview && (
            <div className="w-full flex justify-center mb-4">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full h-auto border rounded"
              />
            </div>
          )}

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
            Subir Moment
          </button>
        </form>

        {mensaje && (
          <p className="mt-4 text-center text-sm text-red-500">{mensaje}</p>
        )}
      
      </div>
    </>
  );
};

export default CrearStory;
