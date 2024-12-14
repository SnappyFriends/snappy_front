"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const ChatView = () => {
  return (
    <div>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-md w-1/2 max-w-lg min-h-[50vh]">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center">
            <div className="relative w-12 h-12">
              <Image
                src="/agregarfoto.png" 
                alt="Foto de perfil"
                layout="fill"
                className="rounded-full object-cover"
              />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold">Helena Hills</h1>
              <p className="text-sm text-gray-500">Activo(a) ahora</p>
            </div>
          </div>
          <Link href="/inprogress">
  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition">
    Enviar solicitud
  </button>
</Link>
        </div>

        <div className="flex-1 px-4 py-6 overflow-y-auto min-h-[60vh]">
          <p className="text-center text-gray-400">Inicia tu conversación con Helena</p>
        </div>

        <div className="px-4 py-3 border-t flex items-center">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center ml-3 space-x-3">
            <Link href="/microfono">
              <div className="relative w-6 h-6">
                <Image
                  src="/microfono.png" 
                  alt="Microfono"
                  layout="fill"
                  className="object-contain"
                />
              </div>
            </Link>
            <Link href="/emoji">
              <div className="relative w-6 h-6">
                <Image
                  src="/cara-feliz.png" 
                  alt="Emoji"
                  layout="fill"
                  className="object-contain"
                />
              </div>
            </Link>
            <Link href="/fotos">
              <div className="relative w-6 h-6">
                <Image
                  src="/galeria-de-imagenes.png" 
                  alt="Galeria"
                  layout="fill"
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChatView;