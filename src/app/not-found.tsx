import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      
      <Image
        src="/favicon.ico" 
        alt="Logo"
        width={150}
        height={150}
        className="mb-6"
      />
      
    
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Página no encontrada</p>
      <p className="mb-4">Lo sentimos, la página que estás buscando no existe.</p>
      <Link href="/socialfeed" className="text-blue-500 underline">
        Volver al inicio
      </Link>
    </div>
  );
}
