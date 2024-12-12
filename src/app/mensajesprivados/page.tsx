import React from "react";
import Image from "next/image";

export default function MensajesPrivados() {
  return (
    <>
      <nav className="h-16 flex justify-center items-center">
        <form className="w-full px-4 flex justify-center items-center">
          <input
            type="text"
            className="border border-gray-500 border-r-transparent rounded-full rounded-e-none h-10 w-full px-4"
            placeholder="Buscar chat"
          />
          <button
            type="submit"
            className="border border-gray-500  h-10 w-11 border-l-transparent rounded-full rounded-s-none"
          >
            <Image
              src="/lupa.png"
              width={20}
              height={20}
              alt="lupa"
              className="cursor-pointer"
            ></Image>
          </button>
        </form>
      </nav>

      <main className="">
        <div>
          <h2 className="text-center my-2">Mensajes</h2>
          <section className="h-20 flex justify-between items-center px-4">
            <div className="flex space-x-4 items-center">
              <div>
                <Image
                  src="/taylorswift.jpg"
                  width={1000}
                  height={1000}
                  alt="fotodeperfil"
                  className="rounded-full w-16 h-16 object-cover"
                ></Image>
              </div>
              <div className="font-bold">
                <h2>Sofia Black</h2>
                <p>Hola, ¿cómo estás?</p>
              </div>
            </div>
            <div className="font-bold">
              <p>12:00</p>
            </div>
          </section>
          <hr className="border-[#EEEEEE]" />
        </div>
      </main>

      <div className="fixed bottom-0 w-full h-20 bg-white">
        <div className="flex justify-between items-center h-full px-4">
          <Image src="/home.png" width={50} height={50} alt="home" className="self-center" />
          <Image src="/chat.png" width={50} height={50} alt="chats" className="self-center" />
          <Image src="/logochatsnuevos.png" width={50} height={50} alt="chats nuevos" className="self-center" />
          <Image src="/bell.png" width={50} height={50} alt="notificaciones" className="self-center" />
          <Image src="/user.png" width={50} height={50} alt="perfil" className="self-center" />
        </div>
      </div>
    </>
  );
}
