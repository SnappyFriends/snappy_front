import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NavBarResponsive() {
  return (
    <header>
      <nav className="flex justify-between items-center px-10 shadow-md h-20">
        <div id="logoynombre" className="flex items-center">
          <Image src="/favicon.ico" width={60} height={60} alt="snappy logo" />
          <h1 className="font-bold text-2xl">SNAPPY</h1>
        </div>

        <div id="barradebusqueda">
          <form className="flex">
            <input
              type="text"
              placeholder="Buscar..."
              className="h-11 border w-96 bg-gray-100 border-gray-500 border-r-transparent rounded-e-none rounded-full px-3"
            />
            <button
              type="submit"
              className="border bg-gray-100 border-gray-500 h-11 w-11 border-l-transparent rounded-full rounded-s-none flex items-center justify-center"
            >
              <Image
                src="/lupa.png"
                width={25}
                height={25}
                alt="lupa"
                className=""
              />
            </button>
          </form>
        </div>

        <div>
          <ul className="flex justify-center items-center">
            <li className="mr-5">
              <Link href="/">
                <Image src="/home.png" width={40} height={40} alt="home" />
              </Link>
            </li>
            <li className="mr-5">
              <Link href="/mensajesprivados">
                <Image src="/chatsprivados.png" width={40} height={40} alt="chats privados" />
              </Link>
            </li>
            <li className="mr-5">
            <Link href="/newchat">
                <Image src="/logochatsnuevos.png" width={50} height={40} alt="snappear" />
              </Link>
            </li>
            <li className="mr-5">
            <Link href="/notificaciones">
                <Image src="/bell.png" width={40} height={40} alt="notificaciones" />
              </Link>
            </li>
            <li>
            <Link href="/">
                <Image src="/user.png" width={40} height={40} alt="foto de perfil" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
