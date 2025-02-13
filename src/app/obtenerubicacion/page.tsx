"use client";
import { useContext, useEffect, useState } from "react";
import { getLocation, updateLocationInDatabase } from "@/helpers/location";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

const LocationPrompt = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState<boolean>(false);
  const router = useRouter();
  const { userId } = useContext(UserContext);

  useEffect(() => {
    if(!userId) return;

    const checkLocation = async () => {
      setLoading(true);
      try {
        const loc = await getLocation();
        await updateLocationInDatabase(userId, loc);
        setIsLocationEnabled(true);
        router.push("/newchat");
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    checkLocation();
  }, [userId, router]);

  if (loading) {
    return <div className="w-full flex items-center flex-col justify-center text-center p-4">Cargando ubicación...</div>;
  }

  if (error) {
    return (
      <div className="w-full flex items-center flex-col justify-center text-center p-4">
        <p>
          No se pudo obtener la ubicación. Por favor, habilita la
          geolocalización en tu dispositivo.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => window.location.reload()}
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (isLocationEnabled) {
    return (
      <div className="w-full flex items-center flex-col justify-center text-center p-4">
        <p>Ubicación obtenida correctamente.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center flex-col justify-center text-center p-4">
      <p>
        Para utilizar todas las funciones exclusivas de la app, necesitamos
        obtener tu ubicación.
      </p>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => window.location.reload()}
      >
        Habilitar ubicación
      </button>
    </div>
  );
};

export default LocationPrompt;
