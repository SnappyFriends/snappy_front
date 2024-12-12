"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const ActivityView = () => {

    const connectedUsers = [
        { id: 1, name: "Sofia Black", imgSrc: "/agregarfoto.png", status: "online" },
        { id: 2, name: "Alex Green", imgSrc: "/agregarfoto.png", status: "online" },
        { id: 3, name: "Luna Blue", imgSrc: "/agregarfoto.png", status: "online" },
        { id: 4, name: "Sofia Black", imgSrc: "/agregarfoto.png", status: "online" },
        { id: 5, name: "Alex Green", imgSrc: "/agregarfoto.png", status: "online" },
        { id: 6, name: "Luna Blue", imgSrc: "/agregarfoto.png", status: "online" },
    ];

  return (
    <div>
    <Navbar/>
    <div className="flex min-h-screen relative items-center">
      <div className="hidden md:block w-full max-w-sm bg-white rounded-lg p-6 ml-auto">
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
            <Image
              src="/mas.jpg"
              alt="Crear publicación"
              width={24} height={24}
            />
            <Link href=""><p>Crear publicación</p></Link>
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
            <Image src="/mensajes.png" alt="Mensajes" width={24} height={24} />
            <Link href="/mensajesprivados"><p>Mensajes</p></Link>
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
            <Image
              src="/notificaciones.png"
              alt="Notificaciones"
              width={24} height={24}
            />
            <Link href="/notificaciones"><p>Notificaciones</p></Link>
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
            <Image
              src="/rueda.png"
              alt="Configuración"
              width={24} height={24}
            />
            <Link href="/editarperfil"><p>Configuración</p></Link>
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
            <Image src="/flecha.png" alt="No sabemos" width={24} height={24} />
            <Link href="/newchat"><p>SNAPPEAR</p></Link>
          </div>
          
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Actividad</h1>
        <div className="flex justify-center space-x-4 mb-6">
          <button className="px-4 py-2 bg-black text-white rounded-full">Category</button>
          <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Category</button>
          <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Category</button>
          <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Category</button>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-10 h-10">
                <Image
                  src="/agregarfoto.png"
                  alt="starryskies23"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h2 className="text-sm font-semibold">starryskies23</h2>
                <p className="text-xs text-gray-500">Te comenzó a seguir • 1d</p>
              </div>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">Seguir</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-10 h-10">
                <Image
                  src="/agregarfoto.png"
                  alt="nebulanomad"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h2 className="text-sm font-semibold">nebulanomad</h2>
                <p className="text-xs text-gray-500">Liked your post • 1d</p>
              </div>
            </div>
            <div className="relative w-12 h-12">
              <Image
                src="/agregarfoto.png"
                alt="Post thumbnail"
                layout="fill"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-10 h-10">
                <Image
                  src="/agregarfoto.png"
                  alt="lunavoyager"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h2 className="text-sm font-semibold">lunavoyager</h2>
                <p className="text-xs text-gray-500">Te envió una solicitud • 3d</p>
              </div>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">Aceptar</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-10 h-10">
                <Image
                  src="/agregarfoto.png"
                  alt="shadowlynx"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h2 className="text-sm font-semibold">shadowlynx</h2>
                <p className="text-xs text-gray-500">Commented on your post • 4d</p>
                <p className="text-xs text-gray-700 mt-1">I’m going in September. What about you?</p>
              </div>
            </div>
            <div className="relative w-12 h-12">
              <Image
                src="/agregarfoto.png"
                alt="Post thumbnail"
                layout="fill"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-10 h-10">
                <Image
                  src="/agregarfoto.png"
                  alt="emberecho"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h2 className="text-sm font-semibold">emberecho</h2>
                <p className="text-xs text-gray-500">Liked your comment • 2d</p>
                <p className="text-xs text-gray-700 mt-1">Happy birthday!!!...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-full max-w-sm bg-white rounded-lg p-6 mr-auto space-y-4">
        {connectedUsers.map((user) => (
          <Link href="/newchat" key={user.id} className="flex items-center space-x-4 ml-40">
            <div className="relative w-12 h-12">
              <Image
                src={user.imgSrc}
                alt={user.name}
                layout="fill"
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold">{user.name}</h3>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </Link>
        ))}
      </div>
            
    </div>
    </div>
  );
};

export default ActivityView;
