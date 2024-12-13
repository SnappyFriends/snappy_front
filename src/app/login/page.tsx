"use client";

import HeaderLoginRegister from "@/components/HeaderLoginRegister";
import Image from "next/image";
import FooterLoginRegister from "../../components/FooterLoginRegister";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { IFormDataLogin } from "@/interfaces/types";
import { useRouter } from "next/navigation";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormDataLogin>();

  const router = useRouter();

  const onSubmit = async (data: IFormDataLogin) => {
    try {
      const response = await fetch(
        "https://snappy-back-si83.onrender.com/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Credenciales inválidas. Inténtalo de nuevo.");
      }

      const result = await response.json();
      console.log("🚀 ~ onSubmit ~ result:", result)

      // Guardar token o sesión según la respuesta del backend
      // localStorage.setItem("token", result.token);

      alert("Inicio de sesión exitoso");
      router.push("/loadingbar");
    } catch (error) {
      alert(`Error al iniciar sesión: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-16 min-h-screen">
      <HeaderLoginRegister />
      <main className="flex justify-center w-full">
        <div className="flex flex-col items-center w-96 gap-5">
          <h2 className="font-bold text-xl">Ingresa a tu cuenta</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-80"
          >
            <div>
              <input
                className={`w-full h-12 border rounded-md p-2 ${
                  errors.email ? "border-red-600" : "border-gray-400"
                }`}
                type="email"
                placeholder="Correo electrónico"
                {...register("email", {
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Por favor, ingresa un correo electrónico válido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {typeof errors.email?.message === "string" &&
                    errors.email.message}
                </span>
              )}
            </div>
            <div>
              <input
                className={`w-full h-12 border rounded-md p-2 ${
                  errors.email ? "border-red-600" : "border-gray-400"
                }`}
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                    message:
                      "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un carácter especial",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {typeof errors.password?.message === "string" &&
                    errors.password.message}
                </span>
              )}
            </div>
            <div>
              <button
                className="w-full h-12 bg-black border border-none rounded-md text-xl text-white"
                type="submit"
              >
                Iniciar sesión
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
                href="/register"
                className="w-full h-12 border border-[#0866ff] rounded-md text-xl text-[#0866ff] flex items-center justify-center"
              >
                Crear cuenta nueva
              </Link>
            </div>
          </form>
        </div>
      </main>
      <FooterLoginRegister />
    </div>
  );
}
