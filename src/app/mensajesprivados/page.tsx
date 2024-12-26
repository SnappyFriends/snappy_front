"use client";
import React from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Conectados from "@/components/Conectados";
import Sidebar from "@/components/Sidebar";

export default function MensajesPrivados() {
  return (
    <>
      <NavBar />
      
      <div className="flex min-h-screen relative">
        
        <div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 fixed left-6 top-1/2 transform -translate-y-1/2">
          <Sidebar />
        </div>

        <div className="flex-1 flex justify-center mt-20">
          <div className="w-full md:w-2/4 p-6">
            
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
                <h2 className="text-center my-2 text-lg font-semibold text-gray-800">
                  Mensajes
                </h2>
                {Array.from({ length: 5 }).map((_, index) => (
                  <section
                    key={index}
                    className="h-20 flex justify-between items-center px-4 border-b border-[#EEEEEE]"
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
                      <div>
                        <h2 className="font-bold text-sm text-gray-900">Sofia Black</h2>
                        <p className="text-xs text-gray-500">Hola, ¿cómo estás?</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">12:00</div>
                  </section>
                ))}
              </div>
            </main>
          </div>
        </div>

        <div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-40">
          <Conectados />
        </div>
      </div>
    </>
  );
}
