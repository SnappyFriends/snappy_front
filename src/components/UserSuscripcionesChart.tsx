"use client";

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useForm } from "react-hook-form";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Subscription {
  purchase_id: string;
  purchase_date: string;
  expiration_date: string;
  amount: string;
  payment_method: string;
  status: string;
  stripe_session_id: string;
  user: {
    id: string;
    fullname: string;
    username: string;
    profile_image: string;
  };
}

interface MetricsData {
  subscriptions: Subscription[];
  totalAmount: string;
}

export default function UserSuscripcionesChart() {
  const { register, handleSubmit } = useForm<{
    startDate: string;
    endDate: string;
  }>();
  const [metricsData, setMetricsData] = useState<MetricsData | null>(null);
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-01-13");

  const fetchMetrics = async (startDate: string, endDate: string) => {
    try {
      const response = await fetch(
        `${API_URL}/purchases/metrics?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener las métricas.");
      }

      const data: MetricsData = await response.json();
      const totalAmount = data.subscriptions
        .reduce((sum, sub) => sum + parseFloat(sub.amount), 0)
        .toFixed(2);
      setMetricsData({ ...data, totalAmount });
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  useEffect(() => {
    fetchMetrics(startDate, endDate);
  }, [startDate, endDate]);

  const onSubmit = async (data: { startDate: string; endDate: string }) => {
    await fetchMetrics(data.startDate, data.endDate);
    setStartDate(data.startDate);
    setEndDate(data.endDate);
  };

  const activeUsersChartData = {
    labels: metricsData?.subscriptions?.map((sub) => sub.user.username) || [],
    datasets: [
      {
        label: "Usuario",
        data:
          metricsData?.subscriptions?.map((sub) => parseFloat(sub.amount)) ||
          [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <label>
          Desde:
          <input
            type="date"
            {...register("startDate")}
            defaultValue={startDate}
          />
        </label>
        <label className="ml-4">
          Hasta:
          <input type="date" {...register("endDate")} defaultValue={endDate} />
        </label>
        <button
          type="submit"
          className="ml-4 bg-blue-500 text-white py-1 px-3 rounded"
        >
          Consultar
        </button>
      </form>

      {metricsData &&
      metricsData.subscriptions &&
      metricsData.subscriptions.length > 0 ? (
        <>
          <div className="w-full max-w-2xl mb-8 border border-gray-200 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Usuarios suscriptos</h2>
            <Bar
              data={activeUsersChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: `Total Amount: $${metricsData.totalAmount}`,
                  },
                },
              }}
            />
          </div>
        </>
      ) : (
        <p>No hay datos disponibles para mostrar.</p>
      )}
    </div>
  );
}
