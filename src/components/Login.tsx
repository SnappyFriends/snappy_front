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
import { GoogleLogin } from "@react-oauth/google";

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
  const { setToken, setUserId, setUserGoogle } = useUserContext;

  const onSubmit = async (data: IFormDataLogin) => {
    try {
      const resultado = await loginUser(data);
      console.log("🚀 ~ onSubmit ~ resultado:", resultado)
      const { token, userId } = resultado;

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

      showCustomToast("Snappy", "Iniciaste sesión correctamente", "success");
      router.push("/loading");
    } catch {
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
                <div>
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      const { credential } = credentialResponse;
                      try {
                        const response = await fetch(
                          `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ token: credential }),
                          }
                        );

                        if (response.ok) {
                          const responseData = await response.json();
                          console.log("🚀 ~ onSuccess={ ~ responseData:", responseData)

                          if (responseData.token) {
                            const { token, userId } = responseData;
                            Cookies.set("auth_token", token, {
                              expires: 1,
                              path: "/",
                              secure: true,
                              sameSite: "None",
                            });
                            setToken(token);
                            setUserId(userId);

                            showCustomToast(
                              "Snappy",
                              "Inicio de sesión con Google exitoso",
                              "success"
                            );
                            router.push("/loadingbar");
                          } else {
                            const { email, googleId, picture, fullname } =
                              responseData;
                            setUserGoogle({
                              email,
                              googleId,
                              picture,
                              fullname,
                              username: "",
                              profile_image: picture || "",
                              birthdate: "",
                              genre: "",
                            });

                            router.push("/completarregistro");
                          }
                        } else {
                          throw new Error("Error al autenticar con Google");
                        }
                      } catch (error) {
                        console.error("Error en Google Login:", error);
                        showCustomToast(
                          "Snappy",
                          "Hubo un error al autenticar con Google",
                          "error"
                        );
                      }
                    }}
                    onError={() => {
                      showCustomToast(
                        "Snappy",
                        "Inicio de sesión con Google fallido",
                        "error"
                      );
                    }}
                    shape="pill"
                    text="continue_with"
                  />
                </div>
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
