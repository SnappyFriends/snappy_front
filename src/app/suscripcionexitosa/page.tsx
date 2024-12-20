import React from "react";
import Image from "next/image";
import Link from "next/link";

const SubscriptionSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <Image src="/favicon.ico" alt="snappy" width={150} height={150} />
      
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-8 text-center">
        ¡Pago Exitoso!
      </h1>

      <p className="text-gray-600 mt-4 text-center">
        ¡Gracias por suscribirte a Snappy Friends! Ahora eres parte de nuestra comunidad premium.
        Con tu membresía tendrás acceso a una insignia especial que te distinguirá.
      </p>


      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default SubscriptionSuccess;
