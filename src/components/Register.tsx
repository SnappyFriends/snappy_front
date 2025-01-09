"use client";

import { showCustomToast } from "@/components/Notificacion";
import { UserContext } from "@/context/UserContext";
import { validacionInputs } from "@/helpers/validacionInputs";
import { IFormDataRegister } from "@/interfaces/types";
import { registerUser } from "@/services/registerService";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormDataRegister>();
  const { setUserId } = useContext(UserContext);
  const router = useRouter();
  const [showOtherGender, setShowOtherGender] = useState(false);

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "otro") {
      setShowOtherGender(true);
    } else {
      setShowOtherGender(false);
    }
  };

  const onSubmit = async (data: IFormDataRegister) => {
    try {
      const resultado = await registerUser(data);
      const { id } = resultado;
      setUserId(id ?? null);

      showCustomToast("Snappy", "¡Registro exitoso!", "success");
      router.push("/subirfoto");
    } catch (error) {
      showCustomToast(
        "Snappy",
        `${(error as Error).message || "Hubo un error inesperado."}`,
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-10 min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="hidden sm:block">
        <Image src="/banner.png" width={400} height={400} alt="banner" />
      </div>
      <div className="w-full sm:w-[400px] my-4">
        <header className="w-full mb-10">
          <div className="flex flex-col items-center">
            <div>
              <Image
                src="/favicon.ico"
                alt="Snappy logo"
                width={150}
                height={150}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">SNAPPY FRIENDS</h1>
            </div>
          </div>
        </header>

        <main className="flex justify-center w-full">
          <div className="flex flex-col items-center w-full gap-5">
            <h2 className="font-bold text-xl">Crea una cuenta</h2>

            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label>
                  Nombre completo
                  <input
                    className={`w-full h-12 border rounded-md p-2 ${
                      errors.fullname ? "border-red-600" : "border-gray-400"
                    }`}
                    type="text"
                    placeholder="Nombre y apellido"
                    {...register("fullname", validacionInputs.fullname)}
                  />
                </label>
                {errors.fullname && (
                  <span className="text-red-600 text-sm">
                    {errors.fullname.message}
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
                      {...register("genre", validacionInputs.genre)}
                      onChange={handleGenderChange}
                    />
                    Hombre
                  </label>
                  <label className="flex-1 p-2 border border-gray-400 rounded-sm flex items-center gap-2">
                    <input
                      type="radio"
                      value="mujer"
                      {...register("genre", validacionInputs.genre)}
                      onChange={handleGenderChange}
                    />
                    Mujer
                  </label>
                  <label className="flex-1 p-2 border border-gray-400 rounded-sm flex items-center gap-2">
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
                <label>
                  Correo electrónico
                  <input
                    className={`w-full h-12 border rounded-md p-2 ${
                      errors.email ? "border-red-600" : "border-gray-400"
                    }`}
                    type="email"
                    placeholder="Correo electrónico"
                    {...register("email", validacionInputs.email)}
                  />
                </label>
                {errors.email && (
                  <span className="text-red-600 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label>
                  Nombre de usuario
                  <input
                    className={`w-full h-12 border rounded-md p-2 ${
                      errors.username ? "border-red-600" : "border-gray-400"
                    }`}
                    type="text"
                    placeholder="Nombre de usuario"
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
                  Contraseña
                  <input
                    className={`w-full h-12 border rounded-md p-2 ${
                      errors.password ? "border-red-600" : "border-gray-400"
                    }`}
                    type="password"
                    placeholder="Contraseña"
                    {...register("password", validacionInputs.password)}
                  />
                </label>
                {errors.password && (
                  <span className="text-red-600 text-sm">
                    {errors.password.message}
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
                  {isSubmitting ? "Registrando..." : "Registrarte"}
                </button>
              </div>

              <hr className="border-[#EEEEEE]" />

              <div>
                <Link
                  href="/login"
                  className="w-full h-12 border border-[#0866ff] rounded-md text-xl text-[#0866ff] flex items-center justify-center"
                >
                  ¿Tienes una cuenta? Entrar
                </Link>
              </div>
            </form>
          </div>
        </main>

        <footer className="w-full flex justify-center mt-10">
          <div className="w-full max-w-md">
            <p className="text-center">
              Al registrarte, aceptas nuestras{" "}
              <Link href="/terminos" className="text-blue-700">
                Condiciones
              </Link>{" "}
              y nuestra{" "}
              <Link href="/terminos" className="text-blue-700">
                Política de privacidad
              </Link>
              .
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
