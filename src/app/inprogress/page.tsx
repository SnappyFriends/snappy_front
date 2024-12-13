
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";


const InProgress = () => {
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
            <Image src="/logochatsnuevos.png" alt="No sabemos" width={24} height={24} />
            <Link href="/newchat"><p>SNAPPEAR</p></Link>
          </div>
        </div>
      </div>
      <main className="flex-grow bg-white p-8 flex justify-center items-center">
  <div className="text-center max-w-xl">
    <h1 className="text-2xl font-semibold text-gray-700 leading-relaxed">
      Con el Team de SNAPPY FRIENDS estamos trabajando en esta funcionalidad
      para que pronto puedas disfrutarla
    </h1>
  </div>
</main>

    


    </div>
    </div>
  );
};

export default InProgress;