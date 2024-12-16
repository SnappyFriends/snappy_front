"use client";

import HeaderLoginRegister from "@/components/HeaderLoginRegister";
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

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormDataLogin>();

  const router = useRouter();

  const useUserContext = useContext(UserContext);
  if (!useUserContext) {
    throw new Error(
      "UserContext no está disponible. Asegúrate de envolver este componente en un UserProvider."
    );
  }
  const { setToken } = useUserContext;

  const onSubmit = async (data: IFormDataLogin) => {
    try {
      const resultado = await loginUser(data);
      const { token } = resultado;

      if (token) {
        Cookies.set("auth_token", token, { expires: 1 });
        setToken(token);
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
              <label>
                Correo electrónico
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
                      message:
                        "Por favor, ingresa un correo electrónico válido",
                    },
                  })}
                />
              </label>
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {typeof errors.email?.message === "string" &&
                    errors.email.message}
                </span>
              )}
            </div>
            <div>
              <label>
                Contraseña
                <input
                  className={`w-full h-12 border rounded-md p-2 ${
                    errors.email ? "border-red-600" : "border-gray-400"
                  }`}
                  type="password"
                  placeholder="Contraseña"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                      message:
                        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
                    },
                  })}
                />
              </label>
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
                  src="/logochatsnuevos.png"
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
  );
}
