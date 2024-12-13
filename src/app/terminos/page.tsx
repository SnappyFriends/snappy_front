import React from "react";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-center mt-4">
        <Link
          href="/register"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Volver al registro
        </Link>
      </div>

      <main className="flex justify-center items-center flex-grow px-4 py-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Términos, Condiciones y Política de Privacidad de Snappy Friends
          </h1>
          <p className="text-sm text-gray-700 mb-4">
            Bienvenido a Snappy Friends. Al registrarte en nuestra plataforma,
            confirmas que has leído, entendido y aceptado estas condiciones y
            políticas. Si no estás de acuerdo con ellas, lamentamos que no
            puedas usar nuestra app.
          </p>

          <h2 className="text-lg font-bold mt-6 mb-2">
            1. Requisitos para Usar Snappy Friends
          </h2>
          <ul className="list-disc pl-6 text-sm text-gray-700 mb-4">
            <li>Tener al menos 13 años de edad.</li>
            <li>Proporcionar información real y precisa al registrarte.</li>
            <li>
              Usar Snappy Friends solo para fines personales y respetar a otros
              usuarios.
            </li>
          </ul>

          <h2 className="text-lg font-bold mt-6 mb-2">
            2. Normas de Convivencia
          </h2>
          <ul className="list-disc pl-6 text-sm text-gray-700 mb-4">
            <li>
              No publiques contenido ofensivo, violento, discriminatorio o que
              infrinja derechos de terceros.
            </li>
            <li>
              No uses Snappy Friends para acosar, intimidar o realizar
              actividades ilegales.
            </li>
            <li>
              Sé respetuoso en tus interacciones con otros usuarios, ya sea en
              publicaciones, comentarios o mensajes privados.
            </li>
          </ul>

          <h2 className="text-lg font-bold mt-6 mb-2">
            3. Suspensión o Cancelación de Cuentas
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Nos reservamos el derecho de suspender o eliminar cuentas que
            incumplan estos términos o nuestras normas comunitarias.
          </p>

          <h2 className="text-lg font-bold mt-6 mb-2">
            4. Modificaciones en los Términos
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Snappy Friends puede actualizar estos términos ocasionalmente para
            reflejar cambios en la plataforma o en las leyes aplicables. Te
            notificaremos de cualquier cambio importante.
          </p>

          <h2 className="text-lg font-bold mt-6 mb-2">
            Política de Privacidad de Snappy Friends
          </h2>

          <h3 className="text-md font-semibold mt-4 mb-2">
            1. Información que Recopilamos
          </h3>
          <ul className="list-disc pl-6 text-sm text-gray-700 mb-4">
            <li>
              Información que proporcionas al registrarte: Nombre, dirección de
              correo electrónico, fecha de nacimiento, y otros detalles que
              decides incluir en tu perfil.
            </li>
            <li>
              Contenido que compartes: Fotos, publicaciones, mensajes y
              comentarios.
            </li>
            <li>
              Datos técnicos: Información sobre el dispositivo que usas, tu
              dirección IP y datos relacionados con tu actividad en la app.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
