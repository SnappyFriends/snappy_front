"use client";
import React from "react";
import Image from "next/image";

const ProfileView = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">

     
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mt-10">
      
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-center flex-1">Katy Swift</h1>
          <div className="relative w-6 h-6">
            <Image
              src="/rueda.png"
              alt="Configuración"
              layout="fill"
              className="object-contain"
            />
          </div>
        </div>

        
        <div className="flex flex-col items-center mt-4">
         
          <div className="flex items-center w-full">
            
            <div className="relative w-24 h-24 mr-6">

      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        {/* Profile Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative w-16 h-16">

              <Image
                src="/agregarfoto.png"
                alt="Foto de perfil"
                layout="fill"
                className="rounded-full object-cover"
              />
            </div>


            
            <div className="flex justify-evenly flex-1 text-center">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-gray-800">Amigos</p>
                <p className="text-lg font-bold">101</p>
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
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
              Verifica tu cuenta
            </button>
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
                  layout="fill"
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
                layout="fill"
                className="object-contain"
              />
            </div>
          </div>

         
          <div className="relative mt-4 w-full h-80">
            <Image
              src="/fotofeed.png"
              alt="Post image"
              layout="fill"
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
                  layout="fill"
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
                  layout="fill"
                  className="object-contain"
                />
              </div>
              <p>4 comments</p>
            </div>

            <div className="ml-4">
              <h1 className="text-xl font-semibold">Katy Swift</h1>
            </div>
          </div>
          <div className="relative w-6 h-6">
            <Image
              src="/rueda.png" // Imagen "rueda.png" reemplazando el signo más
              alt="Configuración"
              layout="fill"
              className="object-contain"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mt-4">
  <div className="text-center">
    <p className="text-sm text-gray-500">Amigos</p> {/* Coloca el texto encima */}
    <p className="text-lg font-semibold">101</p>
  </div>
  <div className="text-center">
    <p className="text-sm text-gray-500">Seguidores</p> {/* Coloca el texto encima */}
    <p className="text-lg font-semibold">20k</p>
  </div>
  <div className="text-center">
    <p className="text-sm text-gray-500">Post</p> {/* Coloca el texto encima */}
    <p className="text-lg font-semibold">22</p>
  </div>
</div>

        {/* Verify Button */}
        <div className="mt-4 flex justify-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Verifica tu cuenta
          </button>
        </div>
      </div>

      {/* Post Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mt-6 w-full max-w-md">
        {/* Post Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative w-10 h-10">
              <Image
                src="/agregarfoto.png" // Usa la misma imagen de perfil
                alt="Foto de perfil"
                layout="fill"
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
              src="/puntos.png" // Imagen "rueda.png" también aquí para consistencia
              alt="Opciones del post"
              layout="fill"
              className="object-contain"
            />
          </div>
        </div>

        {/* Post Image */}
        <div className="relative mt-4 w-full h-60">
          <Image
            src="/fotofeed.png"
            alt="Post image"
            layout="fill"
            className="rounded-lg object-cover"
          />
        </div>

        {/* Post Description */}
        <p className="mt-4 text-sm text-gray-700">Descripción del post</p>

        {/* Post Stats */}
        <div className="flex justify-between items-center mt-4 text-gray-500">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
            <p>21 likes</p>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 16h14"
              />
            </svg>
            <p>4 comments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
