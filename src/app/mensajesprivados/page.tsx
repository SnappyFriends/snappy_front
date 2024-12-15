"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Conectados from "@/components/Conectados";

export default function MensajesPrivados() {


  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 justify-center items-center">
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
              <Image src="/logochatsnuevos.png" alt="Snappear" width={24} height={24} />
              <Link href="/newchat">SNAPPEAR</Link>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="w-full md:w-1/3 p-4">
            <nav className="h-16 flex justify-center items-center">
              <form className="w-full flex">
                <input
                  type="text"
                  className="border border-gray-500 border-r-transparent rounded-full rounded-e-none h-10 w-full px-4"
                  placeholder="Buscar chat"
                />
                <button
                  type="submit"
                  className="border border-gray-500 h-10 w-11 border-l-transparent rounded-full rounded-s-none"
                  aria-label="Buscar chat"
                  title="Buscar chat"
                >
                  <Image
                    src="/lupa.png"
                    width={20}
                    height={20}
                    alt="Buscar"
                    className="cursor-pointer"
                  />
                </button>
              </form>
            </nav>

            <main>
              <div>
                <h2 className="text-center my-2">Mensajes</h2>
                {Array.from({ length: 5 }).map((_, index) => (
                  <section
                    key={index}
                    className="h-20 flex justify-between items-center px-4"
                  >
                    <div className="flex space-x-4 items-center">
                      <div>
                        <Image
                          src="/taylorswift.jpg"
                          width={1000}
                          height={1000}
                          alt="fotodeperfil"
                          className="rounded-full w-16 h-16 object-cover"
                        />
                      </div>
                      <div className="font-bold">
                        <h2>Sofia Black</h2>
                        <p>Hola, ¿cómo estás?</p>
                      </div>
                    </div>
                    <div className="font-bold">
                      <p>12:00</p>
                    </div>
                  </section>
                ))}
                <hr className="border-[#EEEEEE]" />
              </div>
            </main>
          </div>
        </div>

        <div className="hidden md:flex flex-col w-64 bg-white p-4 space-y-4 justify-center items-center mr-40 mt-20">
          <Conectados/>
        </div>
      </div>
    </>
  );
}
