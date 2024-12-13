"use client";

import FooterLoginRegister from "@/components/FooterLoginRegister";
import HeaderLoginRegister from "@/components/HeaderLoginRegister";
import { validateAge } from "@/helpers/validacionEdad";
import { IFormDataRegister } from "@/interfaces/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormDataRegister>();

  const router = useRouter();

  const onSubmit = (data: IFormDataRegister) => {
    // AQUI VA LA LOGICA DE REGISTRO
    console.log(data);
    if (data) {
      // alert("Registrado correctamente");
      // router.push("/username");
    }
  };

  const [showOtherGender, setShowOtherGender] = useState(false);

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "otro") {
      setShowOtherGender(true);
    } else {
      setShowOtherGender(false);
    }
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
              <label>
                Nombre completo
                <input
                  className={`w-full h-12 border rounded-md p-2 ${
                    errors.nombreCompleto ? "border-red-600" : "border-gray-400"
                  }`}
                  type="text"
                  placeholder="Nombre y apellido"
                  {...register("nombreCompleto", {
                    required: "El nombre y apellido es obligatorio",
                    pattern: {
                      value: /^[a-zA-ZÀ-ÿ\s]{2,}$/,
                      message:
                        "Debe contener solo letras y al menos dos palabras",
                    },
                  })}
                />
              </label>
              {errors.nombreCompleto && (
                <span className="text-red-600 text-sm">
                  {typeof errors.nombreCompleto?.message === "string" &&
                    errors.nombreCompleto.message}
                </span>
              )}
            </div>

            <div>
              <label>
                Fecha de nacimiento
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
              </label>
              {errors.fechaDeNacimiento && (
                <span className="text-red-600 text-sm">
                  {typeof errors.fechaDeNacimiento?.message === "string" &&
                    errors.fechaDeNacimiento.message}
                </span>
              )}
            </div>

            <div className="flex gap-1 flex-wrap">
              <p className="w-full">Género</p>
              <div>
                <label className="p-2 border border-gray-400 rounded-sm full flex items-center gap-2">
                  <input
                    type="radio"
                    value="hombre"
                    {...register("genero", {
                      required: "El género es obligatorio",
                    })}
                    onChange={handleGenderChange}
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
                  onChange={handleGenderChange}
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
                  onChange={handleGenderChange}
                />
                Otro
              </label>

              {showOtherGender && (
                <div>
                  <input
                    type="text"
                    placeholder="Especifica tu género"
                    className="w-full h-12 border rounded-md p-2 border-gray-400"
                  />
                </div>
              )}

              {errors.genero && typeof errors.genero.message === "string" && (
                <span className="text-red-600 text-sm">
                  {errors.genero.message}
                </span>
              )}
            </div>

            <div>
              <label>
                Correo electrónico
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
                      message:
                        "Por favor, ingresa un correo electrónico válido",
                    },
                  })}
                />
              </label>
              {errors.correoElectronico && (
                <span className="text-red-600 text-sm">
                  {typeof errors.correoElectronico?.message === "string" &&
                    errors.correoElectronico.message}
                </span>
              )}
            </div>

            <div>
              <label>
                Contraseña
                <input
                  className={`w-full h-12 border rounded-md p-2 ${
                    errors.contrasena ? "border-red-600" : "border-gray-400"
                  }`}
                  type="password"
                  placeholder="Contraseña"
                  {...register("contrasena", {
                    required: "La contraseña es obligatoria",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                      message:
                        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial",
                    },
                  })}
                />
              </label>
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
