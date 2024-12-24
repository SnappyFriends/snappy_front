"use client";

import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

export default function NavBar() {
  const { userData } = useContext(UserContext);

  return (
    <nav className="h-14 px-2 fixed bottom-0 w-full md:flex md:justify-center border bg-white">
      <div className="flex justify-between items-center h-full w-full md:w-[48rem]">
        <Link href="/socialfeed">
          <Image src="/home.png" width={40} height={40} alt="Home" />
        </Link>
        <Link href="/chatsprivados" className="relative">
          <Image src="/chats.png" width={40} height={40} alt="Chats privados" />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            6
          </span>
        </Link>
        <Link href="/newchat">
          <Image src="/snappear.png" width={40} height={40} alt="Snappear" />
        </Link>
        <Link href="/notificaciones" className="relative">
          <Image src="/bell.png" width={40} height={40} alt="Notificaciones" />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            9
          </span>
        </Link>
        <Link href="/miperfil">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={userData?.profile_image || "/no_img.png"}
              width={40}
              height={40}
              alt="Mi perfil"
              className="object-cover w-full h-full"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}
