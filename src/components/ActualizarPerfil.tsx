"use client";

import { UserContext } from "@/context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IUserData } from "@/interfaces/types";
import { getUserById } from "@/helpers/users";
import { validacionInputs } from "@/helpers/validacionInputs";
import { showCustomToast } from "./Notificacion";

export default function ActualizarPerfil() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { userId } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showOtherGender, setShowOtherGender] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IUserData>();

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const user = await getUserById(userId);
          setValue("fullname", user.fullname);
          setValue("birthdate", user.birthdate);
          setValue("genre", user.genre);
          setValue("email", user.email);
          setValue("username", user.username);
          setLoading(false);
          console.log(user);
        } catch (error) {
          console.error("Error al cargar los datos del usuario", error);
        }
      };
      fetchUserData();
    }
  }, [userId, setValue]);

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowOtherGender(e.target.value === "otro");
  };

  const onSubmit = async (data: IUserData) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    if (!userId) {
      console.error("No se encontró el ID del usuario.");
      return;
    }

    // Excluir campos con valores vacíos, especialmente "password"
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => key !== "password" || value !== "")
  );
    console.log("🚀 ~ onSubmit ~ filteredData:", filteredData)
    console.log("🚀 ~ onSubmit ~ data:", data)
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });
      
      if (!response.ok) {
        throw new Error(
          `Error al guardar los cambios: ${response.statusText} (${response.status})`
        );
      }

      const result = await response.json();
      console.log("Cambios guardados exitosamente:", result);

      showCustomToast("Snappy", "Datos guardados correctamente", "success");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      showCustomToast(
        "Snappy",
        "Ocurrio un error al guardar los cambios",
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
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-100">
      <main className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="font-bold text-2xl text-center mb-6">Editar perfil</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre completo
            </label>
            <input
              className={`w-full h-12 border rounded-md p-2 ${
                errors.fullname ? "border-red-600" : "border-gray-400"
              }`}
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
            <label className="block text-sm font-medium mb-1">
              Fecha de nacimiento
            </label>
            <input
              className={`w-full h-12 border rounded-md p-2 ${
                errors.birthdate ? "border-red-600" : "border-gray-400"
              }`}
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
            <div className="flex gap-2">
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
              <span className="text-red-600 text-sm">
                {errors.genre.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              className={`w-full h-12 border rounded-md p-2 ${
                errors.email ? "border-red-600" : "border-gray-400"
              }`}
              type="email"
              {...register("email", validacionInputs.email)}
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre de usuario
            </label>
            <input
              className={`w-full h-12 border rounded-md p-2 ${
                errors.username ? "border-red-600" : "border-gray-400"
              }`}
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
              Nueva contraseña
            </label>
            <input
              className={`w-full h-12 border rounded-md p-2 ${
                errors.password ? "border-red-600" : "border-gray-400"
              }`}
              type="password"
              placeholder="Dejar en blanco para no cambiar"
              {...register("password", validacionInputs.passwordOptional)}
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            className={`w-full h-12 bg-black text-white font-semibold rounded-md ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </main>
    </div>
  );
}
