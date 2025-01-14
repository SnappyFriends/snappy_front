"use client";

import { UserContext } from "@/context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IFormDataLogin } from "@/interfaces/types";
import { validacionInputs } from "@/helpers/validacionInputs";
import { showCustomToast } from "./Notificacion";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getUserById } from "@/services/userService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ConfiguracionComponent() {
  const { userId, setUserId, setToken, setUserData } =
    useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IFormDataLogin>();

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const user = await getUserById(userId);
          setValue("email", user.email);
          setLoading(false);
          console.log(user);
        } catch (error) {
          console.error("Error al cargar los datos del usuario", error);
        }
      };
      fetchUserData();
    }
  }, [userId, setValue]);

  const onSubmit = async (data: IFormDataLogin) => {
    if (!userId) {
      console.error("No se encontró el ID del usuario.");
      return;
    }

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => key !== "password" || value !== ""
      )
    );

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

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Error al eliminar la cuenta: ${response.statusText} (${response.status})`
        );
      }

      Cookies.remove("auth_token");
      localStorage.removeItem("userId");
      setToken(null);
      setUserId(null);
      setUserData(null);
      showCustomToast("Snappy", "Cuenta eliminada correctamente", "success");
      router.push("/");
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      showCustomToast(
        "Snappy",
        "Ocurrió un error al intentar eliminar la cuenta",
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
    <div className="flex justify-center items-center w-full mb-16">
      <main className="w-full max-w-md">
        <h2 className="font-bold text-2xl text-center mb-6">Configuración</h2>

        <form
          className="flex flex-col gap-4 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <hr />
          <button
            className="w-full h-12 bg-red-600 text-white font-semibold rounded-md"
            type="button"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            Eliminar cuenta
          </button>
        </form>

        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
              <p className="mb-4">
                ¿Estás seguro de que quieres eliminar tu cuenta?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={handleDeleteAccount}
                >
                  Sí, eliminar
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={() => setShowDeleteConfirmation(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
