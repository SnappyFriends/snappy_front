import Image from "next/image";

export default function Login() {
  return (
    <main className="flex justify-center w-full bg-red-400">
      <div className="flex flex-col items-center bg-blue-700 w-96 gap-5 mt-16 mb-16">
        <h2 className="font-bold text-xl">Ingresa a tu cuenta</h2>
        <form className="bg-yellow-400 flex flex-col gap-4 w-80">
          <div>
            <input
              className="w-full h-12 border border-gray-400 rounded-sm p-2"
              type="email"
              placeholder="Correo electrónico"
            />
          </div>
          <div>
            <input
              className="w-full h-12 border border-gray-400 rounded-sm p-2"
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
            <button
              className="w-full h-12 bg-[#42b72a] border border-none rounded-md text-xl text-white"
              type="submit"
            >
              Crear cuenta nueva
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
