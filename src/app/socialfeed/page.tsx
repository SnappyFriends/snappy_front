"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Conectados from "@/components/Conectados"; 
const ProfileView = () => {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen relative items-center">
        <div className="hidden md:block w-full max-w-sm bg-white rounded-lg ml-12 space-y-6">
          <div className="space-y-8">
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/usuario.png" alt="Perfil" width={24} height={24} />
              <Link href="/miperfil"><p>Perfil</p></Link>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/home.png" alt="Inicio" width={24} height={24} />
              <Link href="/socialfeed"><p>Inicio</p></Link>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/mas.jpg" alt="Crear publicación" width={24} height={24} />
              <Link href="/inprogress"><p>Crear publicación</p></Link>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/mensajes.png" alt="Mensajes" width={24} height={24} />
              <Link href="/mensajesprivados"><p>Mensajes</p></Link>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/notificaciones.png" alt="Notificaciones" width={24} height={24} />
              <Link href="/notificaciones"><p>Notificaciones</p></Link>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/rueda.png" alt="Configuración" width={24} height={24} />
              <Link href="/editarperfil"><p>Configuración</p></Link>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/logochatsnuevos.png" alt="Snappear" width={24} height={24} />
              <Link href="/newchat"><p>SNAPPEAR</p></Link>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="flex-1 flex flex-col items-center p-6 min-h-screen">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mt-10">
            <div className="flex justify-center space-x-4 mb-6">
              <div className="relative w-16 h-16">
                <Image
                  src="/agregarusuario.png"
                  alt="Foto 1"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="relative w-16 h-16">
                <Image
                  src="/agregarfoto.png"
                  alt="Foto 2"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="relative w-16 h-16">
                <Image
                  src="/agregarfoto.png"
                  alt="Foto 3"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="relative w-16 h-16">
                <Image
                  src="/agregarfoto.png"
                  alt="Foto 4"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="relative w-16 h-16">
                <Image
                  src="/agregarfoto.png"
                  alt="Foto 5"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6 border-b">
            <button className="flex-1 py-2 text-center text-gray-500 hover:text-black">
              Siguiendo
            </button>
            <button className="flex-1 py-2 text-center text-black font-bold border-b-2 border-black">
              Para ti 
            </button>
            <button className="flex-1 py-2 text-center text-gray-500 hover:text-black">
              Favoritos
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative w-10 h-10">
                    <Image src="/agregarfoto.png" alt="starryskies23" layout="fill" className="rounded-full object-cover" />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-sm font-semibold">starryskies23</h2>
                    <p className="text-xs text-gray-500">Te comenzó a seguir • 1d</p>
                  </div>
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">Seguir</button>
              </div>
              
              <div className="relative w-full h-80 mt-4">
                <Image src="/fotofeed.png" alt="Post image" layout="fill" className="rounded-lg object-cover" />
              </div>

              <div className="relative w-6 h-6 mt-4">
                <Image src="/puntos.png" alt="Opciones del post" layout="fill" className="object-contain" />
              </div>

              <p className="mt-4 text-sm text-gray-700">Hermoso viaje a Japon en el verano!</p>

              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-gray-500">2 Comentarios</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs">Comentar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-full max-w-sm bg-white rounded-lg p-6 ml-40 space-y-4">
          <Conectados /> 
        </div>
      </div>
    </div>
  );
};

export default ProfileView;