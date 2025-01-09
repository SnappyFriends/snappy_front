"use client";

import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col bg-white text-black h-full">
      <header className="w-full py-6 bg-white text-center">
        <h1 className="text-4xl font-bold">Bienvenido al Dashboard</h1>
        <p className="text-lg mt-2">
          Gestiona y supervisa funcionalidades desde aquí
        </p>
      </header>

      <main className="flex-1 p-8">
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white border border-black text-black shadow-md rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold">Usuarios</h2>
            <p className="mt-2 text-center">
              Administra los usuarios de tu plataforma.
            </p>
            <Link href="/dashboard/usuarios">
              <button className="mt-4 px-6 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white">
                Gestionar usuarios
              </button>
            </Link>
          </div>

          <div className="bg-white border border-black text-black shadow-md rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold">Publicaciones</h2>
            <p className="mt-2 text-center">
              Visualiza y elimina publicaciones.
            </p>
            <Link href="/dashboard/publicaciones">
              <button className="mt-4 px-6 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white">
                Gestionar publicaciones
              </button>
            </Link>
          </div>

          <div className="bg-white border border-black text-black shadow-md rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold">Reportes</h2>
            <p className="mt-2 text-center">
              Revisa y responde a los reportes de usuarios.
            </p>
            <Link href="/dashboard/reportes">
              <button className="mt-4 px-6 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white">
                Ver reportes
              </button>
            </Link>
          </div>
          <div className="bg-white border border-black text-black shadow-md rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold">Suscripciones</h2>
            <p className="mt-2 text-center">
              Mira en detalle el historial de suscripciones.
            </p>
            <Link href="/dashboard/suscripciones">
              <button className="mt-4 px-6 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white">
                Gestionar suscripciones
              </button>
            </Link>
          </div>

          <div className="bg-white border border-black text-black shadow-md rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold">Intereses</h2>
            <p className="mt-2 text-center">
              Personaliza los intereses segun los usuarios.
            </p>
            <Link href="/dashboard/intereses">
              <button className="mt-4 px-6 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white">
                Configurar intereses
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
