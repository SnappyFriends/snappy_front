"use client";

import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Términos, Condiciones y Política de Privacidad de Snappy Friends
        </h1>
        <p className="text-sm text-gray-700 mb-4">
          Bienvenido a Snappy Friends. Al registrarte en nuestra plataforma, confirmas que has leído, entendido y aceptado estas condiciones y políticas. Si no estás de acuerdo con ellas, lamentamos que no puedas usar nuestra app.
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2">1. Requisitos para Usar Snappy Friends</h2>
        <ul className="list-disc pl-6 text-sm text-gray-700 mb-4">
          <li>Tener al menos 13 años de edad.</li>
          <li>Proporcionar información real y precisa al registrarte.</li>
          <li>Usar Snappy Friends solo para fines personales y respetar a otros usuarios.</li>
        </ul>

        <h2 className="text-lg font-bold mt-6 mb-2">2. Normas de Convivencia</h2>
        <ul className="list-disc pl-6 text-sm text-gray-700 mb-4">
          <li>No publiques contenido ofensivo, violento, discriminatorio o que infrinja derechos de terceros.</li>
          <li>No uses Snappy Friends para acosar, intimidar o realizar actividades ilegales.</li>
          <li>Sé respetuoso en tus interacciones con otros usuarios, ya sea en publicaciones, comentarios o mensajes privados.</li>
        </ul>

        <h2 className="text-lg font-bold mt-6 mb-2">3. Suspensión o Cancelación de Cuentas</h2>
        <p className="text-sm text-gray-700 mb-4">
          Nos reservamos el derecho de suspender o eliminar cuentas que incumplan estos términos o nuestras normas comunitarias.
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2">4. Modificaciones en los Términos</h2>
        <p className="text-sm text-gray-700 mb-4">
          Snappy Friends puede actualizar estos términos ocasionalmente para reflejar cambios en la plataforma o en las leyes aplicables. Te notificaremos de cualquier cambio importante.
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2">Política de Privacidad de Snappy Friends</h2>

        <h3 className="text-md font-semibold mt-4 mb-2">1. Información que Recopilamos</h3>
        <ul className="list-disc pl-6 text-sm text-gray-700 mb-4">
          <li>Información que proporcionas al registrarte: Nombre, dirección de correo electrónico, fecha de nacimiento, y otros detalles que decides incluir en tu perfil.</li>
          <li>Contenido que compartes: Fotos, publicaciones, mensajes y comentarios.</li>
          <li>Datos técnicos: Información sobre el dispositivo que usas, tu dirección IP y datos relacionados con tu actividad en la app.</li>
        </ul>

        <h3 className="text-md font-semibold mt-4 mb-2">2. Cómo Usamos tu Información</h3>
        <ul className="list-disc pl-6 text-sm text-gray-700 mb-4">
          <li>Proporcionarte acceso a la plataforma y permitirte interactuar con otros usuarios.</li>
          <li>Mejorar Snappy Friends y personalizar tu experiencia en la app.</li>
          <li>Garantizar la seguridad de nuestra comunidad y prevenir el uso indebido de la plataforma.</li>
          <li>Cumplir con requisitos legales y proteger nuestros derechos, si es necesario.</li>
        </ul>

        <h3 className="text-md font-semibold mt-4 mb-2">3. Con Quién Compartimos tu Información</h3>
        <ul className="list-disc pl-6 text-sm text-gray-700 mb-4">
          <li>Proveedores de servicios: Empresas que nos ayudan a operar la app.</li>
          <li>Cumplimiento legal: Cuando sea necesario para cumplir con la ley o responder a solicitudes legales válidas.</li>
          <li>Con tu consentimiento: Si decides vincular tu cuenta con servicios externos u otras apps.</li>
        </ul>

        <h3 className="text-md font-semibold mt-4 mb-2">4. Protección de tu Información</h3>
        <p className="text-sm text-gray-700 mb-4">
          Implementamos medidas técnicas y organizativas para proteger tus datos personales. Sin embargo, recuerda que ninguna plataforma puede garantizar una seguridad absoluta.
        </p>

        <h3 className="text-md font-semibold mt-4 mb-2">5. Tus Derechos</h3>
        <p className="text-sm text-gray-700 mb-4">
          En Snappy Friends, tienes el control sobre tus datos. Esto incluye acceso, edición, eliminación y restricción de uso. Para ejercer estos derechos, contáctanos a través de la configuración de la app o por nuestro correo de soporte.
        </p>

        <h3 className="text-md font-semibold mt-4 mb-2">6. Cambios en la Política de Privacidad</h3>
        <p className="text-sm text-gray-700 mb-4">
          Podemos actualizar esta política ocasionalmente para reflejar cambios en la legislación o en nuestras prácticas. Te notificaremos si hay cambios importantes.
        </p>
      </div>
    </div>
  );
}
