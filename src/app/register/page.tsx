"use client";

import FooterLoginRegister from "@/components/FooterLoginRegister";
import HeaderLoginRegister from "@/components/HeaderLoginRegister";
import { IFormDataRegister, IValidateAge } from "@/interfaces/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormDataRegister>();

  const onSubmit = (data: IFormDataRegister) => console.log(data);

  const validateAge: IValidateAge = (value) => {
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const isBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    return (
      (isBirthdayPassed ? age : age - 1) >= 13 || "Debes tener al menos 13 años"
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-16 min-h-screen">
      <HeaderLoginRegister />
      <main className="flex justify-center w-full">
        <div className="flex flex-col items-center w-96 gap-5">
          <h2 className="font-bold text-xl">Crea una cuenta</h2>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                className={`w-full h-12 border rounded-md p-2 ${
                  errors.nombre ? "border-red-600" : "border-gray-400"
                }`}
                type="text"
                placeholder="Nombre y apellido"
                {...register("nombre", {
                  required: "El nombre y apellido es obligatorio",
                  pattern: {
                    value: /^[a-zA-ZÀ-ÿ\s]{2,}$/,
                    message:
                      "Debe contener solo letras y al menos dos palabras",
                  },
                })}
              />
              {errors.nombre && (
                <span className="text-red-600 text-sm">
                  {typeof errors.nombre?.message === "string" &&
                    errors.nombre.message}
                </span>
              )}
            </div>

            <div>
              <input
                className={`w-full h-12 border rounded-md p-2 ${
                  errors.fechaDeNacimiento
                    ? "border-red-600"
                    : "border-gray-400"
                }`}
                type="date"
                placeholder="Fecha de nacimiento"
                {...register("fechaDeNacimiento", {
                  required: "La fecha de nacimiento es obligatoria",
                  validate: {
                    validAge: (value) =>
                      validateAge(value) || "Debes tener al menos 13 años",
                  },
                })}
              />
              {errors.fechaDeNacimiento && (
                <span className="text-red-600 text-sm">
                  {typeof errors.fechaDeNacimiento?.message === "string" &&
                    errors.fechaDeNacimiento.message}
                </span>
              )}
            </div>

            <div className="flex gap-1 flex-wrap">
              <div>
                <label className="p-2 border border-gray-400 rounded-sm full flex items-center gap-2">
                  <input
                    type="radio"
                    value="hombre"
                    {...register("genero", {
                      required: "El género es obligatorio",
                    })}
                  />
                  Hombre
                </label>
              </div>
              <label className="p-2 border border-gray-400 rounded-sm full flex items-center gap-2">
                <input
                  type="radio"
                  value="mujer"
                  {...register("genero", {
                    required: "El género es obligatorio",
                  })}
                />
                Mujer
              </label>
              <label className="p-2 border border-gray-400 rounded-sm full flex items-center gap-2">
                <input
                  type="radio"
                  value="otro"
                  {...register("genero", {
                    required: "El género es obligatorio",
                  })}
                />
                Personalizado
              </label>
              {errors.genero && typeof errors.genero.message === "string" && (
                <span className="text-red-600 text-sm">
                  {errors.genero.message}
                </span>
              )}
            </div>

            <div>
              <input
                className={`w-full h-12 border rounded-md p-2 ${
                  errors.correoElectronico
                    ? "border-red-600"
                    : "border-gray-400"
                }`}
                type="email"
                placeholder="Correo electrónico"
                {...register("correoElectronico", {
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Por favor, ingresa un correo electrónico válido",
                  },
                })}
              />
              {errors.correoElectronico && (
                <span className="text-red-600 text-sm">
                  {typeof errors.correoElectronico?.message === "string" &&
                    errors.correoElectronico.message}
                </span>
              )}
            </div>

            <div>
              <input
                className={`w-full h-12 border rounded-md p-2 ${
                  errors.contrasena ? "border-red-600" : "border-gray-400"
                }`}
                type="password"
                placeholder="Contraseña"
                {...register("contrasena", {
                  required: "La contraseña es obligatoria",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                    message:
                      "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un carácter especial",
                  },
                })}
              />
              {errors.contrasena && (
                <span className="text-red-600 text-sm">
                  {typeof errors.contrasena?.message === "string" &&
                    errors.contrasena.message}
                </span>
              )}
            </div>

            <div>
              <button
                className="w-full h-12 bg-black border border-none rounded-md text-xl text-white"
                type="submit"
              >
                Registrarte
              </button>
            </div>

            <div>
              <button
                className="w-full h-12 bg-[#EEEEEE] border border-none rounded-md text-xl flex items-center justify-center gap-2"
                type="button"
              >
                <Image
                  src="/googlelogo.png"
                  alt="Google logo"
                  width={24}
                  height={24}
                />
                Continuar con Google
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
      <FooterLoginRegister />
    </div>
  );
}
