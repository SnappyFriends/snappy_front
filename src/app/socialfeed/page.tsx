"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";


const ProfileView = () => {
  return (
    <div>
    <Navbar/>
    <div className="flex  min-h-screen relative">
      
      <div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 absolute left-6 top-1/2 transform -translate-y-1/2">
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
            <Link href="/inprogress"><p>Crear publicación</p></Link>
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
            <Image src="/logochatsnuevos.png" alt="Snappear" width={24} height={24} />
            <Link href="/newchat"><p>SNAPPEAR</p></Link>
          </div>
        </div>
      </div>

      
      <div className="flex-1 flex flex-col items-center p-6  min-h-screen">
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

          
          <div className="flex justify-between mt-6 border-b">
            <button className="flex-1 py-2 text-center text-gray-500 hover:text-black">Following</button>
            <button className="flex-1 py-2 text-center text-black font-bold border-b-2 border-black">For you</button>
            <button className="flex-1 py-2 text-center text-gray-500 hover:text-black">Favorites</button>
          </div>

          
          <div className="mt-6 space-y-6">
         
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
                    <h2 className="text-sm font-semibold">Helena in Group name</h2>
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

              <p className="mt-4 text-sm text-gray-700">Post description</p>

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
              </div>
            </div>

            
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
                    <h2 className="text-sm font-semibold">Nigga in Group Name</h2>
                    <p className="text-xs text-gray-500">2 hrs ago</p>
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

              <p className="mt-4 text-sm text-gray-700">Body text for a post. Since it’s a social app, sometimes it’s a hot take, and sometimes it’s a question.</p>

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
                  <p>6 likes</p>
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
                  <p>18 comments</p>
                </div>
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