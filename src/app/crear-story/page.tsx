"use client";

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
  const [isUploading, setIsUploading] = useState(false);
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

    setIsUploading(true);

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
        setPreview(null);
        setIsUploading(false);
        router.push("/miperfil");
      } else {
        setMensaje("Error al crear la story.");
        console.log("Error en la API:", responseData);
        setIsUploading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Ocurrió un error al enviar la información.");
      setIsUploading(false);
    }
  };

  return (
    <>
      <div
        className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg h-auto max-h-[500px] overflow-y-auto"
        style={{ minHeight: "300px" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Crear Snappy Moment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="p-2 border rounded flex flex-col items-start">
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
                className="w-32 h-32 object-cover border rounded" // Imagen más pequeña
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
            className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition flex justify-center items-center ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Subiendo...
              </>
            ) : (
              "Subir Moment"
            )}
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
