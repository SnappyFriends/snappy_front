import HeaderLoginRegister from "@/components/HeaderLoginRegister";
import Image from "next/image";
import FooterLoginRegister from "../../components/FooterLoginRegister";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 min-h-screen">
      <HeaderLoginRegister />
      <main className="flex justify-center w-full">
        <div className="flex flex-col items-center w-96 gap-5">
          <h2 className="font-bold text-xl">Ingresa a tu cuenta</h2>
          <form className="flex flex-col gap-4 w-80">
            <div>
              <input
                className="w-full h-12 border border-gray-400 rounded-md p-2"
                type="email"
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <input
                className="w-full h-12 border border-gray-400 rounded-md p-2"
                type="password"
                placeholder="Contraseña"
              />
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
