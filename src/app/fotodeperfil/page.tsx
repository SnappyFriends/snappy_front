"use client";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePicture() {
  return (
    <div>
      <div className="flex flex-col items-center mt-10 mb-5">
        <div>
          <Image
            src="/favicon.ico"
            alt="Snappy logo"
            width={300}
            height={301}
          />
        </div>
      </div>
      <main className="flex justify-center w-full">
        <div className="flex flex-col items-center w-96 gap-5">
          <h2 className="font-bold text-xl mt-10 mb-6">Elige tu foto de perfil</h2>

          <div className="relative flex justify-center mb-10"> 
            <Link href="/profilepicture">
              <Image
                src="/agregarfoto.png"
                alt="Icon Link"
                width={120}
                height={120}
                className="cursor-pointer"
              />
            </Link>

            <Link href="/profilepicture">
              <Image
                src="/lapiz.png"
                alt="Small Icon"
                width={20}
                height={20}
                className="absolute bottom-0 right-0 cursor-pointer"
              />
            </Link>
          </div>

          
          <button
            className="w-80 h-12 bg-black border border-none rounded-md text-xl text-white"
            type="submit"
          >
            Siguiente
          </button>
        </div>
      </main>
    </div>
  );
}
