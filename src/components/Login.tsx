"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { IFormDataLogin } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import { showCustomToast } from "@/components/Notificacion";
import { loginUser } from "@/services/loginService";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Cookies from "js-cookie";
import { validacionInputs } from "@/helpers/validacionInputs";

export default function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormDataLogin>();

  const router = useRouter();
  const useUserContext = useContext(UserContext);
  
  if (!useUserContext) {
    throw new Error(
      "UserContext no está disponible. Asegúrate de envolver este componente en un UserProvider."
    );
  }
  const { setToken, setUserId } = useUserContext;

  const onSubmit = async (data: IFormDataLogin) => {
    try {
      const resultado = await loginUser(data);
      const { token, userId } = resultado;

      if (token) {
        Cookies.set("auth_token", token, { expires: 1 });
        setToken(token);
        setUserId(userId);
      }

      console.log("🚀 ~ onSubmit ~ resultado TRY LOGIN.TSX:", resultado);

      showCustomToast("Snappy", "Iniciaste sesión correctamente", "success");
      router.push("/loadingbar");
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error CATCH LOGIN.TSX:", error);
      showCustomToast("Snappy", "Usuario o contraseña incorrectos", "error");
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
            <h2 className="font-bold text-xl">Ingresa a tu cuenta</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 w-full"
            >
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
                  {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                </button>
              </div>
              <div>
                <button
                  className="w-full h-12 bg-[#EEEEEE] border border-none rounded-md text-xl flex items-center justify-center gap-2"
                  type="button"
                >
                  <Image
                    src="/google.png"
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
      </div>
    </div>
  );
}
