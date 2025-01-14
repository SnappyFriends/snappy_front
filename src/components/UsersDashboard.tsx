"use client";

import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useForm } from "react-hook-form";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserTypeDistribution {
  user_type: string;
  count: string;
}

interface MetricsData {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  newUsers: number;
  userTypeDistribution: UserTypeDistribution[];
}

export default function UsersDashboard() {
  const { register, handleSubmit } = useForm<{
    startDate: string;
    endDate: string;
  }>();
  const [metricsData, setMetricsData] = useState<MetricsData | null>(null);
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-01-14");

  const fetchMetrics = async (startDate: string, endDate: string) => {
    try {
      const response = await fetch(
        `${API_URL}/logs/users/metrics?startDate=${startDate}&endDate=${endDate}`,
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
      setMetricsData(data);
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

  const userTypeDistributionData = {
    labels:
      metricsData?.userTypeDistribution.map((dist) => dist.user_type) || [],
    datasets: [
      {
        label: "Usuarios",
        data:
          metricsData?.userTypeDistribution.map((dist) =>
            parseInt(dist.count)
          ) || [],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
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

      {metricsData && (
        <div className="w-full max-w-2xl mb-16">
          <h2 className="text-xl font-bold mb-4">Distribución de usuarios</h2>
          <Pie
            data={userTypeDistributionData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: `Total de Usuarios: ${metricsData.totalUsers}`,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
