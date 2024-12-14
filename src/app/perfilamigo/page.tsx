"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const ProfileView = () => {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen relative">
        <div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 absolute left-6 top-1/2 transform -translate-y-1/2">
          <div className="space-y-8">
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/usuario.png" alt="Perfil" width={24} height={24} />
              <Link href="/miperfil">Perfil</Link>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/home.png" alt="Inicio" width={24} height={24} />
              <Link href="/socialfeed">Inicio</Link>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/mas.jpg" alt="Crear publicación" width={24} height={24} />
              <Link href="/inprogress">Crear publicación</Link>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/mensajes.png" alt="Mensajes" width={24} height={24} />
              <Link href="/mensajesprivados">Mensajes</Link>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/notificaciones.png" alt="Notificaciones" width={24} height={24} />
              <Link href="/notificaciones">Notificaciones</Link>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/rueda.png" alt="Configuración" width={24} height={24} />
              <Link href="/editarperfil">Configuración</Link>
            </div>
            <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
              <Image src="/flecha.png" alt="Snappear" width={24} height={24} />
              <Link href="/newchat">SNAPPEAR</Link>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center p-6 min-h-screen">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mt-10">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-center flex-1">Katy Swift</h1>
              <div className="relative w-6 h-6">
                <Image src="/rueda.png" alt="Configuración" fill className="object-contain" />
              </div>
            </div>

            <div className="flex flex-col items-center mt-4">
              <div className="flex items-center w-full">
                <div className="relative w-24 h-24 mr-6">
                  <Image
                    src="/agregarfoto.png"
                    alt="Foto de perfil"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                <div className="flex justify-evenly flex-1 text-center">
                  <div className="space-y-0.5">
                    <Link href="/listacontactos">
                    <p className="text-sm font-bold text-gray-800">Amigos</p>
                    <p className="text-lg font-bold">101</p>
                    </Link>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-gray-800">Seguidores</p>
                    <p className="text-lg font-bold">20k</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-gray-800">Post</p>
                    <p className="text-lg font-bold">22</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Link href="/inprogress">
                <button className="bg-black text-white py-2 px-4 rounded-lg">
                  Pregunta anónima
                </button>
                </Link>
              </div>
            </div>

            <div className="border-t my-6"></div>

            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/agregarfoto.png"
                      alt="Foto de perfil"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-sm font-semibold">Katy</h2>
                    <p className="text-xs text-gray-500">3 min ago</p>
                  </div>
                </div>
                <div className="relative w-6 h-6">
                  <Image
                    src="/puntos.png"
                    alt="Opciones del post"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="relative mt-4 w-full h-80">
                <Image
                  src="/fotofeed.png"
                  alt="Post image"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <p className="mt-4 text-sm text-gray-700">Descripción del post</p>

              <div className="flex items-center mt-4 text-gray-500">
                <div className="flex items-center mr-6">
                  <div className="relative w-5 h-5 mr-1">
                    <Image
                      src="/me-gusta.png"
                      alt="Likes"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p>21 likes</p>
                </div>
                <div className="flex items-center">
                  <div className="relative w-5 h-5 mr-1">
                    <Image
                      src="/comentario.png"
                      alt="Comentarios"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p>4 comments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
