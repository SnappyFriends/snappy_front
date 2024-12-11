"use client";

import React, { useState } from "react";

export default function PaymentGateway() {
  const [subscriptionDuration, setSubscriptionDuration] = useState("1");

  const duration = parseInt(subscriptionDuration, 10);

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg flex flex-col lg:flex-row gap-8"> 
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold text-center mb-6">Activa tu cuenta premium</h2>

          <form>
            <div>
              <label htmlFor="cardholder-name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del titular de la tarjeta
              </label>
              <input
                id="cardholder-name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                Número de tarjeta
              </label>
              <input
                id="card-number"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de expiración (MM/AA)
              </label>
              <input
                id="expiration-date"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                Código de seguridad (CVV)
              </label>
              <input
                id="cvv"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="subscription-duration" className="block text-sm font-medium text-gray-700 mb-1">
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
          </form>
        </div>

        <div className="w-full lg:w-1/2 mt-6 lg:mt-12 lg:pl-8"> 
          <h3 className="text-xl font-semibold mb-4">Resumen de pago</h3>
          <div className="flex justify-between text-lg mb-2">
            <span>Subtotal</span>
            <span>${(9.99 * duration).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg mb-4">
            <span>Impuesto</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span>${(9.99 * duration).toFixed(2)}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition-colors"
          >
            Pagar con Stripe
          </button>
        </div>
      </div>
    </div>
  );
}
