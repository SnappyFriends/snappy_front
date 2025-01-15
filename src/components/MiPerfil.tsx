import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function MiPerfil() {
  return (
    <main className="bg-gray-500 flex flex-col items-center p-4 min-h-screen pt-40">
      {/* Contenedor principal del perfil */}
      <div className="bg-white w-[400px] rounded-lg shadow-md p-4">
        {/* Contenedor de la foto y datos básicos */}
        <div className="flex flex-col items-center">
          {/* Foto de perfil */}
          <div className="relative w-32 h-32 overflow-hidden rounded-full">
            <Image
              src="/foto.jpg"
              alt="Foto de perfil"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Nombre y apellido */}
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold">Juan Pérez</h2>
            <p className="text-gray-600">Desarrollador Frontend</p>
          </div>

          {/* Descripción del perfil */}
          <div className="mt-2 text-center">
            <p className="text-gray-700">
              Apasionado por la tecnología y el diseño web. Creo interfaces
              modernas y funcionales con React, Next.js y Tailwind CSS.
            </p>
          </div>
        </div>

        {/* Contenedor de métricas */}
        <div className="flex justify-between mt-6">
          <div className="bg-blue-800 text-white w-28 p-2 rounded-md text-center">
            <p>Amigos</p>
            <p className="font-bold text-xl">1000</p>
          </div>
          <div className="bg-blue-800 text-white w-28 p-2 rounded-md text-center">
            <p>Seguidores</p>
            <p className="font-bold text-xl">1001</p>
          </div>
          <div className="bg-blue-800 text-white w-28 p-2 rounded-md text-center">
            <p>Publicaciones</p>
            <p className="font-bold text-xl">100</p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between mt-4">
          <Link
            href="/pasareladepago"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Verifica tu cuenta
          </Link>
          <Link
            href="/editarperfil"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md"
          >
            Editar perfil
          </Link>
        </div>
      </div>
    </main>
  );
}
