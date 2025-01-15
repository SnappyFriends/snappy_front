"use client";

import { UserContext } from "@/context/UserContext";
import { timeAgo } from "@/helpers/timeAgo";
import { IPurchase } from "@/interfaces/types";
// import { fetchPurchases } from "@/services/purchasesService";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import UserSuscripcionesChart from "../../../components/UserSuscripcionesChart";

const PurchasesPage: React.FC = () => {
  const [purchases, setPurchases] = useState<IPurchase[]>([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/purchases`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching purchases: ${response.statusText}`);
        }

        const data = await response.json();
        setPurchases(data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };

    fetchPurchases();
  }, [token]);

  return (
    <>
      <div className="container mx-auto p-4 w-[73rem]">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Suscripciones de Usuarios
        </h1>
        <div className="overflow-x-auto mt-4">
          <table className="w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-200 text-center">
                  Usuario
                </th>
                <th className="px-4 py-2 border border-gray-200 text-center">
                  Fecha de pago
                </th>
                <th className="px-4 py-2 border border-gray-200 text-center">
                  Monto
                </th>
                <th className="px-4 py-2 border border-gray-200 text-center">
                  Fecha de expiración
                </th>
                <th className="px-4 py-2 border border-gray-200 text-center">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.purchase_id} className="border-t">
                  <td className="pl-2 py-2 border border-gray-200 text-start">
                    <Link href={`../perfil/${purchase.user.username}`}>
                      <Image
                        src={purchase.user.profile_image}
                        alt={purchase.user.username}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full mx-auto inline mr-2"
                      />
                      {purchase.user.username}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    {timeAgo(purchase.purchase_date)}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    {purchase.amount} USD
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    {new Date(purchase.expiration_date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    <span
                      className={
                        purchase.status === "completed"
                          ? "bg-green-600 text-white p-1 rounded-lg"
                          : "bg-gray-800 text-white p-1 rounded-lg"
                      }
                    >
                      {purchase.status === "completed"
                        ? "Completado"
                        : "Pendiente"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UserSuscripcionesChart />
    </>
  );
};

export default PurchasesPage;
