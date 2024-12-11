"use client";
import HeaderLoginRegister from "@/components/HeaderLoginRegister";

export default function UserNameView() {
  return (
    <div className="min-h-screen flex flex-col mt-8">
      <HeaderLoginRegister />

      <main className="h-screen flex flex-col items-center justify-start pt-24">
        <div className="flex flex-col items-center w-96 gap-5">
          <h2 className="font-bold text-xl mt-5">Elige tu nombre de usuario</h2>

          <form className="flex flex-col items-center gap-4">
            <input
              className="w-80 h-12 border border-gray-400 rounded-md p-2"
              type="text"
              name="username"
              placeholder="Nombre de Usuario"
              required
            />

            <button
              className="w-80 h-12 bg-black border border-none rounded-md text-xl text-white"
              type="submit"
            >
              Siguiente
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
