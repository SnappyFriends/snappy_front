import FotoDePerfilRegistroNormal from "@/components/FotoDePerfilRegistroNormal";
import React from "react";

export default function SubirFoto() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center font-bold text-2xl mb-6">
        Elige tu foto de perfil
      </h1>
      <FotoDePerfilRegistroNormal />
    </div>
  );
}
