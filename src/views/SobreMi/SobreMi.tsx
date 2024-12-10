"use client"
import Image from "next/image";

export default function SobreMi() {
  return (
    <div>
      <div className="flex flex-col items-center mt-10 mb-5">
        <div>
          <Image
            src="/favicon.ico"
            alt="Snappy logo"
            width={300}
            height={301}
          />
        </div>
      </div>
      <main className="flex justify-center w-full">
        <div className="flex flex-col items-center w-96 gap-5">
          <h2 className="font-bold text-xl mt-10"> Escribe una breve descripción sobre ti</h2>
  
          <div>
            <input
              className="w-80 h-32 border border-gray-400 rounded-md p-2"
              type="text"
              placeholder="220 caracteres"
              maxLength={220}
            />
          </div>

          <button
            className="w-80 h-12 bg-black border border-none rounded-md text-xl text-white"
            type="submit"
          >
            Siguiente
          </button>
        </div>
      </main>
    </div>
  );
}

