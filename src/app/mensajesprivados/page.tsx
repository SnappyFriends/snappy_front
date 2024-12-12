import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function MensajesPrivados() {
  return (
    <>
    <Navbar/>
      <nav className="h-16 flex justify-center items-center">
        <form className="w-full px-4 flex justify-center items-center">
          <input
            type="text"
            className="border border-gray-500 border-r-transparent rounded-full rounded-e-none h-10 w-full px-4"
            placeholder="Buscar chat"
          />
          <button
            type="submit"
            className="border border-gray-500 h-10 w-11 border-l-transparent rounded-full rounded-s-none"
            aria-label="Buscar chat"
            title="Buscar chat"
          >
            <Image
              src="/lupa.png"
              width={20}
              height={20}
              alt="Buscar"
              className="cursor-pointer"
            />
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
                />
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
          <section className="h-20 flex justify-between items-center px-4">
            <div className="flex space-x-4 items-center">
              <div>
                <Image
                  src="/taylorswift.jpg"
                  width={1000}
                  height={1000}
                  alt="fotodeperfil"
                  className="rounded-full w-16 h-16 object-cover"
                />
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
          <section className="h-20 flex justify-between items-center px-4">
            <div className="flex space-x-4 items-center">
              <div>
                <Image
                  src="/taylorswift.jpg"
                  width={1000}
                  height={1000}
                  alt="fotodeperfil"
                  className="rounded-full w-16 h-16 object-cover"
                />
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
          <section className="h-20 flex justify-between items-center px-4">
            <div className="flex space-x-4 items-center">
              <div>
                <Image
                  src="/taylorswift.jpg"
                  width={1000}
                  height={1000}
                  alt="fotodeperfil"
                  className="rounded-full w-16 h-16 object-cover"
                />
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
          <section className="h-20 flex justify-between items-center px-4">
            <div className="flex space-x-4 items-center">
              <div>
                <Image
                  src="/taylorswift.jpg"
                  width={1000}
                  height={1000}
                  alt="fotodeperfil"
                  className="rounded-full w-16 h-16 object-cover"
                />
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