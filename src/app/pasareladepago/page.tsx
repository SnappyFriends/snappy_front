"use client";

import Navbar from "@/components/Navbar";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "@/context/UserContext"; 

export default function PaymentGateway() {
  const [subscriptionDuration, setSubscriptionDuration] = useState("1");
  const [isMember, setIsMember] = useState(false); 
  const [nextPaymentDate, setNextPaymentDate] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const duration = parseInt(subscriptionDuration, 10);
  const pricePerMonth = 9.99;
  const subtotal = pricePerMonth * duration;

  const { userId } = useContext(UserContext);

  useEffect(() => {
    const checkMembership = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
  
        const response = await fetch(`http://localhost:3000/purchases/subscribe/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "checkStatus" }),
        });

        if (!response.ok) throw new Error("Error al verificar el estado de la membresía");

        const data = await response.json();
        setIsMember(data.isMember || false); 
        setNextPaymentDate(data.nextPaymentDate || null);
      } catch (error) {
        console.error("Error al verificar el estado de la membresía:", error);
      } finally {
        setLoading(false);
      }
    };

    checkMembership();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (userId) {
      try {
        const response = await fetch(`http://localhost:3000/purchases/subscribe/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscriptionDuration: duration }),
        });

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
      } finally {
        setLoading(false); // Asegura que loading se detiene aunque ocurra un error
      }
    } else {
      console.log("No se ha encontrado el ID de usuario.");
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    if (userId) {
      try {
        const response = await fetch(`http://localhost:3000/purchases/cancel/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Hubo un problema al cancelar la suscripción");
        }

        alert("Suscripción cancelada exitosamente");
        setIsMember(false); 
      } catch (error) {
        console.error("Error al cancelar la suscripción", error);
      } finally {
        setLoading(false); 
      }
    }
  };

  if (loading) {
    return <div></div>; 
  }


  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center p-4">
        {isMember ? (
          <div className="w-full max-w-lg p-6 bg-white rounded-lg flex flex-col gap-8 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Detalle de tu membresía</h2>
            <p className="text-lg mb-4">Próximo pago: {nextPaymentDate || "Desconocido"}</p>
            <button
              onClick={handleCancelSubscription}
              className="w-full bg-red-500 text-white py-2 rounded font-bold hover:bg-red-700 transition-colors"
            >
              Cancelar suscripción
            </button>
          </div>
        ) : (
          <div className="w-full max-w-lg p-6 bg-white rounded-lg flex flex-col gap-8 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Activa tu membresía premium con Snappy Friends</h2>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="subscription-duration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Duración de la suscripción (meses)
                </label>
                <select
                  id="subscription-duration"
                  value={subscriptionDuration}
                  onChange={(e) => setSubscriptionDuration(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="1">1 mes</option>
                  <option value="3">3 meses</option>
                  <option value="6">6 meses</option>
                  <option value="12">12 meses</option>
                </select>
              </div>

              <h3 className="text-xl font-semibold mb-4">Resumen de pago</h3>
              <div className="flex justify-between text-lg mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg mb-4">
                <span>Impuesto</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition-colors"
              >
                Pagar con Stripe
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
