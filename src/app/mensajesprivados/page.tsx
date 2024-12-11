import React from "react";
import Image from "next/image";

export default function MensajesPrivados() {
  return (
    <>
      <nav className="h-16 flex justify-center items-center ">
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

      <nav>
        <div className="bg-red-700">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white">
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
          </div>
        </div>
      </nav>
    </>
  );
}
