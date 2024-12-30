"use client";

import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

export default function PerfilComponent() {
  const { userData } = useContext(UserContext);

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="min-h-screen">
      <section className="flex flex-col justify-center items-center gap-3 md:gap-4 pt-3 md:pt-4 px-4">
        <h1 className="font-bold text-xl md:text-2xl">@{userData.username}</h1>
        <div className="w-32 h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-black shadow-md">
          <Image
            src={userData.profile_image}
            alt="Foto de perfil"
            width={600}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>
        <h2 className="text-lg font-bold md:text-xl lg:text-2xl">
          {userData.fullname}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <article className="text-center w-24 md:w-28">
            <p className="text-lg font-bold md:text-xl">1000</p>
            <p>Amigos</p>
          </article>
          <article className="text-center w-24 md:w-28">
            <p className="text-lg font-bold md:text-xl">1000</p>
            <p>Seguidores</p>
          </article>
          <article className="text-center w-24 md:w-28">
            <p className="text-lg font-bold md:text-xl">1000</p>
            <p>Publicaciones</p>
          </article>
        </div>
        <div className="px-2 text-center">
          <p>{userData.description}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/pasareladepago"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
          >
            Verificar cuenta
          </Link>
          <Link
            href="/editarperfil"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700"
          >
            Editar perfil
          </Link>
        </div>
        <div className="w-full px-2 text-center">
          {userData.interests && userData.interests.length > 0 && (
            <p>
              <span className="font-bold">Intereses: </span>
              {userData.interests.map((interest) => interest.name).join(", ")}
            </p>
          )}
        </div>

        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <button>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
              <Image
                src={userData.profile_image}
                alt="Foto de perfil"
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center">
              <Link href={"/crear-story"}>
              <Image
                src="/addhistoria.png"
                alt="Añadir historia"
                width={20}
                height={20}
                className="object-cover"
              />
              </Link>
            </div>
          </button>
        </div>
      </section>
    </main>
  );
}
