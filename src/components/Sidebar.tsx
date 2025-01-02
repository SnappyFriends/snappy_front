import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 absolute left-6 top-1/2 transform -translate-y-1/2 mt-20">
      <div className="space-y-8">
        <Link href="/miperfil" className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
          <Image src="/usuario.png" alt="Perfil" width={24} height={24} />
          <span>Perfil</span>
        </Link>
        <Link href="/socialfeed" className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
          <Image src="/home.png" alt="Inicio" width={24} height={24} />
          <span>Inicio</span>
        </Link>
        <Link href="/crearpublicacion" className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
          <Image src="/mas.jpg" alt="Crear publicación" width={24} height={24} />
          <span>Crear publicación</span>
        </Link>
        <Link href="/crear-story" className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
          <Image src="/mas.jpg" alt="Crear story" width={24} height={24} />
          <span>Crear story</span>
        </Link>
        <Link href="/mensajesprivados" className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
          <Image src="/mensajes.png" alt="Mensajes" width={24} height={24} />
          <span>Mensajes</span>
        </Link>
        <Link href="/chatgrupal" className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
          <Image src="/chat-grupal.png" alt="Chat Grupal" width={24} height={24} />
          <span>Chat Grupal</span>
        </Link>
        <Link href="/notificaciones" className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
          <Image src="/notificaciones.png" alt="Notificaciones" width={24} height={24} />
          <span>Notificaciones</span>
        </Link>
        <Link href="/editarperfil" className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
          <Image src="/rueda.png" alt="Configuración" width={24} height={24} />
          <span>Configuración</span>
        </Link>
        <Link href="/pasareladepago" className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
          <Image src="/membresia.png" alt="Membresía Premium" width={24} height={24} />
          <span>Membresía Premium</span>
        </Link>
        <Link href="/newchat" className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
          <Image src="/snappear.png" alt="Snappear" width={24} height={24} />
          <span>SNAPPEAR</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
