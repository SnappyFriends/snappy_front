import Link from "next/link"
import Image from "next/image"

const Sidebar = () =>{

    return(
        <div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 absolute left-6 top-1/2 transform -translate-y-1/2">
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
            <Link href="/crearpublicacion">Crear publicación</Link>
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
            <Image src="/mensajes.png" alt="Mensajes" width={24} height={24} />
            <Link href="/mensajesprivados">Mensajes</Link>
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
            <Image src="/chat-grupal.png" alt="Snappear" width={24} height={24} />
            <Link href="/chatgrupal">Chat Grupal</Link>
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
            <Image src="/membresia.png" alt="Snappear" width={24} height={24} />
            <Link href="/pasareladepago">Membresía Premium</Link>
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
            <Image src="/logochatsnuevos.png" alt="Snappear" width={24} height={24} />
            <Link href="/newchat">SNAPPEAR</Link>
          </div>
        
          
        </div>
      </div>

    )
}

export default Sidebar