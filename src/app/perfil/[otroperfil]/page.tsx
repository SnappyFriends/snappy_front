"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUsersByUsername } from "@/helpers/users";
import { formatDistanceToNow } from "date-fns";
import Conectados from "@/components/Conectados";
import NotFound from "@/app/not-found";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";

interface UserData {
  fullname: string;
  username: string;
  profile_image: string;
  last_login_date?: string; 
}

const ProfileView = ({ params }: { params: Promise<{ otroperfil: string }> }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      if (resolvedParams.otroperfil) {
        setUsername(resolvedParams.otroperfil);
      }
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (username) {
      const fetchUser = async () => {
        try {
          const user = await getUsersByUsername(username);
          if (user) {
            setUserData(user[0]);
            console.log(`Esto es user: ${user}`);
          } else {
            return <NotFound/>;
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      };
      fetchUser();
    }
  }, [username]);
  
  if (!userData) {
    return 'Cargando...'
  }

  const lastLoginDate = userData.last_login_date
    ? new Date(userData.last_login_date)
    : null;

  const timeAgo = lastLoginDate
    ? formatDistanceToNow(lastLoginDate, { addSuffix: true })
    : "Fecha no disponible";

  return (
    <div>
      <NavBar />
      <div className="flex min-h-screen relative">
        <div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 absolute left-6 top-1/2 transform -translate-y-1/2">
       <Sidebar/>
       </div>

       <div className="flex-1 flex flex-col items-center p-6">
       <div className="bg-white rounded-lg p-6 w-full max-w-md mt-10">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-center flex-1">{userData.username}</h1>
            </div>

            <div className="flex flex-col items-center mt-4">
              <div className="flex items-center w-full">
                <div className="relative w-24 h-24 mr-6">
                  <Image
                    src="/agregarfoto.png"
                    alt={`Foto de perfil de ${userData.username}`}
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
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                    Enviar solicitud
                  </button>
                </Link>
                <Link href="/inprogress">
                  <button className="bg-black text-white py-2 px-4 ml-8 rounded-lg">
                    Pregunta anónima
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative mt-4 w-full h-80">
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
                    <h2 className="text-sm font-semibold">{userData.username}</h2>
                    <p className="text-xs text-gray-500">{timeAgo}</p>
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
                  <p>4 comentarios</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
        <Conectados />
      </div>

      </div>
    </div>
  );
};

export default ProfileView;
