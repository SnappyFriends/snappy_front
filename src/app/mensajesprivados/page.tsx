import React from "react";
import Image from "next/image";

export default function MensajesPrivados() {
  return (
    <>
      <nav className="h-16 flex justify-center items-center ">
        <form className="w-96 flex justify-center items-center">
          <input
            type="text"
            className="border border-gray-500 border-r-transparent rounded-full rounded-e-none h-10 w-full p-4"
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
          <section className="h-20 flex justify-between items-center p-4">
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
    </>
  );
}
