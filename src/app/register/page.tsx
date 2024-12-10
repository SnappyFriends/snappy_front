"use client";

import FooterLoginRegister from "@/components/FooterLoginRegister";
import HeaderLoginRegister from "@/components/HeaderLoginRegister";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex flex-col items-center justify-center gap-16 min-h-screen">
      <HeaderLoginRegister />
      <main className="flex justify-center w-full">
        <div className="flex flex-col items-center w-96 gap-5">
          <h2 className="font-bold text-xl">Crea una cuenta</h2>

          <form
            className="flex flex-col gap-4 w-80"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                className="w-full h-12 border border-gray-400 rounded-md p-2"
                type="text"
                placeholder="Nombre y apellido"
                {...register("nombre", { required: true })}
              />
              {errors.nombre && (
                <span className="text-red-600 text-sm">
                  El nombre y apellido es requerido
                </span>
              )}
            </div>

            <div>
              <input
                className="w-full h-12 border border-gray-400 rounded-md p-2"
                type="date"
                placeholder="Fecha de nacimiento"
                {...register("fechaDeNacimiento", { required: true })}
              />
              {errors.nombre && (
                <span className="text-red-600 text-sm">
                  La fecha de nacimiento es requerida
                </span>
              )}
            </div>

            {/* <div>
              <select
                className="w-full h-12 border border-gray-400 rounded-md p-2"
                {...register("genero", { required: true })}
              >
                <option value="">Selecciona tu género</option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
              </select>
            </div> */}

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
              <input
                type="radio"
                value="hombre"
                {...register("genero", { required: true })}
              />
              Hombre
              </label>
              <label className="flex items-center gap-2">
              <input
                type="radio"
                value="mujer"
                {...register("genero", { required: true })}
              />
              Mujer
              </label>
              <label className="flex items-center gap-2">
              <input
                type="radio"
                value="otro"
                {...register("genero", { required: true })}
              />
              Otro
              </label>
              {errors.genero && (
              <span className="text-red-600 text-sm">
                El género es requerido
              </span>
              )}
            </div>

            <div>
              <input
                className="w-full h-12 border border-gray-400 rounded-md p-2"
                type="email"
                placeholder="Correo electrónico"
                {...register("correoElectronico", { required: true })}
              />
              {errors.nombre && (
                <span className="text-red-600 text-sm">
                  El correo electrónico es requerido
                </span>
              )}
            </div>

            <div>
              <input
                className="w-full h-12 border border-gray-400 rounded-md p-2"
                type="password"
                placeholder="Contraseña"
                {...register("contrasena", { required: true })}
              />
              {errors.nombre && (
                <span className="text-red-600 text-sm">
                  La contraseña es requerida
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
                type="submit"
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
