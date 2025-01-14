"use client";

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { showCustomToast } from "@/components/Notificacion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PaymentGateway() {
  const [subscriptionDuration, setSubscriptionDuration] = useState("1");
  const [subscriptionDetails, setSubscriptionDetails] = useState<{
    purchase_date: string;
    expiration_date: string;
    status: string;
  } | null>(null);
  const { userData, userId } = useContext(UserContext);

  const pricePerMonth = 9.99;
  const duration = parseInt(subscriptionDuration, 10);
  const subtotal = pricePerMonth * duration;

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      if (userId) {
        try {
          const response = await fetch(`${API_URL}/purchases/user/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Error al obtener los detalles de la suscripción.");
          }

          const result = await response.json();
          setSubscriptionDetails(result);
        } catch (error) {
          console.error("Error fetching subscription details", error);
        }
      }
    };

    fetchSubscriptionDetails();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userId) {
      try {
        const response = await fetch(
          `${API_URL}/purchases/subscribe/${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ subscriptionDuration: duration }),
          }
        );

        if (!response.ok) {
          throw new Error("Hubo un problema con la solicitud");
        }

        const result = await response.json();
        console.log("Suscripción exitosa", result);

        if (result.url) {
          window.location.href = result.url;
        } else {
          console.error("No se encontró una URL para redirigir.");
        }
      } catch (error) {
        console.error("Error en la solicitud", error);
      }
    } else {
      console.log("No se ha encontrado el ID de usuario.");
    }
  };

  if (userData?.user_type === "premium") {
    return (
      <div>
        <div className="min-h-screen flex justify-center items-center p-4">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg flex flex-col gap-4 shadow-xl border">
            <h2 className="text-2xl font-bold text-center mb-6">
              Historial de compras
            </h2>
            {subscriptionDetails ? (
              <>
                <p>
                  Fecha de compra:{" "}
                  {new Date(
                    subscriptionDetails.purchase_date
                  ).toLocaleDateString()}
                </p>
                <p>
                  Fecha de expiración:{" "}
                  {new Date(
                    subscriptionDetails.expiration_date
                  ).toLocaleDateString()}
                </p>
              </>
            ) : (
              <p className="mb-4">Cargando detalles de la suscripción...</p>
            )}
            <button
              className="w-full bg-red-500 text-white py-2 mt-4 rounded font-bold hover:bg-red-400 transition-colors"
              onClick={() =>
                showCustomToast(
                  "Snappy",
                  "Suscripción cancelada. Los cambios se efectuarán el próximo mes.",
                  "success"
                )
              }
            >
              Cancelar suscripción
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center p-4">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg flex flex-col gap-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            Selecciona la duración de tu suscripción
          </h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">Duración (meses):</label>
            <select
              value={subscriptionDuration}
              onChange={(e) => setSubscriptionDuration(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            >
              <option value="1">1 mes</option>
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
            </select>
            <p className="mb-4">
              Subtotal: <strong>${subtotal.toFixed(2)}</strong>
            </p>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-400 transition-colors"
            >
              Comprar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
