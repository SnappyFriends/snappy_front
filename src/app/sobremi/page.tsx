"use client";
import Image from "next/image";

export default function SobreMi() {
  return (
    <div className="h-screen flex flex-col mt-8">
      <div className="flex flex-col items-center py-5">
        <div>
          <Image
            src="/favicon.ico"
            alt="Snappy logo"
            width={120}
            height={120}
          />
        </div>
        <div>
          <Image
            src="/logo.png"
            alt="Snappy logo"
            width={200}
            height={200}
          />
        </div>
      </div>
      <main className="flex flex-1 justify-center items-center">
        <div className="flex flex-col items-center w-96 gap-5">
          <h2 className="font-bold text-xl text-center">
            Escribe una breve descripción sobre ti
          </h2>
          <form className="w-full flex flex-col items-center gap-5">
            <textarea
              name="description"
              className="w-80 h-32 border border-gray-400 rounded-md p-2 resize-none"
              placeholder="220 caracteres"
              maxLength={220}
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
