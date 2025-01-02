"use client";

import { UserContext } from "@/context/UserContext";
import { showCustomToast } from "@/components/Notificacion";
import { validacionInputs } from "@/helpers/validacionInputs";
import { IUserDataGoogle } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

export default function CompletarRegistro() {
  const { userGoogle, setToken, setUserId } = useContext(UserContext);
  const [showOtherGender, setShowOtherGender] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserDataGoogle>();

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "otro") {
      setShowOtherGender(true);
    } else {
      setShowOtherGender(false);
    }
  };

  const onSubmit = async (data: IUserDataGoogle) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { picture, ...updatedUserGoogle } = {
      ...userGoogle,
      username: data.username,
      birthdate: data.birthdate,
      genre: data.genre,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserGoogle),
        }
      );

      if (response.ok) {
        const result = await response.json();
        const { token, userId } = result;

        if (token) {
          Cookies.set("auth_token", token, {
            expires: 1,
            path: "/",
            secure: true,
            sameSite: "None",
          });
          setToken(token);
          setUserId(userId);
        }

        showCustomToast("Snappy", "Registro con Google exitoso", "success");
        router.push("/socialfeed");
      } else {
        const error = await response.json();
        showCustomToast(
          "Snappy",
          error.message || "Hubo un error en el registro",
          "error"
        );
      }
    } catch (error) {
      console.error("Error al completar el registro:", error);
      showCustomToast("Snappy", "Hubo un error inesperado", "error");
    }
  };

  if (!userGoogle) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-10 min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full sm:w-[400px] my-4">
        <header className="w-full mb-10">
          <div className="flex flex-col items-center">
            <div>
              <h1 className="text-3xl font-bold">Completar Registro</h1>
            </div>
          </div>
        </header>

        <main className="flex justify-center w-full">
          <div className="flex flex-col items-center w-full gap-5">
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label>
                  Nombre de usuario
                  <input
                    className={`w-full h-12 border rounded-md p-2 ${
                      errors.username ? "border-red-600" : "border-gray-400"
                    }`}
                    type="text"
                    placeholder="Nombre de usuario"
                    defaultValue={userGoogle.username}
                    {...register("username", validacionInputs.username)}
                  />
                </label>
                {errors.username && (
                  <span className="text-red-600 text-sm">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div>
                <label>
                  Fecha de nacimiento
                  <input
                    className={`w-full h-12 border rounded-md p-2 ${
                      errors.birthdate ? "border-red-600" : "border-gray-400"
                    }`}
                    type="date"
                    defaultValue={userGoogle.birthdate}
                    {...register("birthdate", validacionInputs.birthdate)}
                  />
                </label>
                {errors.birthdate && (
                  <span className="text-red-600 text-sm">
                    {errors.birthdate.message}
                  </span>
                )}
              </div>

              <div className="flex gap-1 flex-wrap">
                <p className="w-full">Género</p>
                <div className="flex w-full gap-2">
                  <label className="flex-1 p-2 border border-gray-400 rounded-sm flex items-center gap-2">
                    <input
                      type="radio"
                      value="hombre"
                      defaultChecked={userGoogle.genre === "hombre"}
                      {...register("genre", validacionInputs.genre)}
                      onChange={handleGenderChange}
                    />
                    Hombre
                  </label>
                  <label className="flex-1 p-2 border border-gray-400 rounded-sm flex items-center gap-2">
                    <input
                      type="radio"
                      value="mujer"
                      defaultChecked={userGoogle.genre === "mujer"}
                      {...register("genre", validacionInputs.genre)}
                      onChange={handleGenderChange}
                    />
                    Mujer
                  </label>
                  <label className="flex-1 p-2 border border-gray-400 rounded-sm flex items-center gap-2">
                    <input
                      type="radio"
                      value="otro"
                      defaultChecked={userGoogle.genre === "otro"}
                      {...register("genre", validacionInputs.genre)}
                      onChange={handleGenderChange}
                    />
                    Otro
                  </label>
                </div>

                {showOtherGender && (
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Especifica tu género"
                      className="w-full h-12 border rounded-md p-2 border-gray-400"
                    />
                  </div>
                )}

                {errors.genre && (
                  <span className="text-red-600 text-sm">
                    {errors.genre.message}
                  </span>
                )}
              </div>

              <div>
                <button
                  className={`w-full h-12 bg-black border border-none rounded-md text-xl text-white ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registrando..." : "Completar Registro"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
