"use client";

import { UserContext } from "@/context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IUserData } from "@/interfaces/types";
import { getUserById } from "@/helpers/users";
import { validacionInputs } from "@/helpers/validacionInputs";
import { showCustomToast } from "./Notificacion";
import { useRouter } from "next/navigation";
import FotoDePerfil from "./FotoDePerfil";
import Intereses from "./Intereses";
import { getLocation } from "@/helpers/location";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ActualizarPerfil() {
  const { userData, setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showOtherGender, setShowOtherGender] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number }|unknown>();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IUserData>();

  useEffect(() => {
    if (userData?.id) {
      const fetchUserData = async () => {
        try {
          const user = await getUserById(userData.id);
          setValue("fullname", user.fullname);
          setValue("birthdate", user.birthdate);
          setValue("genre", user.genre);
          setValue("username", user.username);
          setValue("description", user.description);
          setLoading(false);
        } catch (error) {
          console.error("Error al cargar los datos del usuario", error);
        }
      };

      const fetchLocation = async () => {
        try {
          const coords = await getLocation();
          setLocation(coords);
          console.log("Ubicación capturada: ", coords);
        } catch (error) {
          console.error("Error al obtener la ubicación:", error);
        }
      };
      fetchUserData();
      fetchLocation();
    }
  }, [userData?.id, setValue]);

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowOtherGender(e.target.value === "otro");
  };

  const onSubmit = async (data: IUserData) => {
    if (!userData?.id) {
      console.error("No se encontró el ID del usuario.");
      return;
    }
    data.location = location;
    console.log(data)
    
    const updatedData = {
      ...data, 
    };

    try {
      const response = await fetch(`${API_URL}/users/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar los cambios: ${response.statusText} (${response.status})`);
      }

      setUserData({
        ...userData,
        fullname: data.fullname,
        username: data.username,
        description: data.description,
        birthdate: data.birthdate,
        genre: data.genre,
        location: data.location,
      });

      showCustomToast("Snappy", "Datos guardados correctamente", "success");
      router.push("/miperfil");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      showCustomToast(
        "Snappy",
        "Ocurrió un error al guardar los cambios",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando...
      </div>
    );
  }

  
  return (
    <main className="pt-4 min-h-screen flex flex-col items-center mb-4">
      <h2 className="font-bold text-2xl text-center mb-4">Editar perfil</h2>

      <FotoDePerfil />

      <form
        className="flex flex-col gap-4 px-2 w-full max-w-3xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {/* <input
            type="hidden"
            {...register("location.latitude")}
            value={location?.latitude || ""}
          />
          <input
            type="hidden"
            {...register("location.longitude")}
            value={location?.longitude || ""}
          /> */}
          <label className="block text-sm font-medium mb-1">
            Nombre de usuario
          </label>
          <input
            className={`w-full h-12 border rounded-md p-2 ${errors.username ? "border-red-600" : "border-gray-400"}`}
            type="text"
            {...register("username", validacionInputs.username)}
          />
          {errors.username && (
            <span className="text-red-600 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Nombre completo
          </label>
          <input
            className={`w-full h-12 border rounded-md p-2 ${errors.fullname ? "border-red-600" : "border-gray-400"}`}
            type="text"
            {...register("fullname", validacionInputs.fullname)}
          />
          {errors.fullname && (
            <span className="text-red-600 text-sm">
              {errors.fullname.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Presentación</label>
          <textarea
            className={`w-full h-32 border rounded-md p-2 ${errors.description ? "border-red-600" : "border-gray-400"}`}
            placeholder="Escribe una breve descripción sobre ti"
            {...register("description", validacionInputs.description)}
          />
          {errors.description && (
            <span className="text-red-600 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Fecha de nacimiento
          </label>
          <input
            className={`w-full h-12 border rounded-md p-2 ${errors.birthdate ? "border-red-600" : "border-gray-400"}`}
            type="date"
            {...register("birthdate", validacionInputs.birthdate)}
          />
          {errors.birthdate && (
            <span className="text-red-600 text-sm">
              {errors.birthdate.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Género</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <label className="flex-1 p-2 border rounded-md flex items-center gap-2">
              <input
                type="radio"
                value="hombre"
                {...register("genre", validacionInputs.genre)}
                onChange={handleGenderChange}
              />
              Hombre
            </label>
            <label className="flex-1 p-2 border rounded-md flex items-center gap-2">
              <input
                type="radio"
                value="mujer"
                {...register("genre", validacionInputs.genre)}
                onChange={handleGenderChange}
              />
              Mujer
            </label>
            <label className="flex-1 p-2 border rounded-md flex items-center gap-2">
              <input
                type="radio"
                value="otro"
                {...register("genre", validacionInputs.genre)}
                onChange={handleGenderChange}
              />
              Otro
            </label>
          </div>

          {showOtherGender && (
            <input
              type="text"
              placeholder="Especifica tu género"
              className="w-full h-12 border rounded-md p-2 border-gray-400 mt-2"
            />
          )}

          {errors.genre && (
            <span className="text-red-600 text-sm">{errors.genre.message}</span>
          )}
        </div>

        <Intereses />

        <div className="flex flex-col gap-4">
          <button
            className={`w-full h-12 bg-black text-white font-semibold rounded-md hover:bg-gray-800 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </button>
          <button
            className="w-full h-12 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500"
            type="button"
            onClick={() => router.push("/miperfil")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}
