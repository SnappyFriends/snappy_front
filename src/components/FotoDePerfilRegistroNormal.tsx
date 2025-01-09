"use client";

import { UserContext } from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { showCustomToast } from "./Notificacion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FotoDePerfilRegistroNormal() {
  const { userData, setUserData } = useContext(UserContext);
  const [file, setFile] = useState<File | null>(null);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const isValidImage = selectedFile.type.startsWith("image/");
      if (!isValidImage) {
        alert("Por favor selecciona un archivo de imagen.");
        setFileSizeError(null);
        setFile(null);
        return;
      }

      if (selectedFile.size > 200 * 1024) {
        setFileSizeError("La imagen debe ser de máximo 200 KB.");
        setFile(null);
      } else {
        setFileSizeError(null);
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("fileImg", file);

    try {
      const response = await fetch(
        `${API_URL}/files/uploadProfileImage/${userData?.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to upload image: ${errorText}`);
      }

      const result = await response.json();

      if (result.profile_image) {
        console.log("Imagen cargada con éxito:", result.profile_image);
        if (userData) {
          setUserData({
            ...userData,
            profile_image: result.profile_image,
          });
        }

        router.push("/");
        showCustomToast("Snappy", "Foto de perfil actualizada", "success");
      } else {
        console.error(
          "La respuesta del servidor no incluye la URL de la imagen."
        );
        showCustomToast(
          "Snappy",
          "Error al actualizar la foto de perfil",
          "error"
        );
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      showCustomToast(
        "Snappy",
        "Error al actualizar la foto de perfil",
        "error"
      );
    }
  };

  return (
    <div className="mb-4">
      <div className="relative flex justify-center">
        <label
          htmlFor="fileImg"
          className="cursor-pointer w-80 h-80 flex justify-center items-center rounded-full overflow-hidden border-4 border-black bg-gray-200 hover:border-blue-500 hover:border-8 transition-colors duration-200"
        >
          <input
            id="fileImg"
            name="fileImg"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
          <Image
            src={userData?.profile_image || "/no_img.png"}
            alt="Foto de perfil"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </label>
      </div>

      {fileSizeError && (
        <p className="text-red-500 text-center text-sm">{fileSizeError}</p>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={handleUpload}
          disabled={!file || fileSizeError !== null}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50 transition-colors duration-200 hover:bg-blue-600"
        >
          Subir foto
        </button>
      </div>
    </div>
  );
}
